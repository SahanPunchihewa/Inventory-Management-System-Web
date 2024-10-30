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
	const [usernameError, setUsernameError] = useState("");
	const [mailError, setMailError] = useState("");
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
			setIsLoading(true);
			if (response.data.role === "ADMIN") {
				localStorage.setItem("uId", response.data.id);
				localStorage.setItem("username", response.data.username);
				localStorage.setItem("permissionLevel", response.data.role);
				localStorage.setItem("authToken", response.data.token);
				setIsLoading(false);
				makeToast({ type: "success", message: "Login Successful" });
				window.location.href = "/user";
			} else if (response.data.role === "EMPLOYEE") {
				localStorage.setItem("uId", response.data.id);
				localStorage.setItem("username", response.data.username);
				localStorage.setItem("permissionLevel", response.data.role);
				localStorage.setItem("authToken", response.data.token);
				makeToast({ type: "success", message: "Login Successful" });
				setIsLoading(false);
				window.location.href = "/user";
			} else {
				makeToast({ type: "error", message: "Invalid Credentials" });
			}
		},
		onError: (error) => {
			makeToast({ type: "error", message: "Login Failed" });
		},
	});

	// get all users and count
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
				setUsers(users.filter((user) => user.id !== id));
				makeToast({ type: "success", message: "User deleted" });
			})
			.catch((error) => {
				makeToast({ type: "error", message: "User not deleted" });
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	// register user
	const userRegister = async (values) => {
		setIsLoading(true);
		UserAPI.register(values)
			.then((response) => {
				setUsers([...users, response.data]);
				makeToast({ type: "success", message: "User registered" });
				setIsLoading(false);
				navigate("/user");
			})
			.catch((error) => {
				if (error.response.data.details == "Username already exists") {
					setUsernameError(error.response.data.details);
					makeToast({ type: "error", message: "Username already exists" });
				}
				if (error.response.data.details == "Email already exists") {
					setMailError(error.response.data.details);
					makeToast({ type: "error", message: "Email already exists" });
				}
			});
	};

	// get one User
	const getOneUser = (id) => {
		useEffect(() => {
			setIsLoading(true);
			UserAPI.getOneUser(id).then((response) => {
				setUser(response.data);
				setIsLoading(false);
			});
		}, []);
	};

	//update user details
	const updateUser = (values) => {
		const newUserUpdate = {
			id: values.id,
			username: values.username,
			email: values.email,
			contact: values.contact,
			role: values.role,
			password: values.password,
		};
		setIsLoading(true);
		UserAPI.updateUser(values.id, newUserUpdate)
			.then((response) => {
				setUsers(users.map((user) => (user.id === values.id ? newUserUpdate : user)));
				setIsLoading(false);
				makeToast({ type: "success", message: "User updated" });
				navigate("/user");
			})
			.catch((error) => {
				setIsLoading(false);
				makeToast({ type: "error", message: "User not updated" });
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
				userRegister,
				usernameError,
				setUsernameError,
				mailError,
				setMailError,
				getOneUser,
				updateUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
