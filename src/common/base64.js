export const Btoa = str => {
  return window.btoa(unescape(encodeURIComponent(str)))
}

export const Atob = str => {
  return decodeURIComponent(escape(window.atob(str)))
}
