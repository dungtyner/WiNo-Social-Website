import { BACKEND_API_URL } from '../config'
const _fetch = async (method, path, { query = {}, body = null }) => {
  const url = prepareUrl(path, query)

  return await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: body === null ? null : JSON.stringify(body),
  })
}

const prepareUrl = (path, query) => {
  for (const key in query) {
    const regex = new RegExp(`:${key}`, 'g')
    if (regex.test(path)) {
      path = path.replace(regex, query[key])
      delete query[key]
    }
  }

  let url = new URL(`${BACKEND_API_URL}${path}`)

  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, value)
  }

  return url.toString()
}

export default _fetch
