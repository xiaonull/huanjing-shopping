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
