import React, { useContext } from "react";
import { FaEdit, FaRedoAlt, FaTrash } from "react-icons/fa";
import ProductContext from "../../contexts/ProductContext";
import { Spinner } from "../../components";

const AllProducts = () => {
	const { products, isLoading } = useContext(ProductContext);

	return (
		<div className="p-4">
			{isLoading && <Spinner />}
			<h2 className="text-2xl mb-4">All Products</h2>
			<div className="overflow-x-auto rounded-lg">
				<table className="min-w-full bg-white border border-gray-300">
					<thead>
						<tr className="bg-gray-200">
							<th className="py-2 px-4 border">Product ID</th>
							<th className="py-2 px-4 border">Product Name</th>
							<th className="py-2 px-4 border">Product Description</th>
							<th className="py-2 px-4 border">Quantity In Stock</th>
							<th className="py-2 px-4 border">Price</th>
							<th className="py-2 px-4 border">Minimum Stock Level</th>
							<th className="py-2 px-4 border">Status</th>
							<th className="py-2 px-4 border">Edit</th>
							<th className="py-2 px-4 border">Restock</th>
							<th className="py-2 px-4 border">Delete</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id} className="hover:bg-gray-100">
								<td className="py-2 px-4 border">{product.productId}</td>
								<td className="py-2 px-4 border">{product.name}</td>
								<td className="py-2 px-4 border">{product.description}</td>
								<td className="py-2 px-4 border">{product.quantityInStock}</td>
								<td className="py-2 px-4 border">{product.price}</td>
								<td className="py-2 px-4 border">{product.mininumStockLevel}</td>
								<td className="py-2 px-4 border">
									{product.quantityInStock === 0 ? (
										<span className="text-red-500 font-bold">Out of Stock</span>
									) : product.quantityInStock < product.mininumStockLevel ? (
										<span className="text-orange-500 font-bold">Low Stock</span>
									) : (
										<span className="text-green-500 font-bold">In Stock</span>
									)}
								</td>
								<td className="py-2 px-4 border">
									<button className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-600">
										<FaEdit /> Edit
									</button>
								</td>
								<td className="py-2 px-4 border">
									<button className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-yellow-600">
										<FaRedoAlt /> Restock
									</button>
								</td>
								<td className="py-2 px-4 border">
									<button className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-red-600">
										<FaTrash /> Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllProducts;


