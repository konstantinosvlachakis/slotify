import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const navItems = [
    { label: "Features", path: "/features" },
    { label: "Solutions", path: "/solutions" },
    { label: "Pricing", path: "/pricing" },
  ];

  // ✅ Fetch current user (if authenticated)
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/accounts/user/", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    // Optional logout cleanup (e.g. clear cookie)
    await axios.post("http://localhost:8000/api/accounts/logout/", {}, { withCredentials: true }).catch(() => {});
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-indigo-50 to-purple-50 text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-4 bg-white/80 backdrop-blur-lg sticky top-0 z-10 shadow-sm border-b border-gray-100">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
          Slotify
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md text-white"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* 👇 Conditionally render “Stats” or “Contact” */}
          {user ? (
            <Link
              to="/insights"
              className="text-gray-700 hover:text-violet-600 transition px-4 py-2 font-medium"
            >
              Stats
            </Link>
          ) : (
            <button className="text-gray-700 hover:text-violet-600 transition px-4 py-2">
              Contact
            </button>
          )}
        </div>

        {/* Right CTA Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          {user ? (
            <>
              <span className="text-sm text-gray-700 font-medium">
                Hi, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-md text-gray-700 hover:text-violet-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-2 rounded-md text-gray-700 hover:text-violet-600 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-md shadow-md hover:opacity-90 hover:shadow-lg transition-all duration-200"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Child Routes Render Here */}
      <Outlet />
    </div>
  );
}
