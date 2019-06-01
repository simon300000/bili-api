/* eslint no-useless-escape: "off" */
/* eslint no-eval: "off" */
const fs = require('fs')

const biliAPI = require('..')
const { apis } = biliAPI

const toc = require('markdown-toc')

const README = String(fs.readFileSync('md/README.template.md'))
const API = String(fs.readFileSync('md/API.template.md'))
const ID = String(fs.readFileSync('md/ID.template.md'))

const descriptionFile = String(fs.readFileSync('md/DESCRIPTIONS.md')).split('\n')
let DESCRIPTIONS = {}

for (let i = 0; i < descriptionFile.length; i++) {
  if (descriptionFile[i][0] === '#') {
    DESCRIPTIONS._current = descriptionFile[i].replace(' ', '').replace('#', '').replace(/\\_/g, '_')
    console.log(`load DESCRIPTIONS: ${descriptionFile[i]}`)
    DESCRIPTIONS[DESCRIPTIONS._current] = []
  } else if (descriptionFile[i]) {
    DESCRIPTIONS[DESCRIPTIONS._current].push(descriptionFile[i])
  }
}

const maxdepth = 3

const doc = ['stat', 'info', 'view', 'list', 'getRoomInfoOld', 'topList', 'getAnchorInRoom', '_notice', 'rankdb']
// const id = ['mid', 'aid', 'cid', 'p', 'roomid']

let parsers = {}

parsers.json = url => url

parsers.jsonArray = url => url

parsers.xml = url => url

let id = []

for (let key in DESCRIPTIONS) {
  if (DESCRIPTIONS.hasOwnProperty(key)) {
    if (!doc.includes(key) && key !== '_current') {
      id.push(key)
    }
  }
}

const syntax = async name => {
  let object = await biliAPI(testData, [name])
  object[name] = undefined
  for (let i = 0; i < apis[name].demand.length; i++) {
    object[apis[name].demand[i]] = `<${apis[name].demand[i]}>`
  }
  if (apis[name].optional) {
    for (let i = 0; i < apis[name].optional.length; i++) {
      object[apis[name].optional[i]] = `[${apis[name].optional[i]}]`
    }
  }
  return object
}

const testData = {
  mid: 349991143,
  aid: 30669363,
  p: 0,
  roomid: 12235923
}

const exampleData = async name => {
  let object = await biliAPI(testData, [name])
  object[name] = undefined
  return object
}

const apiSection = ({ name, syntax, example, data, type = 'json', description = [], demands = [], optional = [] }) => {
  console.log(`apiSection: ${name}`)
  if (data.length > 1000) {
    data = data.slice(0, 1000)
    data += '\n......'
  }
  for (let i = 0; i < demands.length; i++) {
    demands[i] = `\<[${demands[i]}](#api_${demands[i]})\>`
  }
  for (let i = 0; i < optional.length; i++) {
    optional[i] = `\[[${optional[i]}](#api_${optional[i]})\]`
  }
  return API
    .replace('NAME', `<a name="api_${name}"></a>${name.replace(/\_/g, '\\_')}`)
    .replace('DESCRIPTION\n\n', description.length ? [...description, ''].join('\n\n') : '')
    .replace('SYNTAX', syntax)
    .replace('DEMANDS\n\n', [...demands, ...optional].length ? ['##### 前置', [...demands, ...optional].join(', '), ''].join('\n\n') : '')
    .replace('EXAMPLE', example)
    .replace('TYPE', type)
    .replace('DATA', data)
}

const idSection = ({ name, description = [], demands = [], optional = [] }) => {
  console.log(`idSection: ${name}`)
  for (let i = 0; i < demands.length; i++) {
    demands[i] = `\<[${demands[i]}](#api_${demands[i]})\>`
  }
  for (let i = 0; i < optional.length; i++) {
    optional[i] = `\[[${optional[i]}](#api_${optional[i]})\]`
  }
  return ID
    .replace('NAME', `* ### <a name="api_${name}"></a>${name.replace(/\_/g, '\\_')}`)
    .replace('DESCRIPTION', description.length ? `  ${[...description].join('\n\n  ')}` : '')
    .replace('DEMANDS\n\n', [...demands, ...optional].length ? `  ${['##### 前置', [...demands, ...optional].join(', ')].join('\n\n  ')}\n\n` : '')
}

;
(async () => {
  let apiSections = []
  let idSections = []

  for (let i = 0; i < doc.length; i++) {
    let name = doc[i]
    apiSections[i] = apiSection({
      name,
      description: DESCRIPTIONS[name],
      syntax: (await biliAPI(await syntax(name), [name], { parsers }))[name],
      example: (await biliAPI(await exampleData(name), [name], { parsers }))[name],
      type: apis[name].type,
      demands: [...(apis[name].demand || [])],
      optional: [...(apis[name].optional || [])],
      data: JSON.stringify((await biliAPI(testData, [name]))[name], 0, 2)
    })
  }

  for (let i = 0; i < id.length; i++) {
    let name = id[i]
    idSections[i] = idSection({
      name,
      description: DESCRIPTIONS[name],
      demands: apis[name] && [...(apis[name].demand || [])],
      optional: apis[name] && [...(apis[name].optional || [])]
    })
  }

  let readMea = README.split('\n')
  for (let i = 0; i < readMea.length; i++) {
    if (readMea[i].includes('EXAMPLE:')) {
      let exampleName = readMea[i].replace('EXAMPLE:', '')
      console.log(`EXAMPLE: ${exampleName}`)
      let example = String(fs.readFileSync(`examples/${exampleName}.js`)).split('\n')
      let text = ['```javascript', ...example, '```'].join('\n')
      text = text.replace('\n\n```', '\n```')
      let data = []
      for (let j = 0; j < example.length; j++) {
        if (example[j].includes(' // DATA')) {
          example[j] = example[j].replace(' // DATA', '')
          example[j] = ['data.push(', example[j], ')'].join('')
        }
        if (example[j].includes('(async')) {
          example[j] = example[j].replace('(async', 'await (async')
        }
        if (example[j].includes('require(\'bili-api\')')) {
          example[j] = ''
        }
      }
      await eval(['(async()=>{', ...example, '})()'].join('\n'))
      for (let j = 0; j < data.length; j++) {
        text = text.replace(' // DATA', ` // → ${JSON.stringify(data[j], 0, 2).replace(/\n/g, '\n  //')}`)
      }
      readMea[i] = text
    }
  }
  readMea = readMea.join('\n')
  readMea = readMea.replace('<!-- [[apiDocument]] -->', apiSections.join(''))
  readMea = readMea.replace('<!-- [[idDocument]] -->', idSections.join(''))
  readMea = readMea.replace('<!--toc-->', toc(readMea, { maxdepth }).content)
  fs.writeFileSync('README.md', readMea)
})()
