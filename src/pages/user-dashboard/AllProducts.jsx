import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import ProductContext from "../../contexts/ProductContext";
import { Spinner } from "../../components";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AllProducts = () => {
	const { products, isLoading, inventorySummary, deleteProduct } = useContext(ProductContext);

	const permissionLevel = localStorage.getItem("permissionLevel");

	function handleGenerateSummary() {
		const doc = new jsPDF();
		const today = new Date().toLocaleDateString();

		const tableColumn = [
			"Product ID",
			"Product Name",
			"Product Description",
			"Quantity In Stock",
			"Unit Price (Rs.)",
			"Minimum Stock Level",
		];
		const tableRows = [];

		const { lowStockProduct, outOfStockProduct, totalProducts, totalValue } = inventorySummary;

		products.forEach((item) => {
			const rowData = [
				item.productId,
				item.name,
				item.description,
				item.quantityInStock,
				item.price,
				item.minimumStockLevel,
			];
			tableRows.push(rowData);
		});

		doc.setFontSize(16);
		doc.setFont("Helvetica", "bold");
		doc.text(`Inventory Summary Report`, 14, 15);
		doc.setFontSize(12);
		doc.setFont("Helvetica", "normal");
		doc.text(`Generated on: ${today}`, 14, 22);
		doc.autoTable(tableColumn, tableRows, { startY: 70 });
		doc.setFontSize(12);
		doc.text(`Total Products:${totalProducts}`, 14, 32);
		doc.text(`Low Stock Products: ${lowStockProduct}`, 14, 42);
		doc.text(`Out of Stock Products: ${outOfStockProduct}`, 14, 52);
		doc.text(`Total Value of Products: Rs.${totalValue}`, 14, 62);
		doc.save("inventory-summary.pdf");
	}

	return (
		<div className="p-4">
			{isLoading && <Spinner />}
			<div className="flex justify-center mb-4">
				<h2 className="text-xl font-bold text-white bg-green-500 px-4 py-2 rounded-md inline-block shadow-md">
					All Products
				</h2>
			</div>

			<div className="mb-4 flex justify-between items-center">
				<button
					onClick={() => handleGenerateSummary()}
					className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-semibold"
				>
					Inventory Summary Report
				</button>

				<div className="flex justify-end">
					<Link to="/user/product/create">
						<button
							className={`${
								permissionLevel === "EMPLOYEE" ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
							} text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2`}
							disabled={permissionLevel === "EMPLOYEE"}
						>
							<FaPlus />
							Create Product
						</button>
					</Link>
				</div>
			</div>

			<div className="overflow-x-auto rounded-lg">
				<table className="min-w-full bg-white border border-gray-300 text-xs sm:text-sm md:text-md">
					<thead>
						<tr className="bg-gray-200">
							<th className="py-2 px-2 border">Product ID</th>
							<th className="py-2 px-2 border">Product Name</th>
							<th className="py-2 px-2 border">Product Description</th>
							<th className="py-2 px-2 border">Quantity In Stock</th>
							<th className="py-2 px-2 border">Price</th>
							<th className="py-2 px-2">Minimum Stock Level</th>
							<th className="py-2 px-2 border">Status</th>
							<th className="py-2 px-2 border">Edit</th>
							<th className="py-2 px-2 border">Delete</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product} className="hover:bg-gray-100">
								<td className="py-2 px-2 border">{product.productId}</td>
								<td className="py-2 px-2 border">{product.name}</td>
								<td className="py-2 px-2 border">{product.description}</td>
								<td className="py-2 px-2 border">{product.quantityInStock}</td>
								<td className="py-2 px-2 border">Rs. {product.price}</td>
								<td className="py-2 px-2 border">{product.minimumStockLevel}</td>
								<td className="py-2 px-2 border">
									{product.quantityInStock === 0 ? (
										<span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs font-semibold">
											Out of Stock
										</span>
									) : product.quantityInStock < product.minimumStockLevel ? (
										<span className="bg-yellow-500 text-white py-1 px-2 rounded-full text-xs font-semibold">
											Low Stock
										</span>
									) : (
										<span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs font-semibold">
											In Stock
										</span>
									)}
								</td>
								<td className="py-2 px-4 border">
									<Link to={`/user/product/edit/${product.id}`}>
										<button
											className="bg-yellow-500 hover:bg-yellow-600
												text-white px-2 py-1 rounded flex items-center gap-1 shadow-md"
										>
											<FaEdit />
										</button>
									</Link>
								</td>
								<td className="py-2 px-4 border">
									<button
										className={`${
											permissionLevel === "EMPLOYEE" ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
										} text-white px-2 py-1 rounded flex items-center gap-1 shadow-md`}
										onClick={() => deleteProduct(product.id)}
										disabled={permissionLevel === "EMPLOYEE"}
									>
										<FaTrash />
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
