import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductAPI from "./api/ProductAPI";
import { makeToast } from "../components";
import Joi from "joi";

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

	// Product Form Validation
	const ProductFormSchema = Joi.object({
		productId: Joi.number().min(0).message("Product ID should be between 2 and 20 characters"),
		name: Joi.string().min(2).max(20).message("Product name should be between 2 and 20 characters"),
		description: Joi.string().min(2).max(100).message("Description should be between 2 and 100 characters"),
		quantityInStock: Joi.number().min(1).message("Quantity in stock should be valid"),
		price: Joi.number().min(1).message("Price should be valid"),
		minimumStockLevel: Joi.number().min(1).message("Minimum stock level should be valid"),
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
		setIsLoading(true);
		const { error } = ProductFormSchema.validate(values);
		if (error) {
			makeToast({ type: "error", message: error.message });
			setIsLoading(false);
			return;
		}
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
		setIsLoading(true);
		const newProductUpdate = {
			id: values.id,
			productId: values.productId,
			name: values.name,
			description: values.description,
			quantityInStock: values.quantityInStock,
			price: values.price,
			minimumStockLevel: values.minimumStockLevel,
		};

		setIsLoading(true);
		ProductAPI.updateProduct(values.id, newProductUpdate)
			.then((response) => {
				setProducts(products.map((product) => (product.id === values.id ? newProductUpdate : product)));
				setIsLoading(false);
				makeToast({ type: "success", message: "Product updated" });
				navigate("/user");
			})
			.catch((error) => {
				setIsLoading(false);
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
				ProductFormSchema,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}

export default ProductContext;
