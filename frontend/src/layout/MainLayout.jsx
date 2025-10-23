import { Link, Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Features", path: "/features" },
    { label: "Solutions", path: "/solutions" },
    { label: "Pricing", path: "/pricing" },
  ];

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

          <button className="text-gray-700 hover:text-violet-600 transition px-4 py-2">
            Contact
          </button>
        </div>

        {/* Right CTA Buttons */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/login"
            className="text-sm px-4 py-2 rounded-md text-gray-700 hover:text-violet-600 transition"
          >
            Sign In
          </Link>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-md shadow-md hover:opacity-90 hover:shadow-lg transition-all duration-200">
            Get Started
          </button>
        </div>
      </nav>

      {/* Child Routes Render Here */}
      <Outlet />
    </div>
  );
}
