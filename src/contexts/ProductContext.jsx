import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductAPI from "./api/ProductAPI";
import { makeToast } from "../components";

const ProductContext = createContext();

export function ProductProvider({ children }) {
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [inventorySummary, setInventorySummary] = useState([]);
	const [lowStockProducts, setLowStockProducts] = useState([]);
	const [outOfStockProducts, setOutOfStockProducts] = useState([]);
	const [product, setProduct] = useState({
		id: "",
		productId: "",
		name: "",
		description: "",
		quantityInStock: "",
		price: "",
		mininumStockLevel: "",
	});

	// Get all products
	useEffect(() => {
		setIsLoading(true);
		ProductAPI.getAllProducts().then((response) => {
			setProducts(response.data);
			setIsLoading(false);
		});
	}, []);

	// inventorySummary
	useEffect(() => {
		setIsLoading(true);
		ProductAPI.getInventorySummary().then((response) => {
			setInventorySummary(response.data);
			setIsLoading(false);
		});
	}, []);

	// get low stock products
	useEffect(() => {
		setIsLoading(true);
		ProductAPI.getLowStockProducts().then((response) => {
			setLowStockProducts(response.data);
			setIsLoading(false);
		});
	}, []);

	//  get out of stock products
	useEffect(() => {
		setIsLoading(true);
		ProductAPI.getOutOfStockProducts().then((response) => {
			setOutOfStockProducts(response.data);
			setIsLoading(false);
		});
	}, []);

	// delete product
	const deleteProduct = (id) => {
		ProductAPI.deleteProduct(id)
			.then((response) => {
				isLoading(true);
				setProducts(products.filter((product) => product.id !== id));
				makeToast({ type: "success", message: "Product deleted" });
				setIsLoading(false);
			})
			.catch((error) => {
				makeToast("error", error.response.data.message);
			});
	};

	return (
		<ProductContext.Provider
			value={{
				product,
				setProduct,
				products,
				setProducts,
				isLoading,
				setIsLoading,
				inventorySummary,
				setInventorySummary,
				lowStockProducts,
				setLowStockProducts,
				outOfStockProducts,
				setOutOfStockProducts,
				deleteProduct,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}

export default ProductContext;
