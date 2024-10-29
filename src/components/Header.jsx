import React, { useState, useEffect, useRef } from "react";
import { ArrowRightOnRectangleIcon, ChartBarIcon, BuildingOfficeIcon, UserIcon } from "@heroicons/react/24/outline";
import makeToast from "./toast";
import { Link } from "react-router-dom";

const Header = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

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
		<div className="bg-primary-color lg:pb-12 h-20 rounded-sm">
			<div className="mx-auto max-w-screen-xl px-4 md:px-2">
				<header className="flex items-center justify-between py-4 md:py-6">
					<a
						href="/"
						className="inline-flex gap-2 text-2xl font-bold text-pop-up-colour md:text-xl sm:text-md"
						aria-label="logo"
					>
						<BuildingOfficeIcon className="w-8 h-8" />
						ShopEasy
					</a>

					<div className="flex items-center gap-6">
						{permissionLevel && (
							<div className="relative" ref={dropdownRef}>
								<button
									onClick={toggleDropdown}
									className="flex items-center gap-2 text-lg font-semibold text-white transition duration-100 hover:text-secondary-sky-blue"
								>
									<UserIcon className="w-5 h-5" />
									{localStorage.getItem("username")}
								</button>

								{isDropdownOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
										<Link
											to="/user"
											className="block px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
										>
											<ChartBarIcon className="w-5 h-5" />
											Dashboard
										</Link>
										<button
											onClick={logout}
											className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
										>
											<ArrowRightOnRectangleIcon className="w-5 h-5" />
											Logout
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</header>
			</div>
		</div>
	);
};

export default Header;
