const session = window.sessionStorage
export default {
  // 设置session值
  // 设置过后
  setSession (key, value) {
    session.setItem(key, value)
  },
  // 获取session值
  getSession (key) {
    return session.getItem(key)
  }
}