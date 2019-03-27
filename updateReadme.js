const fs = require('fs')
const got = require('got')

const toc = require('markdown-toc')

const api = require('./src/api.bilibili.com')

const README = String(fs.readFileSync('README.template.md'))
const DOC = String(fs.readFileSync('DOC.template.md'))

const maxdepth = 3

const doc = ['stat', 'info']

const syntax = name => {
  let object = { parse: e => e }
  for (let i = 0; i < api[name].require.length; i++) {
    object[api[name].require[i]] = `<${api[name].require[i]}\\>`
  }
  return object
}

const testData = {
  mid: 349991143
}

const example = name => {
  let object = { parse: e => e }
  for (let i = 0; i < api[name].require.length; i++) {
    object[api[name].require[i]] = testData[api[name].require[i]]
  }
  return object
}

const test = name => {
  let object = { parse: async e => JSON.stringify(JSON.parse((await got(e)).body), 0, 2) }
  for (let i = 0; i < api[name].require.length; i++) {
    object[api[name].require[i]] = testData[api[name].require[i]]
  }
  return object
}

const section = ({ name, syntax, example, data }) => {
  return DOC
    .replace('NAME', name)
    .replace('SYNTAX', syntax)
    .replace('EXAMPLE', example)
    .replace('DATA', data)
}

;
(async () => {
  for (let i = 0; i < doc.length; i++) {
    let name = doc[i]
    doc[i] = section({
      name,
      syntax: await api[name].get(syntax(name)),
      example: await api[name].get(example(name)),
      data: await api[name].get(test(name))
    })
  }
  let readMea = README.replace('<!-- [[apiDocument]] -->', doc.join(''))
  readMea = readMea.replace('<!--toc-->', toc(readMea, { maxdepth }).content)
  fs.writeFileSync('README.md', readMea)
})()
