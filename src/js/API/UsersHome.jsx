import { createRequest } from '../utilities/requests'

const UsersHome = {
  getUsersHome: async () => {
    const path = `/users_home`
    return await createRequest('GET', path)
  },

  postStatusUser: async (query) => {
    const path = `/users_home/post`
    return await createRequest('POST', path, { query })
  },
}

export default UsersHome
