# Bili-api

[![Travis (.com)](https://img.shields.io/travis/com/simon300000/bili-api.svg)](https://travis-ci.com/simon300000/bili-api)
[![Coveralls github](https://img.shields.io/coveralls/github/simon300000/bili-api.svg)](https://coveralls.io/github/simon300000/bili-api)
[![Greenkeeper badge](https://badges.greenkeeper.io/simon300000/bili-api.svg)](https://greenkeeper.io/)

## 插件文档

没写完→\_→, 可以看看 test/test.js

## Bilibili API Document

#### stat

##### API地址

https://api.bilibili.com/x/relation/stat?vmid=<mid\>

##### 实例:

https://api.bilibili.com/x/relation/stat?vmid=349991143

##### 返回:

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "mid": 349991143,
    "following": 130,
    "whisper": 0,
    "black": 0,
    "follower": 271195
  }
}
```

#### info

##### API地址

https://api.bilibili.com/x/space/acc/info?mid=<mid\>

##### 实例:

https://api.bilibili.com/x/space/acc/info?mid=349991143

##### 返回:

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "mid": 349991143,
    "name": "神楽めあOfficial",
    "sex": "女",
    "face": "http://i1.hdslb.com/bfs/face/49e143e1cae7f9e51b36c6c670976a95cc41ce12.jpg",
    "sign": "这里是神楽めあ(KaguraMea)！来自日本的清楚系虚拟YouTuber～weibo:@kaguramea　",
    "rank": 10000,
    "level": 6,
    "jointime": 0,
    "moral": 0,
    "silence": 0,
    "birthday": "08-02",
    "coins": 60704.3,
    "fans_badge": true,
    "official": {
      "role": 1,
      "title": "bilibili 知名UP主",
      "desc": ""
    },
    "vip": {
      "type": 2,
      "status": 1,
      "theme_type": 0
    },
    "is_followed": false,
    "top_photo": "http://i1.hdslb.com/bfs/space/e408642238b3cd999b229af3aefd5da6746f5d7d.png",
    "theme": {}
  }
}
```



## Contribution

欢迎各种Issue和Pull Request

开Issue聊天也行→\_→！！！

### README.md

请不要直接修改 README.md 文件，README.md 文件是由指令 `npm run readme`, `src/api.bilibili.com.js` 生成的，模版是 README.template.md

#### API Document

也是自动生成的，主要通过 `src/api.bilibili.com.js` 和 `updateReadme.js` 中的配置生成
