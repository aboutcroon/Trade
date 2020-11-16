import Cookies from 'js-cookie'

export function getSaveToken(tokenName) {
  let value = ''
  const local = localStorage.getItem(tokenName)
  const isCookie = Cookies.get(tokenName)
  if (local) {
    value = local
  } else if (isCookie) {
    value = isCookie
  }
  return value
}