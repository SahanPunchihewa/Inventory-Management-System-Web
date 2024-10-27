import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import PrivateRoute from "./PrivateRoute";
// import CheckLoginStatus from "./CheckLoginStatus";

import Header from "../components/Header";

import { UserLogin, UserDashboard } from "../pages";

const AppRoutes = () => {
	return (
		<>
			<Router>
				<Header />

				<Routes>
					{/* Default Routes */}
					<Route path="/" element={<Navigate to="/user/login" />} />
					<Route path="/user/login" element={<UserLogin />} />
					<Route path="/user" element={<UserDashboard />} />
				</Routes>
			</Router>
		</>
	);
};

export default AppRoutes;
