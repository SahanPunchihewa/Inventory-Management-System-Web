import React, { useState } from "react";
import DashboardTab from "./DashboardTab";
import AllProduct from "./AllProducts";
import LowStockProducts from "./LowStockProducts";
import OutOfStockProduct from "./OutOfStockProduct";
import UserManagement from "./UserManagement";
import {
	ArchiveBoxIcon,
	ExclamationTriangleIcon,
	ClipboardDocumentIcon,
	ChartBarIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";

const UserDashboard = () => {
	const [activeTab, setActiveTab] = useState(0);

	const permissionLevel = localStorage.getItem("permissionLevel");

	const tabs = [
		{ name: "Dashboard", icon: <ChartBarIcon className="h-5 w-5 mr-2" />, component: <DashboardTab /> },
		{ name: "All Products", icon: <ArchiveBoxIcon className="h-5 w-5 mr-2" />, component: <AllProduct /> },
		{
			name: "Low Stock Products",
			icon: <ExclamationTriangleIcon className="h-5 w-5 mr-2" />,
			component: <LowStockProducts />,
		},
		{
			name: "Out of Stock Products",
			icon: <ClipboardDocumentIcon className="h-5 w-5 mr-2" />,
			component: <OutOfStockProduct />,
		},
		{
			name: "User Management",
			icon: <UserGroupIcon className="h-5 w-5 mr-2" />,
			component: <UserManagement />,
			disabled: permissionLevel === "EMPLOYEE",
		},
	];

	return (
		<div className="min-h-screen flex flex-col bg-gray-100 p-4">
			{/* Tab headers */}
			<div className="flex justify-around mb-4 bg-white shadow-md rounded-lg p-2 gap-4">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={`text-lg font-semibold flex-1 flex items-center justify-center p-2 transition duration-300 rounded-lg 
							${activeTab === index ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} 
							${tab.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
						onClick={() => !tab.disabled && setActiveTab(index)}
						disabled={tab.disabled}
					>
						{tab.icon}
						{tab.name}
					</button>
				))}
			</div>

			<div className="flex-grow bg-white rounded-lg shadow-md p-6">{tabs[activeTab].component}</div>
		</div>
	);
};

export default UserDashboard;
