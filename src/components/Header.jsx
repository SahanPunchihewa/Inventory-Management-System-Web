import React, { useState } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className="bg-primary-sky-blue lg:pb-12 h-20 rounded-sm">
				<div className="mx-auto max-w-screen-xl px-4 md:px-8">
					<header className="flex items-center justify-between py-4 md:py-8">
						<a
							href="/"
							className="inline-flex items-center gap-2.5 text-2xl font-bold text-pop-up-colour md:text-2xl sm:text-md"
							aria-label="logo"
						>
							Inventory Management System
						</a>

						<nav className="hidden lg:flex gap-14">
							<a
								href="#"
								className="text-lg font-semibold text-white transition duration-100 hover:text-secondary-sky-blue"
							>
								Home
							</a>
							<a
								href="#"
								className="text-lg font-semibold text-white transition duration-100 hover:text-secondary-sky-blue"
							>
								Dashboard
							</a>
							<button className="flex items-center gap-2 text-lg font-semibold text-white transition duration-100 hover:text-secondary-sky-blue">
								<ArrowRightOnRectangleIcon className="w-5 h-5" />
								Logout
							</button>
						</nav>

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
									className="text-lg font-semibold text-pop-up-colour transition duration-100 hover:text-secondary-sky-blue"
								>
									Home
								</a>
								<a
									href="#"
									className="text-lg font-semibold text-pop-up-colour transition duration-100 hover:text-secondary-sky-blue"
								>
									Dashboard
								</a>
								<button className="flex items-center gap-2 text-lg font-semibold text-pop-up-colour transition duration-100 hover:text-secondary-sky-blue">
									<ArrowRightOnRectangleIcon className="w-5 h-5" />
									Logout
								</button>
							</nav>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Header;
