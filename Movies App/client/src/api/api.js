import axios from "./axios";

export const registerRequest = (data) => axios.post(`/register`, data);
export const loginRequest = (data) => axios.post(`/login`, data);
export const verifyTokenRequest = () => axios.get(`/verify`);
export const getUsersRequest = () => axios.get(`/users`);
export const deleteUserRequest = (id) => axios.delete(`/users/${id}`);
