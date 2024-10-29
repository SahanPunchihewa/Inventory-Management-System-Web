import { useContext } from "react";
import ProductContext from "../../contexts/ProductContext";
import { Spinner } from "../../components";

const ProductCreate = () => {
	const { createProduct, isLoading } = useContext(ProductContext);

	const handleSumbit = (e) => {
		e.preventDefault();

		const newProduct = {
			productId: e.target.productId.value,
			name: e.target.name.value,
			description: e.target.description.value,
			quantityInStock: e.target.quantityInStock.value,
			price: e.target.price.value,
			minimumStockLevel: e.target.minimumStockLevel.value,
		};
		createProduct(newProduct);
	};

	return (
		<>
			<div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
				{isLoading && <Spinner />}
				<div className="text-2xl py-4 px-6 bg-primary-color text-white text-center font-bold uppercase">
					Create New Product
				</div>
				<form className="py-4 px-6" onSubmit={handleSumbit}>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="">
							Product ID
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="productId"
							name="productId"
							type="number"
							placeholder="Enter Product ID"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="">
							Product Name
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							name="name"
							type="text"
							placeholder="Enter Product Name"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="">
							Product Description
						</label>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="description"
							name="description"
							rows={2}
							placeholder="Enter Product Description"
							defaultValue={""}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="date">
							Product Quantity In Stock
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="quantityInStock"
							name="quantityInStock"
							type="number"
							placeholder="Enter Quantity In Stock"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="time">
							Product Price
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="price"
							name="price"
							type="number"
							placeholder="Enter Product Price"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="service">
							Product Minimum Stock Level
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="minimumStockLevel"
							name="minimumStockLevel"
							type="number"
							placeholder="Enter Product Minimum Stock Level"
						/>
					</div>

					<div className="flex items-center justify-center mb-4">
						<button
							className="bg-primary-color text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Create Product
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default ProductCreate;
