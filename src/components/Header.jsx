import React, { useState } from "react";
import { ArrowRightOnRectangleIcon, HomeIcon, ChartBarIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import makeToast from "./toast";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const permissionLevel = localStorage.getItem("permissionLevel");

	const logout = () => {
		localStorage.removeItem("uId");
		localStorage.removeItem("username");
		localStorage.removeItem("authToken");
		localStorage.removeItem("permissionLevel");

		if (permissionLevel === "ADMIN" || permissionLevel === "EMPLOYEE") {
			window.location.href = "/user/login";
			makeToast({ type: "success", message: "Logout Successful" });
		} else {
			window.location.href = "/user/login";
			makeToast({ type: "error", message: "Logout Failed" });
		}
	};

	return (
		<>
			<div className="bg-primary-color lg:pb-12 h-20 rounded-sm">
				<div className="mx-auto max-w-screen-xl px-4 md:px-2">
					<header className="flex items-center justify-between py-4 md:py-6">
						<a
							href="/"
							className="inline-flex gap-2 text-2xl font-bold text-pop-up-colour md:text-xl sm:text-md"
							aria-label="logo"
						>
							<BuildingOfficeIcon className="w-8 h-8" />
							Inventory Management System
						</a>
						{permissionLevel && (
							<button
								onClick={logout}
								className="hidden lg:flex items-center gap-2 text-lg font-semibold text-white transition duration-100 hover:text-secondary-sky-blue"
							>
								<ArrowRightOnRectangleIcon className="w-5 h-5" />
								Logout
							</button>
						)}

						<button
							className="lg:hidden text-white hover:text-secondary-sky-blue"
							onClick={toggleMenu}
							aria-label="Menu"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
							</svg>
						</button>
					</header>

					{isOpen && (
						<div className="lg:hidden">
							<nav className="flex flex-col gap-6 px-6 py-4 bg-primary-sky-blue">
								<a
									href="#"
									className="flex items-center gap-2 text-lg font-semibold text-pop-up-colour transition duration-100 hover:text-secondary-sky-blue"
								>
									<HomeIcon className="w-5 h-5" />
									Home
								</a>
								<a
									href="#"
									className="flex items-center gap-2 text-lg font-semibold text-pop-up-colour transition duration-100 hover:text-secondary-sky-blue"
								>
									<ChartBarIcon className="w-5 h-5" />
									Dashboard
								</a>
								{permissionLevel && (
									<button
										onClick={logout}
										className="flex items-center gap-2 text-lg font-semibold text-pop-up-colour transition duration-100 hover:text-secondary-sky-blue"
									>
										<ArrowRightOnRectangleIcon className="w-5 h-5" />
										Logout
									</button>
								)}
							</nav>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Header;
