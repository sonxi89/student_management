import axiosClient from './aixosClient';

const userApi = {
  getAll(paramId) {
    const url = 'student/get-users';
    return axiosClient.get(url, { params: paramId });
  },
  getStudent(paramId) {
    const url = 'student/get-students';
    return axiosClient.get(url, { params: paramId });
  },
};

export default userApi;
