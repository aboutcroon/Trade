/* 判断值是否存在 */
export function isLocalName (name) {
  return window.localStorage.hasOwnProperty(name)
}
/* 获取值 */
export function getLocal (name) {
  // 从 localStorage 中获取名为 name 的值，将获取到的值由字符串转换为 JSON 格式
  return JSON.parse(window.localStorage.getItem(name))
}
/* 设置值 */
export function setLocal (name, data) {
  window.localStorage.setItem(name, JSON.stringify(data))
}
