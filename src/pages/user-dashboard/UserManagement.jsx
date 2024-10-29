import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import UserContext from "../../contexts/UserContext";
import { Spinner } from "../../components";

const UserManagement = () => {
	const { users, isLoading, deleteUser } = useContext(UserContext);

	return (
		<>
			<div className="p-4">
				{isLoading && <Spinner />}
				<div className="flex justify-center mb-4">
					<h2 className="text-xl font-bold text-white bg-blue-500 px-4 py-2 rounded-md inline-block shadow-md">
						User Management
					</h2>
				</div>

				<div className="mb-4 flex justify-between items-center">
					<div className="flex justify-end">
						<Link to="/user/create">
							<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md">
								<FaPlus />
								Create User
							</button>
						</Link>
					</div>
				</div>

				<div className="overflow-x-auto rounded-lg">
					<table className="min-w-full bg-white border border-gray-300 text-xs sm:text-sm md:text-base">
						<thead>
							<tr className="bg-gray-200">
								<th className="py-2 px-4 border">User Name</th>
								<th className="py-2 px-4 border">Email Address</th>
								<th className="py-2 px-4 border">User Contact</th>
								<th className="py-2 px-4 border">User Role</th>
								<th className="py-2 px-4 border">Edit</th>
								<th className="py-2 px-4 border">Delete</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id} className="hover:bg-gray-100">
									<td className="py-2 px-4 border">{user.username}</td>
									<td className="py-2 px-4 border">{user.email}</td>
									<td className="py-2 px-4 border">{user.contact}</td>
									<td className="py-2 px-4 border">
										{user.role === "ADMIN" ? (
											<span className="bg-red-700 text-white py-1 px-2 rounded-full text-sm font-bold">
												{user.role}
											</span>
										) : (
											<span className="bg-sky-700 text-white py-1 px-2 rounded-full text-sm font-bold">
												{user.role}
											</span>
										)}
									</td>
									<td className="py-2 px-4 border">
										<Link to={`/user/edit/details/${user.id}`}>
											<button
												className="bg-yellow-500 hover:bg-yellow-600
												text-white px-2 py-1 rounded flex items-center gap-1 shadow-md"
											>
												<FaEdit />
											</button>
										</Link>
									</td>
									<td className="py-2 px-4 border">
										<button
											className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1 shadow-md"
											onClick={() => deleteUser(user.id)}
										>
											<FaTrash />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default UserManagement;
