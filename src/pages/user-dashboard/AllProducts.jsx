import React, { useContext } from "react";
import ProductContext from "../../contexts/ProductContext";
import { Spinner } from "../../components";

const AllProducts = () => {
	const { products, isLoading } = useContext(ProductContext);

	// if (productsIsLoading) {
	// 	return <div>Loading...</div>;
	// }

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
							<th className="py-2 px-4 border">Action</th>
							<th className="py-2 px-4 border">Action</th>
							<th className="py-2 px-4 border">Action</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id} className="hover:bg-gray-100">
								<td className="py-2 px-4 border">{product.id}</td>
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
								<td className="py-2 px-4 border">Action</td>
								<td className="py-2 px-4 border">Action</td>
								<td className="py-2 px-4 border">Action</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllProducts;
