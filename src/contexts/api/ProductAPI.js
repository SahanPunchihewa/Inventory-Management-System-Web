import axios from "axios";
import requestConfig from "./requestConfig";
import requestConfigJson from "./requestConfigJson";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

class ProductAPI {
	// create new product
	static createProduct(values) {
		return axios.post(`${BASE_URL}/api/Product/create`, values, requestConfig);
	}

	// get all products
	static getAllProducts() {
		return axios.get(`${BASE_URL}/api/Product`, requestConfig);
	}

	// get one product
	static getOneProduct(id) {
		return axios.get(`${BASE_URL}/api/Product/${id}`, requestConfig);
	}

	// get low stock products
	static getLowStockProducts() {
		return axios.get(`${BASE_URL}/api/Product/lowStock`, requestConfig);
	}

	// get out of stock products
	static getOutOfStockProducts() {
		return axios.get(`${BASE_URL}/api/Product/outOfStock`, requestConfig);
	}

	// inventory summary
	static getInventorySummary() {
		return axios.get(`${BASE_URL}/api/Product/inventorySummary`, requestConfig);
	}

	// update product
	static updateProduct(id, values) {
		return axios.put(`${BASE_URL}/api/Product/${id}`, values, requestConfigJson);
	}

	// delete product
	static deleteProduct(id) {
		return axios.delete(`${BASE_URL}/api/Product/${id}`, requestConfig);
	}
}

export default ProductAPI;
