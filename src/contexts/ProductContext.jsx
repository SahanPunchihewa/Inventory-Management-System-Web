import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductAPI from "./api/ProductAPI";
import { makeToast } from "../components";
import { useMutation, useQuery } from "@tanstack/react-query";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
	const [product, setProduct] = useState({
		id: "",
		name: "",
		description: "",
		quantityInStock: "",
		price: "",
		mininumStockLevel: "",
	});

	const {
		data: productsData,
		isLoading: productsIsLoading,
		refetch: refetchProducts,
	} = useQuery(["products"], () => ProductAPI.getAllProducts(), {
		enabled: true,
	});

	return (
		<ProductContext.Provider
			value={{
				product,
				setProduct,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}
