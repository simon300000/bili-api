const got = require('got')

// Who the hell invented that 4200 must have at least a year of brain tumor.
const DYNO_CODE = { 1: 'REPOST', 2: 'PIC_POST', 4: 'TEXT_POST', 8: 'VIDEO', 4200: 'LIVEROOM' }
const COPY_ATTR = ['dynamic_id', 'view', 'repost', 'comment', 'like']

module.exports = {
  dynamicsRaw: {
    demand: ['mid', 'dynamicOffset'],
    type: 'transparent',
    get: ({ mid, dynamicOffset }) => {
      const url = `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?host_uid=${mid}&offset_dynamic_id=${dynamicOffset}&need_top=0&platform=web`
      return got(url).then(
        (result) => { // Resolve
          const jsonRaw = JSON.parse(result.body)
          const cards = jsonRaw.data.cards
          cards.has_more = jsonRaw.data.has_more
          cards.next_offset = jsonRaw.data.next_offset
          return cards
        },
        (e) => { // Reject
          return undefined
        }
      )
    }
  },
  dynamics: {
    demand: ['dynamicsRaw'],
    type: 'transparent',
    get: (obj) => {
      if (!obj) return undefined
      const cleaned = []
      obj.dynamicsRaw.forEach(x => {
        const tempObject = JSON.parse(x.card)
        tempObject.type = DYNO_CODE[x.desc.type] || undefined
        COPY_ATTR.forEach(k => tempObject[k] = x.desc[k])
        if (tempObject.type === 'REPOST') {
          if (tempObject.origin) tempObject.origin = JSON.parse(tempObject.origin)
          if (tempObject.origin_extend_json) tempObject.origin_extend_json = JSON.parse(tempObject.origin_extend_json)
        }
        cleaned.push(tempObject)
      })
      return cleaned
    }
  },
  dynamicOffset: {
    get: () => 0
  }
}
