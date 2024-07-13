import { createRequest } from '../utilities/requests'
const AccountAPI = {
  getAll: async (query = {}) => {
    const path = '/account'
    return await createRequest('GET', path, { query })
  },
  getId: async (id) => {
    const path = '/account/:id'
    return await createRequest('GET', path, { id })
  },

  searchAccounts: async (query = {}) => {
    const path = '/account/search/keyword'
    return await createRequest('GET', path, { query })
  },

  updateInfo: async (query = {}) => {
    const path = '/account/update/:id'
    return await createRequest('PUT', path, { query })
  },

  changeAvatar: async (query = {}) => {
    const path = '/account/update/avatar'
    return await createRequest('PUT', path, { query })
  },
}

export default AccountAPI
