/* eslint no-useless-escape: "off" */
const fs = require('fs')

const biliAPI = require('.')

const toc = require('markdown-toc')

const apis = { ...require('./src/api.bilibili.com'), ...require('./src/data'), ...require('./src/input') }

const README = String(fs.readFileSync('README.template.md'))
const API = String(fs.readFileSync('API.template.md'))
const ID = String(fs.readFileSync('ID.template.md'))

const maxdepth = 4

const doc = ['stat', 'info', 'view', 'list']
const id = ['mid', 'aid', 'cid', 'p']

const syntax = name => {
  let object = {}
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
  let object = {}
  let requires = apis[name].require
  let datas = await biliAPI({ ...testData }, [requires])
  for (let i = 0; i < requires.length; i++) {
    object[requires[i]] = datas[requires[i]]
  }
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
    .replace('NAME', `${name}<a name="api_${name}"></a>`)
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
    .replace('NAME', `${name}<a name="api_${name}"></a>`)
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
      description: apis[name].description,
      syntax: await apis[name].get(syntax(name)),
      example: await apis[name].get({ ...testData, ...await exampleData(name) }),
      type: apis[name].type,
      requires: [...(apis[name].require || [])],
      optional: [...(apis[name].optional || [])],
      data: JSON.stringify((await biliAPI({ ...testData }, [name]))[name], 0, 2)
    })
  }

  for (let i = 0; i < id.length; i++) {
    let name = id[i]
    idSections[i] = idSection({
      name,
      description: apis[name].description,
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
