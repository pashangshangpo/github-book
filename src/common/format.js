const SIGN_REGEXP = /([yMdhsm])(\1*)/g
const DEFAULT_PATTERN = 'yyyy-MM-dd'

let PrefixInteger = (s, len) => {
  let length = len - (s + '').length

  for (let i = 0; i < length; i += 1) {
    s = `0${s}`
  }

  return s
}

/**
 * 对传入的时间戳进行格式化时间输出.
 * @param {number} timeStamp - 时间戳（毫秒级时间戳）
 * @param {string} pattern - 要输出的时间格式.
 * *'yyyy-MM-dd hh:mm:ss' 年月日時分秒
 * example
 * *Format(1542950608000, 'yyyy-MM-dd hh:mm:ss')
 * *
 */
export default (date, pattern) => {
  if (typeof date !== 'object') {
    date = new Date(date)
  }

  pattern = pattern || DEFAULT_PATTERN

  return pattern.replace(SIGN_REGEXP, $0 => {
    switch ($0.charAt(0)) {
      case 'y':
        return PrefixInteger(date.getFullYear(), $0.length)
      case 'M':
        return PrefixInteger(date.getMonth() + 1, $0.length)
      case 'd':
        return PrefixInteger(date.getDate(), $0.length)
      case 'w':
        return date.getDay() + 1
      case 'h':
        return PrefixInteger(date.getHours(), $0.length)
      case 'm':
        return PrefixInteger(date.getMinutes(), $0.length)
      case 's':
        return PrefixInteger(date.getSeconds(), $0.length)
    }
  })
}
