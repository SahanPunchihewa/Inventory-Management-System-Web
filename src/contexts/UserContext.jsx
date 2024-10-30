import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "./api/UserAPI";
import { makeToast } from "../components";
import Joi from "joi";

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

	// Login Form Validation
	const LoginFormSchema = Joi.object({
		username: Joi.string().min(2).message("Username should be valid"),
		password: Joi.string().min(2).message("Password should be at least 2 characters long"),
	});

	// User registration Form Validation
	const UserFormSchema = Joi.object({
		username: Joi.string().min(2).message("Username should be valid"),
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.message("Email should be valid"),
		contact: Joi.string().max(10).message("Contact should be valid"),
		password: Joi.string().min(2).message("Password should be at least 2 characters long"),
		role: Joi.string().min(2).message("Role should be valid"),
	});

	// user login
	const loginUser = (values) => {
		setIsLoading(true);
		const { error } = LoginFormSchema.validate(values);
		if (error) {
			makeToast({ type: "error", message: error.details[0].message });
			return;
		}
		UserAPI.login(values)
			.then((response) => {
				if (response.data.role === "ADMIN") {
					localStorage.setItem("uId", response.data.id);
					localStorage.setItem("username", response.data.username);
					localStorage.setItem("permissionLevel", response.data.role);
					localStorage.setItem("authToken", response.data.token);
					setIsLoading(true);
					setIsLoading(false);
					makeToast({ type: "success", message: "Login Successful" });
					window.location.href = "/user";
				} else if (response.data.role === "EMPLOYEE") {
					localStorage.setItem("uId", response.data.id);
					localStorage.setItem("username", response.data.username);
					localStorage.setItem("permissionLevel", response.data.role);
					localStorage.setItem("authToken", response.data.token);
					setIsLoading(true);
					setIsLoading(false);
					makeToast({ type: "success", message: "Login Successful" });
					window.location.href = "/user";
				} else {
					makeToast({ type: "error", message: "Invalid Credentials" });
					setIsLoading(false);
				}
			})
			.catch((error) => {
				setIsLoading(false);
				makeToast({ type: "error", message: "Login Failed" });
			});
	};

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
		const { error } = UserFormSchema.validate(values);
		if (error) {
			makeToast({ type: "error", message: error.details[0].message });
			return;
		}
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
					setIsLoading(false);
				}
				if (error.response.data.details == "Email already exists") {
					setMailError(error.response.data.details);
					makeToast({ type: "error", message: "Email already exists" });
					setIsLoading(false);
				} else {
					makeToast({ type: "error", message: "User not registered" });
					setIsLoading(false);
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
				// loginUserLoading,
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
				LoginFormSchema,
				UserFormSchema,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
