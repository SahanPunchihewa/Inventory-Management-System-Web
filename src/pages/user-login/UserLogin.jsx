import React, { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import Spinner from "../../components/spinner";

const UserLogin = () => {
	return (
		<>
			{<Spinner />}
			<div className="min-h-screenbg-gray-100 mt-16 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
				<div className="sm:mx-auto sm:w-full sm:max-w-md md:overflow-hidden">
					<img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
					<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Sign in to your account</h2>
				</div>
				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form>
							<div>
								<label htmlFor="text" className="block text-sm font-medium leading-5  text-gray-700">
									Username
								</label>
								<div className="mt-1 relative rounded-md shadow-sm">
									<input
										id="username"
										name="username"
										placeholder="please enter your username"
										type="email"
										required
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
									/>
									<div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
										<svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
								</div>
							</div>
							<div className="mt-6">
								<label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
									Password
								</label>
								<div className="mt-1 rounded-md shadow-sm">
									<input
										id="password"
										name="password"
										type="password"
										placeholder="please enter your password"
										required
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
									/>
								</div>
							</div>
							<div className="mt-6">
								<span className="block w-full rounded-md shadow-sm">
									<button
										type="submit"
										className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-sky-blue hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
									>
										Sign in
									</button>
								</span>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserLogin;
