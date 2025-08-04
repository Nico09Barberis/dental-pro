import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
      <p className="text-gray-700">Role: {user?.role}</p>
      <p className="text-gray-700">Email: {user?.email}</p>
    </div>
  );
};

export default Dashboard;
