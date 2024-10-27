import React from "react";
import UserDashboard from "./UserDashboard";
import { UserProvider } from "../../contexts/UserContext";

const index = () => {
	return (
		<>
			<UserProvider>
				<UserDashboard />
			</UserProvider>
		</>
	);
};

export default index;
