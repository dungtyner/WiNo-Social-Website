import { HOST_SERVER } from '../config';
import axios from 'axios';
const AccountAPI = {
  /* eslint-disable no-unused-vars */
  getAll: async (query) => {
    const url = `${HOST_SERVER}/account`;
    var data = await fetch(url, { method: 'GET' }).then((res) => res.json());
    return data;
  },
  /* eslint-disable no-unused-vars */
  getId: async (query) => {
    const url = `${HOST_SERVER}/account/${query}`;
    var data = await fetch(url, { method: 'GET' }).then((res) => res.json());
    return data;
  },

  search_Accounts: async (query) => {
    const url = `${HOST_SERVER}/account/search/keyword${query}`;
    var data = await fetch(url, { method: 'GET' }).then((res) => res.json());
    return data;
  },

  update_info: (query) => {
    const url = `${HOST_SERVER}/account/update${query}`;
    var data = axios.put(url).then(function (res) {
      console.log(res);
    });
    return data;
  },

  change_avatar: (query) => {
    const url = `${HOST_SERVER}/account/update/avatar${query}`;
    var data = axios.put(url).then(function (res) {
      console.log(res);
    });
    return data;
  },
};

export default AccountAPI;
