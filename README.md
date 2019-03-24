# Bili-api

[![Greenkeeper badge](https://badges.greenkeeper.io/simon300000/bili-api.svg)](https://greenkeeper.io/)

## 插件文档

没写完→\_→, 可以看看 test/test.js

## Bilibili API Document

#### stat

##### API地址

https://api.bilibili.com/x/relation/stat?vmid=<mid>

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
    "follower": 271163
  }
}
```

#### info

##### API地址

https://api.bilibili.com/x/space/acc/info?mid=<mid>

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
    "coins": 60673.9,
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
    "top_photo": "http://i0.hdslb.com/bfs/space/e408642238b3cd999b229af3aefd5da6746f5d7d.png",
    "theme": {}
  }
}
```


