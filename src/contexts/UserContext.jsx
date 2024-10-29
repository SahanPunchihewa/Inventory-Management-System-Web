import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "./api/UserAPI";
import { makeToast } from "../components";
import { useMutation } from "@tanstack/react-query";

const UserContext = createContext();

export function UserProvider({ children }) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const [usersList, setUsersList] = useState([]);
	const [user, setUser] = useState({
		username: "",
		email: "",
		contact: "",
		password: "",
		role: "",
	});

	// user login
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
				localStorage.setItem("uId", response.data.id);
				localStorage.setItem("username", response.data.username);
				localStorage.setItem("permissionLevel", response.data.role);
				localStorage.setItem("authToken", response.data.token);
				makeToast({ type: "success", message: "Login Successful" });
				window.location.href = "/user";
			} else {
				makeToast({ type: "error", message: "Invalid Credentials" });
			}
		},
		onError: (error) => {
			makeToast({ type: "error", message: "Login Failed" });
		},
	});

	// get all users
	useEffect(() => {
		setIsLoading(true);
		UserAPI.getAllUsers().then((response) => {
			setUsersList(response.data);
			setIsLoading(false);
		});
	}, []);

	// get all users count
	useEffect(() => {
		setIsLoading(true);
		UserAPI.getAllUsers().then((response) => {
			setUsers(response.data);
			setIsLoading(false);
		});
	}, []);

	// delete user
	const deleteUser = (id) => {
		setIsLoading(true);
		UserAPI.deleteUser(id)
			.then((response) => {
				setUsersList(usersList.filter((user) => user.id !== id));
				makeToast({ type: "success", message: "User deleted" });
			})
			.catch((error) => {
				makeToast({ type: "error", message: "User not deleted" });
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				loginUser,
				loginUserLoading,
				isLoading,
				setIsLoading,
				users,
				setUsers,
				deleteUser,
				setUsersList,
				usersList,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
