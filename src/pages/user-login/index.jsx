import React from "react";
import UserLogin from "./UserLogin";
import { UserProvider } from "../../contexts/UserContext";

const index = () => {
	return (
		<>
			<UserProvider>
				<UserLogin />
			</UserProvider>
		</>
	);
};

export default index;
