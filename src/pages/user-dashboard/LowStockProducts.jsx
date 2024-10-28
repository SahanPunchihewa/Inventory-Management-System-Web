import { useContext } from "react";
import ProductContext from "../../contexts/ProductContext";
import { Spinner } from "../../components";

const LowStockProducts = () => {
	const { lowStockProducts, isLoading } = useContext(ProductContext);

	return (
		<>
			<div className="p-4">
				{isLoading && <Spinner />}
				<div className="flex justify-center mb-4">
					<h2 className="text-xl font-bold text-white bg-orange-500 px-4 py-2 rounded-md inline-block shadow-md">
						Low Stock Products
					</h2>
				</div>

				<div className="mb-4">
					<button
						// onClick={() => handleGenerateSummary()}
						className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
					>
						Generate Inventory Summary
					</button>
				</div>

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
							</tr>
						</thead>
						<tbody>
							{lowStockProducts.map((product) => (
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
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default LowStockProducts;
