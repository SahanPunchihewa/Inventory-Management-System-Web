import { useContext } from "react";
import ProductContext from "../../contexts/ProductContext";
import { Spinner } from "../../components";
import jsPDF from "jspdf";
import "jspdf-autotable";

const OutOfStockProduct = () => {
	const { outOfStockProducts, inventorySummary, isLoading } = useContext(ProductContext);

	function handleGenerateSummary() {
		const doc = new jsPDF();
		const today = new Date().toLocaleDateString();

		const tableColumn = [
			"Product ID",
			"Product Name",
			"Product Description",
			"Quantity In Stock",
			"Unit Price",
			"Minimum Stock Level",
		];
		const tableRows = [];

		const { outOfStockProduct, totalProducts } = inventorySummary;

		outOfStockProducts.forEach((item) => {
			const rowData = [
				item.productId,
				item.name,
				item.description,
				item.quantityInStock,
				item.price,
				item.mininumStockLevel,
			];
			tableRows.push(rowData);
		});

		doc.setFontSize(16);
		doc.setFont("Helvetica", "bold");
		doc.text(`Out of Stock Product Summary Report`, 14, 15);
		doc.setFontSize(12);
		doc.setFont("Helvetica", "normal");
		doc.text(`Generated on: ${today}`, 14, 22);
		doc.autoTable(tableColumn, tableRows, { startY: 50 });
		doc.setFontSize(12);
		doc.text(`Total Products: ${totalProducts}`, 14, 32);
		doc.text(`Out of Stock Products: ${outOfStockProduct}`, 14, 42);
		doc.save("out-of-stock-product-summary-report.pdf");
	}
	return (
		<>
			<div className="p-4">
				{isLoading && <Spinner />}
				<div className="flex justify-center mb-4">
					<h2 className="text-xl font-bold text-white bg-red-500 px-4 py-2 rounded-md inline-block shadow-md">
						Out of Stock Products
					</h2>
				</div>
				<div className="mb-4">
					<button
						onClick={() => handleGenerateSummary()}
						className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold"
					>
						Out of Stock Products Summary Report
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
							{outOfStockProducts.map((product) => (
								<tr key={product._id} className="hover:bg-gray-100">
									<td className="py-2 px-4 border">{product.productId}</td>
									<td className="py-2 px-4 border">{product.name}</td>
									<td className="py-2 px-4 border">{product.description}</td>
									<td className="py-2 px-4 border">{product.quantityInStock}</td>
									<td className="py-2 px-4 border">{product.price}</td>
									<td className="py-2 px-4 border">{product.mininumStockLevel}</td>
									<td className="py-2 px-4 border">
										{product.quantityInStock === 0 ? (
											<span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs font-bold shadow-md">
												Out of Stock
											</span>
										) : product.quantityInStock < product.mininumStockLevel ? (
											<span className="bg-yellow-500 text-white py-1 px-2 rounded-full text-xs font-bold shadow-md">
												Low Stock
											</span>
										) : (
											<span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs font-bold shadow-md">
												In Stock
											</span>
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

export default OutOfStockProduct;
