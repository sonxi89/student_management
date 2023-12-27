import axiosClient from './aixosClient';

const userApi = {
  getAll(paramId) {
    const url = 'student/get-all';
    return axiosClient.get(url, { params: paramId });
  },
  getScore(params) {
    const url = 'student/scores';
    return axiosClient.get(url, { params: params });
  },
  getStudent(params) {
    const url = `student/students`;
    return axiosClient.get(url, { params: params });
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
  getReport() {
    const url = 'student/report';
    return axiosClient.get(url);
  },
  getStatistics(params) {
    const url = 'student/statistics';
    return axiosClient.get(url, { params: params });
  },
  getDataChart() {
    const url = 'student/data-chart';
    return axiosClient.get(url);
  },
};

export default userApi;
