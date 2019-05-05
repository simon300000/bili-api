# Bili-api [![Travis (.com)](https://img.shields.io/travis/com/simon300000/bili-api.svg)](https://travis-ci.com/simon300000/bili-api) [![Coveralls github](https://img.shields.io/coveralls/github/simon300000/bili-api.svg)](https://coveralls.io/github/simon300000/bili-api) [![npm](https://img.shields.io/npm/v/bili-api.svg)](https://www.npmjs.com/package/bili-api)

```javascript
let object = await biliAPI({ mid: 349991143 }, ['uname', 'guardNum'])
object.uname // → "神楽めあOfficial"
object.guardNum // → 752
```

# 目录

- [biliAPI](#biliapi)
  * [安装](#%E5%AE%89%E8%A3%85)
  * [用法](#%E7%94%A8%E6%B3%95)
    + [biliAPI Document](#biliapi-document)
    + [Router Graph](#router-graph)
- [Bilibili API Document](#bilibili-api-document)
  * [DATAs](#datas)
    + [mid](#mid)
    + [aid](#aid)
    + [roomid](#roomid)
    + [online](#online)
    + [liveStatus](#livestatus)
    + [guardNum](#guardnum)
    + [title](#title)
    + [notice](#notice)
    + [video](#video)
    + [archiveView](#archiveview)
    + [articleView](#articleview)
    + [face](#face)
  * [APIs](#apis)
    + [stat](#stat)
    + [info](#info)
    + [view](#view)
    + [list](#list)
    + [getRoomInfoOld](#getroominfoold)
    + [topList](#toplist)
    + [getAnchorInRoom](#getanchorinroom)
    + [\_notice](#_notice)
    + [rankdb](#rankdb)
- [Contribution](#contribution)

# biliAPI

## 安装

npm

```sh
npm install bili-api -S
```

Yarn

```sh
yarn add bili-api
```

## 用法

```javascript
const biliAPI = require('bili-api')
;
(async () => {
  let up = await biliAPI({ mid: 349991143 }, ['follower'])
  up.follower // → 329224
})()
```

以上便是根据<[mid](#api_mid)>查找粉丝数，很简单对不对→\_→

想看看推的VTB有几个舰长，几个提督，有没有石油佬上总督？没问题！

```javascript
const biliAPI = require('bili-api');

(async () => {
  let { guardLevel } = await biliAPI({ mid: 349991143 }, ['guardLevel'], { wait: 200 })
  guardLevel // → [1,10,741]
})()
```

### biliAPI Document

```javascript
/**
 * @method biliAPI
 * @param  {Object}    object        输入的信息
 * @param  {Array}     targets       需要的目标信息
 * @param  {Function}  [option]      设置
 * @return {Promise}                 Resolve一个带有所需targets的Object
 */
biliAPI(object, targets[, option])
```

- `object`: Object，提供目前知道的信息，比如 `{ mid: 349991143 }`，不同key的说明可以参阅[IDs](#ids)

- `targets`: Array，需要的信息，比如 `['follower']`，每个值的说明可以参阅[APIs](#apis)

- `option`: Object，可选设置。

  - `wait`: Number，默认0。

    如果在短时间发起过多请求，可能会被bilibili暂时banIP，所以可以在这里指定一个请求delay，单位 ms 毫秒，每一个网络请求都会暂停一段时间。

    比如上面的获取舰团数据例子就有 200 毫秒延迟，因为它需要遍历舰团的每一页，所以最好设置一个delay。

<!-- #### Option -->

### Router Graph

![Graph of apis](api.svg)

# Bilibili API Document

这里收集的API应该属于"匿名API(自造词)"，即不需要 登陆/appkey 的API。

用处大概是公开信息获取，暂时没有涉及类似"发弹幕/评论"相关API的打算。

以下是可能满足类似需求的资料：

[fython/BilibiliAPIDocs: Bilibili API (For thrid-party) Documents 哔哩哔哩开放接口第三方文档](https://github.com/fython/BilibiliAPIDocs)

[lovelyyoshino/Bilibili-Live-API: BILIBILI 直播/番剧 API](https://github.com/lovelyyoshino/Bilibili-Live-API)

[Vespa314/bilibili-api: B站API收集整理及开发，测试【开发中】](https://github.com/Vespa314/bilibili-api)

## DATAs

* ### <a name="api_mid"></a>mid

  大概是 Member ID?

  UP主个人空间地址 <https://space.bilibili.com/43222001/> 中的`43222001`就是这个`mid`了

* ### <a name="api_aid"></a>aid

  就是av号啦→\_→

  比如视频 https://www.bilibili.com/video/av2134250/ 中的`2134250`就是`aid`

* ### <a name="api_roomid"></a>roomid

  直播房间号

  ##### 前置

  <[getRoomInfoOld](#api_getRoomInfoOld)>

* ### <a name="api_online"></a>online

  直播间当前人气值

  非直播状态为0

  ##### 前置

  <[roomid](#api_roomid)>, <[liveStatus](#api_liveStatus)>

* ### <a name="api_liveStatus"></a>liveStatus

  直播状态，直播中为`1`，轮播/没播为`0`

  ##### 前置

  <[roomStatus](#api_roomStatus)>, <[getRoomInfoOld](#api_getRoomInfoOld)>

* ### <a name="api_guardNum"></a>guardNum

  直播舰团

  ##### 前置

  <[topList](#api_topList)>

* ### <a name="api_title"></a>title

  直播间标题

  ##### 前置

  <[getRoomInfoOld](#api_getRoomInfoOld)>

* ### <a name="api_notice"></a>notice

  公告

  ##### 前置

  <[_notice](#api__notice)>

* ### <a name="api_video"></a>video

  UP主的视频数

  ##### 前置

  <[navnum](#api_navnum)>

* ### <a name="api_archiveView"></a>archiveView

  UP主播放数

  ##### 前置

  <[upstat](#api_upstat)>

* ### <a name="api_articleView"></a>articleView

  UP主阅读数

  ##### 前置

  <[upstat](#api_upstat)>

* ### <a name="api_face"></a>face

  UP主头像的链接

  ##### 前置

  <[info](#api_info)>



## APIs

### <a name="api_stat"></a>stat

UP主统计数据

##### 前置

<[mid](#api_mid)>

##### API地址

`https://api.bilibili.com/x/relation/stat?vmid=<mid>`

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
    "follower": 329225
  }
}
```

### <a name="api_info"></a>info

UP主信息

##### 前置

<[mid](#api_mid)>

##### API地址

`https://api.bilibili.com/x/space/acc/info?mid=<mid>`

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
    "face": "http://i2.hdslb.com/bfs/face/49e143e1cae7f9e51b36c6c670976a95cc41ce12.jpg",
    "sign": "这里是神楽めあ(KaguraMea)！来自日本的清楚系虚拟YouTuber～weibo:@kaguramea　",
    "rank": 10000,
    "level": 6,
    "jointime": 0,
    "moral": 0,
    "silence": 0,
    "birthday": "08-02",
    "coins": 83713.9,
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

##### 前置

<[aid](#api_aid)>

##### API地址

`https://api.bilibili.com/x/web-interface/view?aid=<aid>`

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
      "view": 8491,
      "danmaku": 51,
      "reply": 33,
      "favorite":
......
```

### <a name="api_list"></a>list

弹幕

##### 前置

<[cid](#api_cid)>

##### API地址

`https://api.bilibili.com/x/v1/dm/list.so?oid=<cid>`

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
        "_": "刷绘里的几个意思……",
        "$": {
          "p": "12.85700,1,25,16777215,1545353720,0,7907fd34,9548094612439040"
        }
      },
      {
        "_": "草",
        "$": {
          "p": "116.61600,1,25,16777215,1545803269,0,8b709dfe,9783787808882688"
        }
      },
      {
        "_": "双核处理器kana？",
        "$": {
          "p": "115.41100,1,25,16777215,1546321539,0,66471589,10055510694821888"
    
......
```

### <a name="api_getRoomInfoOld"></a>getRoomInfoOld

##### 前置

<[mid](#api_mid)>

##### API地址

`https://api.live.bilibili.com/room/v1/Room/getRoomInfoOld?mid=<mid>`

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
    "title": "GWで散々な目にあいました",
    "cover": "https://i0.hdslb.com/bfs/live/room_cover/2df7be5bf90424a9609935dc678017078b812d5a.jpg",
    "online": 303084,
    "roomid": 12235923,
    "broadcast_type": 0
  }
}
```

### <a name="api_topList"></a>topList

##### 前置

<[roomid](#api_roomid)>, <[mid](#api_mid)>, [[page](#api_page)]

##### API地址

`https://api.live.bilibili.com/guard/topList?roomid=<roomid>&page=1&ruid=<mid>`

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
      "num": 752,
      "page": 75,
      "now": 1
    },
    "list": [
      {
        "uid": 70836,
        "ruid": 349991143,
        "rank": 1,
        "username": "我抱头蹲防啦",
        "face": "https://i2.hdslb.com/bfs/face/bc7a7b985e562c2bd4369cb704973866b1988c42.jpg",
        "is_alive": 0,
        "guard_level": 2
      },
      {
        "uid": 749030,
        "ruid": 349991143,
        "rank": 2,
        "username": "HakureiMea",
        "face": "https://i2.hdslb.com/bfs/face/7bb24266f576ba89b8911191da95e9974d6f547b.jpg",
        "is_alive": 0,
        "guard_level": 2
      },
      {
        "uid": 1336969,
        "ruid": 349991143,
        "rank": 3,
        "username": "T-_3",
        "face": "https://i1.hdslb.com/bfs/face/5032391c42751f362c783a685e563883dd6870b2.jpg",
        "is_alive": 0,
        "guard_level": 2
      },
      {
        "uid": 1935136,
        "ruid": 349991143,
        
......
```

### <a name="api_getAnchorInRoom"></a>getAnchorInRoom

##### 前置

<[roomid](#api_roomid)>

##### API地址

`https://api.live.bilibili.com/live_user/v1/UserInfo/get_anchor_in_room?roomid=<roomid>`

##### 实例:

https://api.live.bilibili.com/live_user/v1/UserInfo/get_anchor_in_room?roomid=12235923

##### 返回 (json->json):

```json
{
  "code": 0,
  "msg": "success",
  "message": "success",
  "data": {
    "info": {
      "uid": 349991143,
      "uname": "神楽めあOfficial",
      "face": "https://i2.hdslb.com/bfs/face/49e143e1cae7f9e51b36c6c670976a95cc41ce12.jpg",
      "rank": "10000",
      "platform_user_level": 6,
      "mobile_verify": 0,
      "official_verify": {
        "type": 0,
        "desc": "bilibili 知名UP主",
        "role": 1
      },
      "vip_type": 2,
      "gender": 2
    },
    "level": {
      "uid": 349991143,
      "cost": 642000,
      "rcost": 4250689903,
      "user_score": "0",
      "vip": 0,
      "vip_time": "2018-08-03 13:56:27",
      "svip": 0,
      "svip_time": "0000-00-00 00:00:00",
      "update_time": "2019-05-05 09:57:03",
      "master_level": {
        "level": 34,
        "current": [
          9100000,
          36413810
        ],
        "next": [
          11400000,
          47813810
        ],
        "color": 16746162,
        "anchor_score": 42506899,
        "upgrade_
......
```

### <a name="api__notice"></a>\_notice

UP主公告

##### 前置

<[mid](#api_mid)>

##### API地址

`https://api.bilibili.com/x/space/notice?mid=<mid>`

##### 实例:

https://api.bilibili.com/x/space/notice?mid=349991143

##### 返回 (json->json):

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": "【QQ群】\nMeaMea公国第三国度：860327880\nMeaMea公国第一国度：431766969\nMeaMea公国第二国度：749547516"
}
```

### <a name="api_rankdb"></a>rankdb

bilibili直播一周元气榜分区排名

##### 前置

<[mid](#api_mid)>

##### API地址

`https://api.live.bilibili.com/rankdb/v1/Common/roomInfo?ruid=<mid>`

##### 实例:

https://api.live.bilibili.com/rankdb/v1/Common/roomInfo?ruid=349991143

##### 返回 (json->json):

```json
{
  "code": 0,
  "msg": "OK",
  "message": "OK",
  "data": {
    "areaRank": {
      "index": 4,
      "rank": "28"
    }
  }
}
```



# Contribution

欢迎各种Issue和Pull Request

开Issue聊天也行→\_→！！！

详细可以阅读 [CONTRIBUTING.md](CONTRIBUTING.md)
