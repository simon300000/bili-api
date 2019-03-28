# Bili-api [![Travis (.com)](https://img.shields.io/travis/com/simon300000/bili-api.svg)](https://travis-ci.com/simon300000/bili-api) [![Coveralls github](https://img.shields.io/coveralls/github/simon300000/bili-api.svg)](https://coveralls.io/github/simon300000/bili-api) [![Greenkeeper badge](https://badges.greenkeeper.io/simon300000/bili-api.svg)](https://greenkeeper.io/)

```javascript
let object = await biliAPI({ mid: 349991143 }, ['uname', 'guardNum'])
object.uname // 神楽めあOfficial
object.guardNum // 634
```

# 目录

- [biliAPI](#biliapi)
  * [安装](#%E5%AE%89%E8%A3%85)
  * [开始](#%E5%BC%80%E5%A7%8B)
    + [biliAPI Document](#biliapi-document)
    + [Route Graph](#route-graph)
- [Bilibili API Document](#bilibili-api-document)
  * [IDs](#ids)
    + [mid](#mid)
    + [aid](#aid)
    + [cid](#cid)
    + [p](#p)
    + [roomid](#roomid)
  * [APIs](#apis)
    + [stat](#stat)
    + [info](#info)
    + [view](#view)
    + [list](#list)
    + [getRoomInfoOld](#getroominfoold)
    + [topList](#toplist)
- [Contribution](#contribution)

# biliAPI

## 安装

npm: `npm install bili-api`

## 开始

```javascript
const biliAPI = require('bili-api')
;
(async () => {
  let up = await biliAPI({ mid: 349991143 }, ['follower'])
  up.follower // 277042
})()
```

以上便是根据<[mid](#api_mid)>查找粉丝数，很简单对不对→\_→

### biliAPI Document

```javascript
/**
 * @method exports
 * @param  {Object}    object        输入的信息
 * @param  {Array}     target        需要的目标信息
 * @param  {Function}  [option]      设置
 * @return {Promise}                 Resolve一个带有所需target的Object
 */
biliAPI(object, target, [option])
```

- `object`: 对象，提供目前知道的信息，比如 `{ mid: 349991143 }`，不同key的说明可以参阅[IDs](#ids)
- `target`: 数组，需要的信息，比如 `['follower']`，每个值的说明可以参阅[APIs](#apis)

<!-- #### Option -->

### Route Graph

![Graph of apis](md/api.svg)

# Bilibili API Document

这里收集的API应该属于"匿名API(自造词)"，即不需要 登陆/appkey 的API。

用处大概是公开信息获取，暂时没有涉及类似"发弹幕/评论"相关API的打算。

以下是两个可能满足类似需求的资料：

[fython/BilibiliAPIDocs: Bilibili API (For thrid-party) Documents 哔哩哔哩开放接口第三方文档](https://github.com/fython/BilibiliAPIDocs)

[Vespa314/bilibili-api: B站API收集整理及开发，测试【开发中】](https://github.com/Vespa314/bilibili-api)

## IDs

### <a name="api_mid"></a>mid

大概是 Member ID?

UP主个人空间地址 <https://space.bilibili.com/43222001/> 中的`43222001`就是这个`mid`了

##### 前置信息/参数

无

### <a name="api_aid"></a>aid

就是av号啦→\_→

比如视频 https://www.bilibili.com/video/av2134250/ 中的`2134250`就是`aid`

##### 前置信息/参数

无

### <a name="api_cid"></a>cid



##### 前置信息/参数

<[view](#api_view)>, [[p](#api_p)]

### <a name="api_p"></a>p



##### 前置信息/参数

无

### <a name="api_roomid"></a>roomid



##### 前置信息/参数

<[getRoomInfoOld](#api_getRoomInfoOld)>



## APIs

### <a name="api_stat"></a>stat

UP主统计数据

##### 前置信息/参数

<[mid](#api_mid)>

##### API地址

https://api.bilibili.com/x/relation/stat?vmid=<mid\>

##### 实例:

https://api.bilibili.com/x/relation/stat?vmid=349991143

##### 返回 (json->json):

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
    "follower": 277042
  }
}
```

### <a name="api_info"></a>info

UP主信息

##### 前置信息/参数

<[mid](#api_mid)>

##### API地址

https://api.bilibili.com/x/space/acc/info?mid=<mid\>

##### 实例:

https://api.bilibili.com/x/space/acc/info?mid=349991143

##### 返回 (json->json):

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
    "coins": 63434.4,
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
    "top_photo": "http://i2.hdslb.com/bfs/space/e408642238b3cd999b229af3aefd5da6746f5d7d.png",
    "theme": {}
  }
}
```

### <a name="api_view"></a>view

视频信息

##### 前置信息/参数

<[aid](#api_aid)>

##### API地址

https://api.bilibili.com/x/web-interface/view?aid=<aid\>

##### 实例:

https://api.bilibili.com/x/web-interface/view?aid=30669363

##### 返回 (json->json):

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "aid": 30669363,
    "videos": 1,
    "tid": 138,
    "tname": "搞笑",
    "copyright": 2,
    "pic": "http://i2.hdslb.com/bfs/archive/beb7c2ea63a31929b2aac187fee6f7da97058fa6.jpg",
    "title": "ELECTRICAL COMMUNICATION",
    "pubdate": 1535573687,
    "ctime": 1535573684,
    "desc": "N站http://www.nicovideo.jp/watch/sm31209485?ref=thumb_nicopedia\n真夏の夜の淫夢",
    "state": 0,
    "attribute": 16640,
    "duration": 148,
    "rights": {
      "bp": 0,
      "elec": 0,
      "download": 1,
      "movie": 0,
      "pay": 0,
      "hd5": 1,
      "no_reprint": 0,
      "autoplay": 1,
      "ugc_pay": 0,
      "is_cooperation": 0,
      "ugc_pay_preview": 0
    },
    "owner": {
      "mid": 37736515,
      "name": "精鋭の見張り員",
      "face": "http://i1.hdslb.com/bfs/face/37d684a236f078baa1e00539d9c16d667b4a6f1f.jpg"
    },
    "stat": {
      "aid": 30669363,
      "view": 5574,
      "danmaku": 32,
      "reply": 26,
      "favorite":
......
```

### <a name="api_list"></a>list

弹幕

##### 前置信息/参数

<[cid](#api_cid)>

##### API地址

https://api.bilibili.com/x/v1/dm/list.so?oid=<cid\>

##### 实例:

https://api.bilibili.com/x/v1/dm/list.so?oid=53534698

##### 返回 (xml->json):

```json
{
  "i": {
    "chatserver": [
      "chat.bilibili.com"
    ],
    "chatid": [
      "53534698"
    ],
    "mission": [
      "0"
    ],
    "maxlimit": [
      "500"
    ],
    "state": [
      "0"
    ],
    "real_name": [
      "0"
    ],
    "source": [
      "k-v"
    ],
    "d": [
      {
        "_": "(눈_눈)",
        "$": {
          "p": "53.32200,1,25,16777215,1535805851,0,f028907,4542261363212288"
        }
      },
      {
        "_": "大哥大嫂过年好",
        "$": {
          "p": "118.40600,5,25,15138834,1541414098,0,892760a2,7482598462849024"
        }
      },
      {
        "_": "刷CPU的几个意思……",
        "$": {
          "p": "45.28400,1,25,16777215,1545353769,0,7907fd34,9548120285773826"
        }
      },
      {
        "_": "刷绘里的几个意思……",
        "$": {
          "p": "12.85700,1,25,16777215,1545353720,0,7907fd34,9548094612439040"
        }
      },
      {
        "_": "草",
        "$": {
          "p": "116.61600,1,25,16777215,1545803269,0,8b709dfe,9783787808882688"
     
......
```

### <a name="api_getRoomInfoOld"></a>getRoomInfoOld



##### 前置信息/参数

<[mid](#api_mid)>

##### API地址

https://api.live.bilibili.com/room/v1/Room/getRoomInfoOld?mid=<mid\>

##### 实例:

https://api.live.bilibili.com/room/v1/Room/getRoomInfoOld?mid=349991143

##### 返回 (json->json):

```json
{
  "code": 0,
  "msg": "ok",
  "message": "ok",
  "data": {
    "roomStatus": 1,
    "roundStatus": 0,
    "liveStatus": 0,
    "url": "https://live.bilibili.com/12235923",
    "title": "嘘だよーーーーーーーーー",
    "cover": "https://i0.hdslb.com/bfs/live/12235923.jpg?03260105",
    "online": 357211,
    "roomid": 12235923,
    "broadcast_type": 0
  }
}
```

### <a name="api_topList"></a>topList



##### 前置信息/参数

<[roomid](#api_roomid)>, <[mid](#api_mid)>, [[page](#api_page)]

##### API地址

https://api.live.bilibili.com/guard/topList?roomid=<roomid\>&page=1&ruid=<mid\>

##### 实例:

https://api.live.bilibili.com/guard/topList?roomid=12235923&page=1&ruid=349991143

##### 返回 (json->json):

```json
{
  "code": 0,
  "msg": "success",
  "message": "success",
  "data": {
    "info": {
      "num": 634,
      "page": 64,
      "now": 1
    },
    "list": [
      {
        "uid": 28221,
        "ruid": 349991143,
        "rank": 1,
        "username": "cjtk",
        "face": "https://i2.hdslb.com/bfs/face/03eda5b37ee521e103da104638d67aadb80f5345.jpg",
        "is_alive": 0,
        "guard_level": 2
      },
      {
        "uid": 1336969,
        "ruid": 349991143,
        "rank": 2,
        "username": "T-_3",
        "face": "https://i0.hdslb.com/bfs/face/5032391c42751f362c783a685e563883dd6870b2.jpg",
        "is_alive": 0,
        "guard_level": 2
      },
      {
        "uid": 1935136,
        "ruid": 349991143,
        "rank": 3,
        "username": "Arccueid",
        "face": "https://i1.hdslb.com/bfs/face/e0430ffce3918ff96ec5b30ede533ea58863858d.jpg",
        "is_alive": 0,
        "guard_level": 2
      },
      {
        "uid": 2147984,
        "ruid": 349991143,
        "ra
......
```



# Contribution

欢迎各种Issue和Pull Request

开Issue聊天也行→\_→！！！

详细可以阅读 [CONTRIBUTING.md](CONTRIBUTING.md)
