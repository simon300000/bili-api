/* eslint no-useless-escape: "off" */
const fs = require('fs')

const biliAPI = require('.')
const { apis } = biliAPI

const toc = require('markdown-toc')

const README = String(fs.readFileSync('md/README.template.md'))
const API = String(fs.readFileSync('md/API.template.md'))
const ID = String(fs.readFileSync('md/ID.template.md'))

const descriptionFile = String(fs.readFileSync('md/DESCRIPTIONS.md')).split('\n')
let DESCRIPTIONS = {}

for (let i = 0; i < descriptionFile.length; i++) {
  if (descriptionFile[i][0] === '#') {
    if (DESCRIPTIONS._current) {
      DESCRIPTIONS[DESCRIPTIONS._current] = DESCRIPTIONS[DESCRIPTIONS._current].join('\n\n')
    }
    DESCRIPTIONS._current = descriptionFile[i].replace(' ', '').replace('#', '')
    DESCRIPTIONS[DESCRIPTIONS._current] = []
  } else if (descriptionFile[i]) {
    DESCRIPTIONS[DESCRIPTIONS._current].push(descriptionFile[i])
  }
}

const maxdepth = 4

const doc = ['stat', 'info', 'view', 'list']
const id = ['mid', 'aid', 'cid', 'p']

const syntax = async name => {
  let object = await biliAPI(testData, [name])
  object[name] = undefined
  for (let i = 0; i < apis[name].require.length; i++) {
    object[apis[name].require[i]] = `<${apis[name].require[i]}\\>`
  }
  return object
}

const testData = {
  mid: 349991143,
  aid: 30669363,
  p: 0
}

const exampleData = async name => {
  let object = await biliAPI(testData, [name])
  object[name] = undefined
  return object
}

const apiSection = ({ name, syntax, example, data, type = 'json', description = '', requires = [], optional = [] }) => {
  if (data.length > 1000) {
    data = data.slice(0, 1000)
    data += '\n......'
  }
  for (let i = 0; i < requires.length; i++) {
    requires[i] = `\<[${requires[i]}](#api_${requires[i]})\>`
  }
  for (let i = 0; i < optional.length; i++) {
    optional[i] = `\[[${optional[i]}](#api_${optional[i]})\]`
  }
  return API
    .replace('NAME', `<a name="api_${name}"></a>${name}`)
    .replace('DESCRIPTION', description)
    .replace('SYNTAX', syntax)
    .replace('REQUIRES', [...requires, ...optional].join(', ') || '无')
    .replace('EXAMPLE', example)
    .replace('TYPE', type)
    .replace('DATA', data)
}

const idSection = ({ name, description = '', requires = [], optional = [] }) => {
  for (let i = 0; i < requires.length; i++) {
    requires[i] = `\<[${requires[i]}](#api_${requires[i]})\>`
  }
  for (let i = 0; i < optional.length; i++) {
    optional[i] = `\[[${optional[i]}](#api_${optional[i]})\]`
  }
  return ID
    .replace('NAME', `<a name="api_${name}"></a>${name}`)
    .replace('DESCRIPTION', description)
    .replace('REQUIRES', [...requires, ...optional].join(', ') || '无')
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
      syntax: (await biliAPI(await syntax(name), [name], { parser: url => url }))[name],
      example: (await biliAPI(await exampleData(name), [name], { parser: url => url }))[name],
      type: apis[name].type,
      requires: [...(apis[name].require || [])],
      optional: [...(apis[name].optional || [])],
      data: JSON.stringify((await biliAPI(testData, [name]))[name], 0, 2)
    })
  }

  for (let i = 0; i < id.length; i++) {
    let name = id[i]
    idSections[i] = idSection({
      name,
      description: DESCRIPTIONS[name],
      requires: [...(apis[name].require || [])],
      optional: [...(apis[name].optional || [])]
    })
  }

  let readMea = README
  readMea = readMea.replace('<!-- [[apiDocument]] -->', apiSections.join(''))
  readMea = readMea.replace('<!-- [[idDocument]] -->', idSections.join(''))
  readMea = readMea.replace('<!--toc-->', toc(readMea, { maxdepth }).content)
  fs.writeFileSync('README.md', readMea)
})()
