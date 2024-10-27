import React, { useState } from "react";
import DashboardTab from "./DashboardTab";
import AllProduct from "./AllProducts";
import LowStockProducts from "./LowStockProducts";
import OutOfStockProduct from "./OutOfStockProduct";
import InventorySummary from "./InventorySummary";

const UserDashboard = () => {
	const [activeTab, setActiveTab] = useState(0);

	const tabs = [
		{ name: "Dashboard", component: <DashboardTab /> },
		{ name: "All Products", component: <AllProduct /> },
		{ name: "Low Stock Products", component: <LowStockProducts /> },
		{ name: "Out of Stock Products", component: <OutOfStockProduct /> },
		{ name: "Inventory Summary", component: <InventorySummary /> },
	];

	return (
		<div className="min-h-screen flex flex-col bg-gray-100 p-4">
			{/* Tab headers */}
			<div className="flex justify-around mb-4 bg-white shadow-md rounded-lg p-2 gap-4">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={`text-lg font-semibold flex-1 p-2 transition duration-300 rounded-lg 
                            ${activeTab === index ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
						onClick={() => setActiveTab(index)}
					>
						{tab.name}
					</button>
				))}
			</div>

			{/* Tab content */}
			<div className="flex-grow bg-white rounded-lg shadow-md p-6">{tabs[activeTab].component}</div>
		</div>
	);
};

export default UserDashboard;
