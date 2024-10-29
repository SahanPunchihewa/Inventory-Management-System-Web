import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductAPI from "./api/ProductAPI";
import { makeToast } from "../components";

const ProductContext = createContext();

export function ProductProvider({ children }) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [inventorySummary, setInventorySummary] = useState([]);
	const [lowStockProducts, setLowStockProducts] = useState([]);
	const [outOfStockProducts, setOutOfStockProducts] = useState([]);
	const [product, setProduct] = useState({
		productId: "",
		name: "",
		description: "",
		quantityInStock: "",
		price: "",
		minimumStockLevel: "",
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
		setIsLoading(true);
		ProductAPI.deleteProduct(id)
			.then((response) => {
				setProducts(products.filter((product) => product.id !== id));
				makeToast({ type: "success", message: "Product deleted" });
			})
			.catch((error) => {
				makeToast({ type: "error", message: "Product not deleted" });
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	// create product
	const createProduct = async (values) => {
		try {
			setIsLoading(true);
			const response = await ProductAPI.createProduct(values);
			setProducts([...products, response.data]);
			setIsLoading(false);
			makeToast({ type: "success", message: "Product created" });
			navigate("/user");
		} catch (error) {
			makeToast({ type: "error", message: "Product not created" });
			setIsLoading(false);
		}
	};

	// get one product
	const getProduct = (id) => {
		useEffect(() => {
			setIsLoading(true);
			ProductAPI.getOneProduct(id).then((res) => {
				setProduct(res.data);
				setIsLoading(false);
			});
		}, []);
	};
	// Update product
	const updateProduct = (values) => {
		const newProductUpdate = {
			id: values.id,
			productId: values.productId,
			name: values.name,
			description: values.description,
			quantityInStock: values.quantityInStock,
			price: values.price,
			minimumStockLevel: values.minimumStockLevel,
		};

		setIsLoading(true); // Corrected loading state update
		ProductAPI.updateProduct(values.id, newProductUpdate)
			.then((response) => {
				setProducts(products.map((product) => (product.id === values.id ? newProductUpdate : product)));
				setIsLoading(false);
				makeToast({ type: "success", message: "Product updated" });
				navigate("/user");
			})
			.catch((error) => {
				setIsLoading(false); // Ensure loading state resets on error
				makeToast({ type: "error", message: "Product not updated" });
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
				createProduct,
				getProduct,
				updateProduct,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}

export default ProductContext;
