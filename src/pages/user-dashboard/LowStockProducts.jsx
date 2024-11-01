import { useContext } from "react";
import ProductContext from "../../contexts/ProductContext";
import { Spinner } from "../../components";
import jsPDF from "jspdf";
import "jspdf-autotable";

const LowStockProducts = () => {
	const { lowStockProducts, inventorySummary, isLoading } = useContext(ProductContext);

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

		const { lowStockProduct, totalProducts } = inventorySummary;

		lowStockProducts.forEach((item) => {
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
		doc.text(`Low Stock Product Summary Report`, 14, 15);
		doc.setFontSize(12);
		doc.setFont("Helvetica", "normal");
		doc.text(`Generated on: ${today}`, 14, 22);
		doc.autoTable(tableColumn, tableRows, { startY: 50 });
		doc.setFontSize(12);
		doc.text(`Total Products: ${totalProducts}`, 14, 32);
		doc.text(`Low Stock Products: ${lowStockProduct}`, 14, 42);
		doc.save("low-stock-product-summary-report.pdf");
	}

	return (
		<>
			<div className="p-4">
				{isLoading && <Spinner />}
				<div className="flex justify-center mb-4">
					<h2 className="text-xl font-bold text-white bg-yellow-500 px-4 py-2 rounded-md inline-block shadow-md">
						Low Stock Products
					</h2>
				</div>

				<div className="mb-4">
					<button
						onClick={() => handleGenerateSummary()}
						className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 font-semibold"
					>
						Low Stock Product Summary Report
					</button>
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
								<th className="py-2 px-2 border">Minimum Stock Level</th>
								<th className="py-2 px-2 border">Status</th>
							</tr>
						</thead>
						<tbody>
							{lowStockProducts.map((product) => (
								<tr key={product} className="hover:bg-gray-100">
									<td className="py-2 px-2 border">{product.productId}</td>
									<td className="py-2 px-2 border">{product.name}</td>
									<td className="py-2 px-2 border">{product.description}</td>
									<td className="py-2 px-2 border">{product.quantityInStock}</td>
									<td className="py-2 px-2 border">Rs. {product.price}</td>
									<td className="py-2 px-2 border">{product.minimumStockLevel}</td>
									<td className="py-2 px-2 border">
										{product.quantityInStock === 0 ? (
											<span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs font-semibold shadow-md">
												Out of Stock
											</span>
										) : product.quantityInStock < product.minimumStockLevel ? (
											<span className="bg-yellow-500 text-white py-1 px-2 rounded-full text-xs font-semibold shadow-md">
												Low Stock
											</span>
										) : (
											<span className="bg-green-500 text-white py-1 px-2 rounded-full text-x font-semibold shadow-md">
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

export default LowStockProducts;
