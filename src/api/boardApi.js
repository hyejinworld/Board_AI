import axiosInstance from './axiosInstance';

export const getBoards = () => axiosInstance.get('/boards');
export const getBoard = (id) => axiosInstance.get(`/boards/${id}`);
export const createBoard = (data) => axiosInstance.post('/boards', data);
export const updateBoard = (id, data) => axiosInstance.put(`/boards/${id}`, data);
export const deleteBoard = (id) => axiosInstance.delete(`/boards/${id}`);
