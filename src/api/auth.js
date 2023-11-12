import axiosClient from './aixosClient';

const auth = {
  login(body) {
    const url = 'auth/login';
    return axiosClient.post(url, body);
  },
};

export default auth;
