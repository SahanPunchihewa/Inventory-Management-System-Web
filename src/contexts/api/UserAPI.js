import axios from "axios";
import requestConfig from "./requestConfig";
import requestConfigJson from "./requestConfigJson";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

class UserAPI {
	static login(values) {
		return axios.post(`${BASE_URL}/api/User/login`, values, requestConfigJson);
	}

	static register(values) {
		return axios.post(`${BASE_URL}/api/User/register`, values, requestConfigJson);
	}
}

export default UserAPI;
