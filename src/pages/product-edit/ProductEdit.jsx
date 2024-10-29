import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components";
import ProductContext from "../../contexts/ProductContext";

const ProductEdit = () => {
	const { getProduct, setProduct, isLoading, product, updateProduct } = useContext(ProductContext);

	const permissionLevel = localStorage.getItem("permissionLevel");

	const handleChange = (e) => {
		setProduct(e.target.value);
	};

	const { id } = useParams();
	getProduct(id);

	const handleSubmit = (e) => {
		e.preventDefault();

		const newProductUpdate = {
			id: id,
			productId: e.target.productId.value,
			name: e.target.name.value,
			description: e.target.description.value,
			quantityInStock: e.target.quantityInStock.value,
			price: e.target.price.value,
			minimumStockLevel: e.target.minimumStockLevel.value,
		};
		updateProduct(newProductUpdate);
	};

	return (
		<>
			<div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
				{isLoading && <Spinner />}
				<div className="text-2xl py-4 px-6 bg-primary-color text-white text-center font-bold uppercase">
					Update Product
				</div>
				<form className="py-4 px-6" onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="">
							Product ID
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="productId"
							value={product.productId}
							name="productId"
							type="number"
							onChange={handleChange}
							placeholder="Enter Product ID"
							disabled={permissionLevel === "EMPLOYEE"}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="">
							Product Name
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							value={product.name}
							name="name"
							type="text"
							onChange={handleChange}
							placeholder="Enter Product Name"
							disabled={permissionLevel === "EMPLOYEE"}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="">
							Product Description
						</label>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="description"
							value={product.description}
							name="description"
							rows={2}
							onChange={handleChange}
							placeholder="Enter Product Description"
							defaultValue={""}
							disabled={permissionLevel === "EMPLOYEE"}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="date">
							Product Quantity In Stock
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="quantityInStock"
							value={product.quantityInStock}
							name="quantityInStock"
							type="number"
							onChange={handleChange}
							placeholder="Enter Quantity In Stock"
							disabled={permissionLevel === "EMPLOYEE"}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="time">
							Product Price
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="price"
							value={product.price}
							name="price"
							type="number"
							onChange={handleChange}
							placeholder="Enter Product Price"
							disabled={permissionLevel === "EMPLOYEE"}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="service">
							Product Minimum Stock Level
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="minimumStockLevel"
							value={product.minimumStockLevel}
							name="minimumStockLevel"
							type="number"
							onChange={handleChange}
							placeholder="Enter Product Minimum Stock Level"
						/>
					</div>

					<div className="flex items-center justify-center mb-4">
						<button
							className="bg-primary-color text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Update Product
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default ProductEdit;
