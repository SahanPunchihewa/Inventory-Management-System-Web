import { useEffect, useState } from "react";
import { FaBox, FaExclamationTriangle, FaClipboardList, FaChartPie } from "react-icons/fa";
import ProductContext from "../../contexts/ProductContext";

const DashboardTab = () => {
	const [totalProducts, setTotalProducts] = useState(0);
	const [lowStockProducts, setLowStockProducts] = useState(0);
	const [outOfStockProducts, setOutOfStockProducts] = useState(0);
	const [inventorySummary, setInventorySummary] = useState(0);

	useEffect(() => {
		// Fetch data from API and set the state
		// Example data setting (replace with actual API calls)
		setTotalProducts(100);
		setLowStockProducts(20);
		setOutOfStockProducts(10);
		setInventorySummary(70);
	}, []);

	return (
		<div className="bg-gray-100 min-h-screen rounded-lg p-4 md:p-6">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-2">
				<Card title="Total Products" value={totalProducts} icon={<FaBox />} color="bg-blue-500" />
				<Card
					title="Low Stock Products"
					value={lowStockProducts}
					icon={<FaExclamationTriangle />}
					color="bg-yellow-500"
				/>
				<Card title="Out of Stock Products" value={outOfStockProducts} icon={<FaClipboardList />} color="bg-red-500" />
				<Card title="Total Employees" value={inventorySummary} icon={<FaChartPie />} color="bg-green-500" />
			</div>
		</div>
	);
};

const Card = ({ title, value, icon, color }) => {
	return (
		<div className="w-full px-2 mb-4">
			<div
				className={`rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out ${color} text-white`}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<div className="text-2xl mr-2">{icon}</div>
						<div className="text-lg">{title}</div>
					</div>
					<div className="text-3xl font-bold">{value}</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardTab;
