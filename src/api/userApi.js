import axiosClient from './aixosClient';

const userApi = {
  getAll(paramId) {
    const url = 'student/get-all';
    return axiosClient.get(url, { params: paramId });
  },
  getScore(page) {
    const url = `student/scores?page=${page}`;
    return axiosClient.get(url);
  },
  getStudent(page) {
    const url = `student/students?page=${page}`;
    return axiosClient.get(url);
  },
  getAward(params) {
    const url = 'student/awards';
    return axiosClient.get(url, { params: params });
  },
  updateStudent(paramId, body) {
    const url = `student/update/${paramId}`;
    return axiosClient.put(url, body);
  },
  updateScore(paramId, body) {
    const url = `student/update-score/${paramId}`;
    return axiosClient.put(url, body);
  },
};

export default userApi;
