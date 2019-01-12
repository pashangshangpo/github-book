import { GetData } from '$common/local-storage'

let { href, protocol, host } = location

if (!GetData('github') && href.indexOf('/#/login') === -1) {
  location.href = `${protocol}//${host}/#/login`
  location.reload(true)
} else {
  require('./main')
}
