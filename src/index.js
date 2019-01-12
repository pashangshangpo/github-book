import { GetData } from '$common/local-storage'

let { href, protocol, pathname, host } = location

if (!GetData('github') && href.indexOf('/#/login') === -1) {
  location.href = `${protocol}//${host}${pathname}#/login`
  location.reload(true)
} else {
  require('./main')
}
