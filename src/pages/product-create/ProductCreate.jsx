import { createContext, useState, useEffect } from "react";
import ProductContext from "../../contexts/ProductContext";

const ProductCreate = () => {
	return (
		<>
			<div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
				<div className="text-2xl py-4 px-6 bg-primary-color text-white text-center font-bold uppercase">
					Create New Product
				</div>
				<form className="py-4 px-6" action method="POST">
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="">
							Product ID
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							placeholder="Enter Product ID"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="">
							Product Name
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							placeholder="Enter Product Name"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="">
							Product Description
						</label>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="message"
							rows={4}
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
							id="date"
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
							id="price"
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
