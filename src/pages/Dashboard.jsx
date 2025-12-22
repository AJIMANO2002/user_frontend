import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await API.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch {
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-6 sm:p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold mb-4">
            {user.name ? user.name.charAt(0) : "U"}
          </div>
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center hover:bg-blue-100 transition">
            <span className="font-medium text-blue-700">Age</span>
            <span className="font-semibold text-gray-800">{user.age || "N/A"}</span>
          </div>

          <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center hover:bg-green-100 transition">
            <span className="font-medium text-green-700">DOB</span>
            <span className="font-semibold text-gray-800">
              {user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
            </span>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl flex justify-between items-center hover:bg-yellow-100 transition">
            <span className="font-medium text-yellow-700">Contact</span>
            <span className="font-semibold text-gray-800">{user.contact || "N/A"}</span>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl flex justify-between items-center hover:bg-purple-100 transition">
            <span className="font-medium text-purple-700">Email</span>
            <span className="font-semibold text-gray-800">{user.email}</span>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
