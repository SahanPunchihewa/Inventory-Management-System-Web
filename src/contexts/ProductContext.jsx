import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductAPI from "./api/ProductAPI";
import { makeToast } from "../components";
import { useMutation, useQuery } from "@tanstack/react-query";

const ProductContext = createContext();

export function ProductProvider({ children }) {
	// const [product, setProduct] = useState({
	// 	id: "",
	// 	name: "",
	// 	description: "",
	// 	quantityInStock: "",
	// 	price: "",
	// 	mininumStockLevel: "",
	// });

	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		ProductAPI.getAllProducts().then((response) => {
			setProducts(response.data);
			setIsLoading(false);
		});
	}, []);

	// const {
	// 	isLoading: productsIsLoading,
	// 	refetch: refetchProduct
	// } = useQuery({
	// 	queryKey: ["product"],
	// 	queryFn: ProductAPI.getAllProducts,
	// 	onSuccess: (res) => {
	// 		setProducts(res.data);
	// 	}
	// })

	return (
		<ProductContext.Provider
			value={{
				// product,
				// setProduct,
				products,
				setProducts,
				// productsIsLoading,
				// refetchProduct,
				isLoading,
				setIsLoading,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}

export default ProductContext;
