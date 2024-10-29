import React from "react";
import UserDashboard from "./UserDashboard";
import { UserProvider } from "../../contexts/UserContext";
import { ProductProvider } from "../../contexts/ProductContext";

const index = () => {
	return (
		<>
			<ProductProvider>
				<UserProvider>
					<UserDashboard />
				</UserProvider>
			</ProductProvider>
		</>
	);
};

export default index;
