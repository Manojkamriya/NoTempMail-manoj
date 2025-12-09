import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Search, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
     const navigate = useNavigate();
  const links = [
    { to: "/", label: "Home", icon: LayoutDashboard },
    { to: "/single-verify", label: "Single Verify", icon: Search },
    { to: "/dashboard", label: "User Dashboard", icon: Users },
      { to: "/admin-dash", label: "Admin Dashboard", icon: Search },
  ];

  return (
    <div className="w-full bg-white border-b sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
       <h1
          className="text-xl font-bold text-gray-900 cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          NoTempMail
        </h1>


        <div className="flex items-center gap-4 ml-auto">
          {links.map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-3xl text-sm font-medium transition 
                ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
