const fs = require('fs')

const biliAPI = require('.')

const toc = require('markdown-toc')

const apis = { ...require('./src/api.bilibili.com'), ...require('./src/data'), ...require('./src/input') }

const README = String(fs.readFileSync('README.template.md'))
const DOC = String(fs.readFileSync('DOC.template.md'))

const maxdepth = 3

const doc = ['stat', 'info', 'view', 'list']

const syntax = name => {
  let object = { parse: e => e }
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

const section = ({ name, syntax, example, data, type = 'json', description = '' }) => {
  if (data.length > 1000) {
    data = data.slice(0, 1000)
    data += '\n...'
  }
  return DOC
    .replace('NAME', name)
    .replace('DESCRIPTION', description)
    .replace('SYNTAX', syntax)
    .replace('EXAMPLE', example)
    .replace('TYPE', type)
    .replace('DATA', data)
}

;
(async () => {
  let sections = []
  for (let i = 0; i < doc.length; i++) {
    let name = doc[i]
    sections[i] = section({
      name,
      description: apis[name].description,
      syntax: await apis[name].get(syntax(name)),
      example: await apis[name].get({ parse: e => e, ...testData }),
      type: apis[name].type,
      data: JSON.stringify((await biliAPI({ ...testData }, [name]))[name], 0, 2)
    })
  }
  let readMea = README.replace('<!-- [[apiDocument]] -->', sections.join(''))
  readMea = readMea.replace('<!--toc-->', toc(readMea, { maxdepth }).content)
  fs.writeFileSync('README.md', readMea)
})()
