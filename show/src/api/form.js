export function formFilter(str) {
  let temp = ""
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255) {
      temp += str.charAt(i)
    }
  }
  return temp
}