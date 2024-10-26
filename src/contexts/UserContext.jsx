import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "./api/UserAPI";
import { makeToast } from "../components";

export const UserContext = createContext();

export function UserProvider({ children }) {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({
		username: "",
		password: "",
		role: "",
	});

	return (
		<UserContext.Provider
			value={{
				users,
				setUsers,
				user,
				setUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export default UserProvider;
