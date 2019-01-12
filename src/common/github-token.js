const NAME = 'github-token'

export const GetToken = () => {
  return localStorage.getItem(NAME)
}

export const SetToken = token => {
  localStorage.setItem(NAME, token)
}
