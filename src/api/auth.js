import axiosClient from './aixosClient';

const auth = {
  login(body) {
    const url = 'auth/login';
    return axiosClient.post(url, body);
  },
  changePassword(body) {
    const url = 'auth/change-password';
    return axiosClient.post(url, body);
  },
};

export default auth;
