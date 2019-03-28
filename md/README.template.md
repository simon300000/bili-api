# Bili-api [![Travis (.com)](https://img.shields.io/travis/com/simon300000/bili-api.svg)](https://travis-ci.com/simon300000/bili-api) [![Coveralls github](https://img.shields.io/coveralls/github/simon300000/bili-api.svg)](https://coveralls.io/github/simon300000/bili-api) [![Greenkeeper badge](https://badges.greenkeeper.io/simon300000/bili-api.svg)](https://greenkeeper.io/)

```javascript
let object = await biliAPI({ mid: 349991143 }, ['uname', 'guardNum'])
object.uname // DATA
object.guardNum // DATA
```

# 目录

<!--toc-->

# biliAPI

## 安装

npm: `npm install bili-api`

## 开始

```javascript
const biliAPI = require('bili-api')
;
(async () => {
  let up = await biliAPI({ mid: 349991143 }, ['follower'])
  up.follower // DATA
})()
```

以上便是根据<[mid](#api_mid)>查找粉丝数，很简单对不对→\_→

### biliAPI Document

```javascript
/**
 * @method biliAPI
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

<!-- [[idDocument]] -->

## APIs

<!-- [[apiDocument]] -->

# Contribution

欢迎各种Issue和Pull Request

开Issue聊天也行→\_→！！！

详细可以阅读 [CONTRIBUTING.md](CONTRIBUTING.md)
