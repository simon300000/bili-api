# Bili-api [![Travis (.com)](https://img.shields.io/travis/com/simon300000/bili-api.svg)](https://travis-ci.com/simon300000/bili-api) [![Coveralls github](https://img.shields.io/coveralls/github/simon300000/bili-api.svg)](https://coveralls.io/github/simon300000/bili-api) [![npm](https://img.shields.io/npm/v/bili-api.svg)](https://www.npmjs.com/package/bili-api)

```javascript
let object = await biliAPI({ mid: 349991143 }, ['uname', 'guardNum'])
object.uname // → "神楽Mea_Official"
object.guardNum // → 426
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
    + [topPhoto](#topphoto)
    + [roomid](#roomid)
    + [online](#online)
    + [liveStatus](#livestatus)
    + [roundStatus](#roundstatus)
    + [guardNum](#guardnum)
    + [guards](#guards)
    + [guardLevel](#guardlevel)
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
  up.follower // → 459209
})()
```

以上便是根据<[mid](#api_mid)>查找粉丝数，很简单对不对→\_→

想看看推的VTB有几个舰长，几个提督，有没有石油佬上总督？没问题！

```javascript
const biliAPI = require('bili-api');

(async () => {
  let { guardLevel } = await biliAPI({ mid: 349991143 }, ['guardLevel'], { wait: 200 })
  guardLevel // → [
  //  1,
  //  7,
  //  418
  //]
})()
```

部分API支持不同来源分支查询，比如通过用户名查找 mid，后查找其余信息。

```javascript
const biliAPI = require('bili-api');

(async () => {
  let { guardNum } = await biliAPI({ uname: '白上吹雪Official' }, ['guardNum'])
  guardNum // → 80
})()
```

通过视频 av 号查找UP主 mid，后查找UP主其余信息。

```javascript
const biliAPI = require('bili-api');

(async () => {
  // 一 般 友 情 夏 色 祭
  let { uname } = await biliAPI({ aid: 33342306 }, ['uname'])
  uname // → "夏色祭Official"
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

#### 更多例子:

##### 获取所有视频

```javascript
const biliAPI = require('bili-api');

(async () => {
  let { allVideos } = await biliAPI({ mid: 286700005 }, ['allVideos'])
  allVideos.length  // → 1456
  allVideos[0]  // → {
  //  "comment": 112,
  //  "typeid": 27,
  //  "play": 8064,
  //  "pic": "//i2.hdslb.com/bfs/archive/c70c6b1abcb13385fb21c5d040f3aa887373274c.jpg",
  //  "subtitle": "",
  //  "description": "幻夜字幕组译制\n翻译：太郎\n时轴/后期：万年2位",
  //  "copyright": "",
  //  "title": "【早安hololive】9月14日",
  //  "review": 0,
  //  "author": "hololive",
  //  "mid": 286700005,
  //  "is_union_video": 0,
  //  "created": 1568413809,
  //  "length": "02:00",
  //  "video_review": 247,
  //  "is_pay": 0,
  //  "favorites": 119,
  //  "aid": 67649251,
  //  "hide_click": false
  //}
})()
```

##### 获取视频分P的所有cid

```javascript
const biliAPI = require('bili-api');

(async () => {
  let { cids } = await biliAPI({ aid: 27702699 }, ['cids'])
  cids // → [
  //  117348519,
  //  117346761,
  //  117345948,
  //  117343514,
  //  117349741,
  //  117349698,
  //  116186644,
  //  114763979,
  //  114638549,
  //  114418415,
  //  114230987,
  //  113685416,
  //  113606632,
  //  112946049,
  //  112305652,
  //  112299881,
  //  112249982,
  //  112249847,
  //  112249715,
  //  111800712,
  //  111823761,
  //  111806238,
  //  111805606,
  //  111804322,
  //  110947294,
  //  110946620,
  //  113607080,
  //  110945683,
  //  108734088,
  //  108728098,
  //  108721702,
  //  108721496,
  //  107242490,
  //  107147481,
  //  113607702,
  //  106752299,
  //  106738746,
  //  106011326,
  //  105885163,
  //  105883722,
  //  105131095,
  //  103894110,
  //  103893362,
  //  103025841,
  //  103029620,
  //  100426228,
  //  100438286,
  //  100073514,
  //  100067702,
  //  100064630,
  //  98140930,
  //  98176581,
  //  97497904,
  //  97074496,
  //  98171575,
  //  96396213,
  //  96396029,
  //  94227448,
  //  94789318,
  //  94254317,
  //  93784890,
  //  94257750,
  //  94317035,
  //  94319102,
  //  94319353,
  //  94319982,
  //  94320142,
  //  94320271,
  //  94320723,
  //  94320982,
  //  94320998,
  //  94321024,
  //  97056382,
  //  96535734,
  //  96534727,
  //  96534219,
  //  96533304,
  //  96541034,
  //  103127764,
  //  103128533,
  //  103129216,
  //  103129712,
  //  103129922,
  //  103130328,
  //  103130885,
  //  103130897,
  //  103131464,
  //  103132696,
  //  103132455,
  //  103132879,
  //  103111181,
  //  103112536,
  //  103113244,
  //  103114950,
  //  103117360,
  //  103118025,
  //  103118461,
  //  103119415,
  //  47780428
  //]
})()
```

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

* ### <a name="api_topPhoto"></a>topPhoto

  个人空间头图

  ##### 前置

  <[info](#api_info)>

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

* ### <a name="api_roundStatus"></a>roundStatus

  轮播状态，轮播中为`1`

  ##### 前置

  <[roomStatus](#api_roomStatus)>, <[getRoomInfoOld](#api_getRoomInfoOld)>

* ### <a name="api_guardNum"></a>guardNum

  直播舰团

  ##### 前置

  <[topList](#api_topList)>

* ### <a name="api_guards"></a>guards

  舰团列表

  ##### 前置

  <[fullTopList](#api_fullTopList)>

* ### <a name="api_guardLevel"></a>guardLevel

  舰团各等级数

  ##### 前置

  <[guards](#api_guards)>

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
    "following": 72,
    "whisper": 0,
    "black": 0,
    "follower": 459209
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
    "name": "神楽Mea_Official",
    "sex": "女",
    "face": "http://i0.hdslb.com/bfs/face/ed0a3a864b38ef0f4bc1ee35c863f70ec50b6271.jpg",
    "sign": "别看我啊",
    "rank": 10000,
    "level": 6,
    "jointime": 0,
    "moral": 0,
    "silence": 0,
    "birthday": "08-02",
    "coins": 0,
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
    "top_photo": "http://i0.hdslb.com/bfs/space/cde2a0fe3273ae4466d135541d965e21c58a7454.png",
    "theme": {},
    "sys_notice": {}
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
      "face": "http://i2.hdslb.com/bfs/face/37d684a236f078baa1e00539d9c16d667b4a6f1f.jpg"
    },
    "stat": {
      "aid": 30669363,
      "view": 18288,
      "danmaku": 117,
      "reply": 49,
      "favorite
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
        "_": "草",
        "$": {
          "p": "116.61600,1,25,16777215,1545803269,0,8b709dfe,9783787808882688"
        }
      },
      {
        "_": "双核处理器kana？",
        "$": {
          "p": "115.41100,1,25,16777215,1546321539,0,66471589,10055510694821888"
        }
      },
      {
        "_": "活结草",
        "$": {
          "p": "96.67800,1,25,16777215,1546963088,0,24bac661,10391867015823364"
        }

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
  "message": "0",
  "ttl": 1,
  "data": {
    "roomStatus": 1,
    "roundStatus": 0,
    "liveStatus": 0,
    "url": "https://live.bilibili.com/12235923",
    "title": "b限　请给我钱　 我很可爱",
    "cover": "http://i0.hdslb.com/bfs/live/room_cover/b401f1166539dae805b9755624ce5b99a418d12c.jpg",
    "online": 312914,
    "roomid": 12235923,
    "broadcast_type": 0,
    "online_hidden": 0
  }
}
```

### <a name="api_topList"></a>topList

##### 前置

<[roomid](#api_roomid)>, <[mid](#api_mid)>, [[page](#api_page)]

##### API地址

`https://api.live.bilibili.com/guard/topList?roomid=<roomid>&page=[page]&ruid=<mid>`

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
      "num": 426,
      "page": 43,
      "now": 1,
      "achievement_level": 2
    },
    "list": [
      {
        "uid": 1336969,
        "ruid": 349991143,
        "rank": 1,
        "username": "T-_3",
        "face": "https://i1.hdslb.com/bfs/face/5032391c42751f362c783a685e563883dd6870b2.jpg",
        "is_alive": 0,
        "guard_level": 2
      },
      {
        "uid": 3446994,
        "ruid": 349991143,
        "rank": 2,
        "username": "G線上のアリア",
        "face": "https://i2.hdslb.com/bfs/face/3c131ab362797fe1f03cd3f2a8240de37eab523d.jpg",
        "is_alive": 0,
        "guard_level": 2
      },
      {
        "uid": 3501317,
        "ruid": 349991143,
        "rank": 3,
        "username": "ジャンヌ-オルタ",
        "face": "https://i2.hdslb.com/bfs/face/645f5d0f2370dfc3267c77d822c56a643296f884.jpg",
        "is_alive": 0,
        "guard_level": 2
      },
      {
        "uid": 38608128,
  
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
      "uname": "神楽Mea_Official",
      "face": "https://i0.hdslb.com/bfs/face/ed0a3a864b38ef0f4bc1ee35c863f70ec50b6271.jpg",
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
      "cost": 669900,
      "rcost": 12180421785,
      "user_score": "0",
      "vip": 0,
      "vip_time": "2018-08-03 13:56:27",
      "svip": 0,
      "svip_time": "0000-00-00 00:00:00",
      "update_time": "2019-09-14 22:44:49",
      "master_level": {
        "level": 38,
        "current": [
          20000000,
          99513810
        ],
        "next": [
          22500000,
          122013810
        ],
        "color": 16746162,
        "anchor_score": 121804217,
        "up
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
  "data": "Oo♡ 和Mea的约定 ♡oO\n▪ 直播时请不要和其他观众进行版聊。\n▪ 若是性质低劣的评论一直出现会视情况进行封禁。\n▪ 请各位观众不要单方面地提及其他主播的名字。在他人直播间也是同样的，主播未提及时，请尽量不要提起神乐Mea的话题\n▪ 一起遵守礼仪然后享受（？）直播吧！"
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
      "rank": "5"
    }
  }
}
```



# Contribution

欢迎各种Issue和Pull Request

开Issue聊天也行→\_→！！！

详细可以阅读 [CONTRIBUTING.md](CONTRIBUTING.md)
