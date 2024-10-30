import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Spinner } from "../../components";

const UserLogin = () => {
	const { loginUser, isLoading } = useContext(UserContext);

	const handleSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			username: e.target.username.value,
			password: e.target.password.value,
		};

		loginUser(newUser);
	};

	return (
		<>
			<div className="py-16 mt-10">
				{isLoading && <Spinner />}
				<div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
					<div className="hidden lg:block lg:w-1/2 bg-cover">
						<img src="/loginImg.png" />
					</div>
					<div className="w-full p-8 lg:w-1/2">
						<h2 className="text-2xl font-semibold text-gray-700 text-center mb-2">ShopEasy</h2>
						<p className="text-xl text-gray-600 text-center">Inventory Management System</p>
						<p className="text-xl text-gray-600 text-center">Welcome back!</p>

						<form onSubmit={handleSubmit}>
							<div className="mt-4">
								<label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
								<input
									id="username"
									name="username"
									type="text"
									className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
									placeholder="Enter your username"
									required
								/>
							</div>
							<div className="mt-4">
								<div className="flex justify-between">
									<label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
								</div>
								<input
									id="password"
									name="password"
									type="password"
									className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
									placeholder="Enter your password"
									required
								/>
							</div>

							<div className="mt-8">
								<button
									type="submit"
									className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
									disabled={isLoading}
								>
									{isLoading ? "Loading..." : "Login"}
								</button>
							</div>
						</form>

						<div className="mt-20 flex items-center justify-between">
							<span className="border-b w-1/5 md:w-1/4" />
							<span className="border-b w-1/5 md:w-1/4" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserLogin;
