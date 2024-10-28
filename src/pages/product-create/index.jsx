import React from "react";
import ProductCreate from "./ProductCreate";
import { ProductProvider } from "../../contexts/ProductContext";

const index = () => {
	return (
		<ProductProvider>
			<ProductCreate />
		</ProductProvider>
	);
};

export default index;
