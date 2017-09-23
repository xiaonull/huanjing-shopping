import axios from 'axios'
import util from '@/js/util'
// 配置线上基地址
window.baseURL = 'http://fairyapi.niowoo.cn'
// 所有请求的全局配置
var instance = axios.create({
  baseURL: 'http://fairyapi.niowoo.cn',
  timeout: 3000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  }
});
function _getToken () {
  return util.getSession('Token')
}
// 获取token
export function getToken () {
  let url = 'get-token'
  return instance.get(url)
}

// 获取用户信息
export function getUserDate () {
  let url = 'user'
  return instance.get(url, {
    headers: {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 登录
export function login (account, password) {
  let url = 'login'
  return instance({
    'method': 'POST',
    'url': url,
    'data': {
      'phone': account,
      'password': password
    },
    'headers': {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 获取土地信息
export function getLandsData () {
  let url = 'lands'
  return instance.get(url, {
    headers: {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 开地操作
export function assart (xy) {
  let url = 'assart/' + xy
  return instance({
    'method': 'POST',
    'url': url,
    'data': {},
    'headers': {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 增种操作
export function seeding (treeId, seedNum) {
  let url = 'seeding/' + treeId + '/' + seedNum
  return instance({
    'method': 'POST',
    'url': url,
    'data': {},
    'headers': {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 施肥操作
export function fertilizer () {
  let url = 'fertilizer'
  return instance({
    'method': 'POST',
    'url': url,
    'data': {},
    'headers': {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 浇水操作
export function irrigation () {
  let url = 'irrigation'
  return instance({
    'method': 'POST',
    'url': url,
    'data': {},
    'headers': {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 收获操作
export function pick (treeId) {
  let url = 'pick' + '/' + treeId
  return instance({
    'method': 'POST',
    'url': url,
    'data': {},
    'headers': {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 获取消息
export function news () {
  let url = 'news'
  return instance.get(url, {
    headers: {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 修改密码
export function userPassword (passwordType, oldPassword, password) {
  let url = 'user/password'
  return instance({
    'method': 'POST',
    'url': url,
    'data': {
      'type': passwordType,
      'old_password': oldPassword,
      'password': password
    },
    'headers': {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 头像修改
export function setHead (imageSrc) {
  let url = 'user/update/head'
  return instance({
    'method': 'POST',
    'url': url,
    'data': {
      value: imageSrc,
      head: ''
    },
    'headers': {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}


// 获取好友列表
export function getFriends () {
  let url = 'friends'
  return instance.get(url, {
    headers: {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 一键采蜜操作
export function oneGather () {
  let url = 'one-gather'
  return instance({
    'method': 'POST',
    'url': url,
    'data': {},
    'headers': {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 单个采蜜操作
export function simplyGather (friendId) {
  let url = 'gather/' + friendId
  return instance({
    'method': 'POST',
    'url': url,
    'data': {},
    'headers': {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 定向交易=》待收米
export function dxSell () {
  let url = 'user/trade/dxsell'
  return instance.get(url, {
    headers: {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 定向交易=》我要买
export function dxBuy () {
  let url = 'user/trade/dxbuy'
  return instance.get(url, {
    headers: {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 自由交易=》抢购
export function zyBuy () {
  let url = 'user/trade/zybuy'
  return instance.get(url, {
    headers: {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 自由交易=》抢购单
export function zySell () {
  let url = 'user/trade/zysell'
  return instance.get(url, {
    headers: {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 交易记录 =》购买记录
export function recordBuy () {
  let url = 'user/trade-log/buy'
  return instance.get(url, {
    headers: {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 交易记录 =》出售记录
export function recordSell () {
  let url = 'user/trade-log/dxsell'
  return instance.get(url, {
    headers: {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 交易记录 =》委托记录
export function recordBy () {
  let url = 'user/trade-log/zysell'
  return instance.get(url, {
    headers: {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 交易记录 =》取消记录
export function recordCancel () {
  let url = 'user/trade-log/cancel'
  return instance.get(url, {
    headers: {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 并发请求交易大厅的数据
//返回的数序： 待收米 我要买 抢购 抢购单 购买记录 出售记录 委托记录 取消记录
export function jiaoyiAllData () {
  return axios.all(dxSell(), dxBuy(), zyBuy(), zySell(), recordBuy(), recordSell(), recordBy(), recordCancel())
}


// 注册
export function register (phone, code, actcode, password, safe_password, nick, wx_name) {
  let url = 'register'
  return instance({
    'method': 'POST',
    'url': url,
    'data': {
      phone,
      code,
      actcode,
      password,
      safe_password,
      nick,
      wx_name
    },
    'headers': {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}

// 获取注册验证码
export function registerSms (phone) {
  let url = 'register-sms'
  return instance({
    'method': 'POST',
    'url': url,
    'data': {
      phone,
    },
    'headers': {
      'X-CSRF-TOKEN': _getToken()
    }
  })
}
