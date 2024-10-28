import { useEffect, useState, useContext } from "react";
import { FaBox, FaExclamationTriangle, FaClipboardList, FaChartPie } from "react-icons/fa";
import { Spinner } from "../../components";
import ProductContext from "../../contexts/ProductContext";

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

const DashboardTab = () => {
	const { inventorySummary, isLoading } = useContext(ProductContext);
	const { lowStockProduct, outOfStockProduct, totalProducts } = inventorySummary;

	return (
		<div className="bg-gray-100 min-h-screen rounded-lg p-4 md:p-6">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-2">
				{isLoading && <Spinner />}
				<Card title="Total Products" value={totalProducts} icon={<FaBox />} color="bg-green-500" />
				<Card
					title="Low Stock Products"
					value={lowStockProduct}
					icon={<FaExclamationTriangle />}
					color="bg-yellow-500"
				/>
				<Card title="Out of Stock Products" value={outOfStockProduct} icon={<FaClipboardList />} color="bg-red-500" />
				<Card title="Total Employees" value="" icon={<FaChartPie />} color="bg-blue-500" />
			</div>
		</div>
	);
};

export default DashboardTab;
