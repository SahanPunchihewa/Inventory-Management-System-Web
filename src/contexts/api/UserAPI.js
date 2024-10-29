import axios from "axios";
import requestConfig from "./requestConfig";
import requestConfigJson from "./requestConfigJson";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

class UserAPI {
	// login user
	static login(values) {
		return axios.post(`${BASE_URL}/api/User/login`, values, requestConfigJson);
	}
	// user register
	static register(values) {
		return axios.post(`${BASE_URL}/api/User/register`, values, requestConfigJson);
	}
	// get all users
	static getAllUsers() {
		return axios.get(`${BASE_URL}/api/User`, requestConfig);
	}

	// get one user
	static getOneUser(id) {
		return axios.get(`${BASE_URL}/api/User/${id}`, requestConfig);
	}

	// update user
	static updateUser(id, values) {
		return axios.put(`${BASE_URL}/api/User/${id}`, values, requestConfigJson);
	}

	// delete user
	static deleteUser(id) {
		return axios.delete(`${BASE_URL}/api/User/${id}`, requestConfig);
	}
}

export default UserAPI;
