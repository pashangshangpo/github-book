const KEY = '$local-data-'

export const GetData = name => {
  let res = localStorage.getItem(`${KEY}${name}`)

  if (res) {
    try {
      res = JSON.parse(res)
    } catch (err) {
      throw new Error(err)
    }
  }

  return res
}

export const SetData = (name, data) => {
  if (typeof data !== 'string') {
    data = JSON.stringify(data)
  }

  localStorage.setItem(`${KEY}${name}`, data)
}
