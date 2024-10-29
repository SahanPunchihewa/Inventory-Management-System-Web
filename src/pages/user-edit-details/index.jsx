import React from "react";
import UserEditDetails from "./UserEditDetails";
import { UserProvider } from "../../contexts/UserContext";

const index = () => {
	return (
		<>
			<UserProvider>
				<UserEditDetails />
			</UserProvider>
		</>
	);
};

export default index;
