import React from "react";
import ProductEdit from "./ProductEdit";
import { ProductProvider } from "../../contexts/ProductContext";

const index = () => {
	return (
		<>
			<ProductProvider>
				<ProductEdit />
			</ProductProvider>
		</>
	);
};

export default index;
