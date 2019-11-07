/* eslint-disable func-call-spacing */
/* eslint-disable no-unexpected-multiline */
const { readFile, writeFile } = require('fs').promises
const toc = require('markdown-toc')

const biliAPI = require('..')
const { apis } = biliAPI

const maxdepth = 3

const parseDescriptions = DESCRIPTIONS => DESCRIPTIONS
  .split('\n')
  .reduce(({ name, descriptions }, line) => {
    if (line[0] === '#') {
      name = line.replace(' ', '').replace('#', '')
      console.log(`load DESCRIPTIONS: ${line}`)
      descriptions[name] = ''
    } else if (line) {
      descriptions[name] += line
      descriptions[name] += '\n'
    }
    return { name, descriptions }
  }, { descriptions: {} })
  .descriptions

const evalExample = async exampleName => {
  console.log(`EXAMPLE: ${exampleName}`)
  const example = String(await readFile(`examples/${exampleName}.js`)).split('\n')
  let text = ['```javascript', ...example, '```'].join('\n').replace('\n\n```', '\n```')
  const data = []
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
  // eslint-disable-next-line no-eval
  await eval(['(async()=>{', ...example, '})()'].join('\n'))
  for (let j = 0; j < data.length; j++) {
    text = text.replace(' // DATA', ` // → ${JSON.stringify(data[j], 0, 2).replace(/\n/g, '\n  //')}`)
  }
  return text
}

;

((f, r) => w => f(f, (async () => w(await r))()))
((f, r) => w => f(f, (async () => w(await r))()))

(() => readFile('md/README.template.md'))
(String)

(async readme => ({ readme, descriptions: parseDescriptions(String(await readFile('md/DESCRIPTIONS.md'))) }))
(({ readme, descriptions }) => {
  const description = Object
    .entries(apis)
    .map(([key, { demand = [] }]) => {
      if (descriptions[key]) {
        const idTemplate = `* ### <a name="api_${key}"></a>${key.replace(/_/g, '\\_')}

  ${descriptions[key].replace(/\n/g, '\n  ')}
  ${demand.length ? `*前置:* ${demand.map(d => `<[${d}](#api_${d})>`).join(', ')}` : ''}`
        return idTemplate
      }
    })
    .filter(Boolean)
  return { readme, description }
})
(({ readme, description }) => readme.replace('<!-- [[idDocument]] -->', description.join('\n\n')))

(readme => readme.split('\n'))
(readmes => readmes.map(async line => {
  if (line.includes('EXAMPLE:')) {
    const exampleName = line.replace('EXAMPLE:', '')
    return evalExample(exampleName)
  } else {
    return line
  }
}))
(readmes => Promise.all(readmes))
(readmes => readmes.join('\n'))

(readme => readme.replace('<!--toc-->', toc(readme, { maxdepth }).content))
(readme => writeFile('README.md', readme))
