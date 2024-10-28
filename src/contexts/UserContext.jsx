import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "./api/UserAPI";
import { makeToast } from "../components";
import { useMutation } from "@tanstack/react-query";

const UserContext = createContext();

export function UserProvider({ children }) {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		username: "",
		password: "",
		role: "",
	});

	const { mutate: loginUser, isLoading: loginUserLoading } = useMutation({
		mutationFn: () => UserAPI.login(user),
		onSuccess: (response) => {
			if (response.data.role === "ADMIN") {
				localStorage.setItem("uId", response.data.id);
				localStorage.setItem("username", response.data.username);
				localStorage.setItem("permissionLevel", response.data.role);
				localStorage.setItem("authToken", response.data.token);
				makeToast({ type: "success", message: "Login Successful" });
				window.location.href = "/user";
			} else if (response.data.role === "EMPLOYEE") {
				localStorage.setItem("uId", response.data.username);
				localStorage.setItem("role", response.data.role);
				localStorage.setItem("authToken", response.data.token);
				makeToast({ type: "success", message: "Login Successful" });
			} else {
				makeToast({ type: "error", message: "Invalid Credentials" });
			}
		},
		onError: (error) => {
			makeToast({ type: "error", message: "Login Failed" });
		},
	});

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				loginUser,
				loginUserLoading,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
