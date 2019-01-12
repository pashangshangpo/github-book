import { GetToken } from '$common/github-token'

let token = GetToken()
let { href, protocol, host } = location

if (!token && href.indexOf('/#/login') === -1) {
  location.href = `${protocol}//${host}/#/login`
  location.reload(true)
} else {
  require('./main')
}
