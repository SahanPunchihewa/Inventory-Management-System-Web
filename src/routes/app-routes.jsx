import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CheckLoginStatus from "./CheckLoginStatus";

import Header from "../components/Header";

import { UserLogin, UserDashboard, ProductCreate } from "../pages";

const AppRoutes = () => {
	return (
		<>
			<Router>
				<Header />

				<Routes>
					{/* Default Routes */}
					<Route path="/" element={<Navigate to="/user/login" />} />
					<Route path="/user/login" element={<UserLogin />} />

					{/* User Private Routes */}
					<Route path="/user/login" element={<CheckLoginStatus />}>
						<Route path="/user/login" element={<UserLogin />} />
					</Route>

					{/* Admin Private Routes */}
					<Route path="/user" element={<PrivateRoute permissionLevel="ADMIN" />}>
						<Route path="/user" element={<UserDashboard />} />
						<Route path="/user/product/create" element={<ProductCreate />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
};

export default AppRoutes;
