import React, { useState, useContext } from "react";
import { Navigate, NavLink, useNavigate } from "react-router";
import {
  Home, LayoutGrid, PlusCircle, Users, Box, Settings, LogOut, Menu, X, ChevronRight, Folder, UserCircle, ShoppingBag, Heart, Star, MapPin, HeadphonesIcon,
  HomeIcon,
  Superscript
} from "lucide-react";
import { AuthContex } from "../../../providers/AuthProvider";
import useUserRole from "../../../hooks/useUserRole";

const AdminSidebar = () => {
  const { logOut } = useContext(AuthContex);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, allLoading } = useUserRole();
  const navigate = useNavigate();

  if (allLoading) return null;

  const links = [
    { to: "/dashboard/admin/overview", icon: Home, label: "Overview" },
    { to: "/dashboard/manage-products", icon: LayoutGrid, label: "Manage Products" },
    { to: "/dashboard/add-product", icon: PlusCircle, label: "Add Product" },
    { to: "/dashboard/add-categories", icon: Folder, label: "Add Categories" },
    { to: "/dashboard/orders", icon: Box, label: "Orders" },
    { to: "/dashboard/users", icon: Users, label: "Users" },
    { to: "/dashboard/support", icon: HeadphonesIcon, label: "Support" },
  ];

  const userLinks = [
    { to: "/dashboard/user/profile", icon: UserCircle, label: "My Profile" },
    { to: "/dashboard/user/my-orders", icon: ShoppingBag, label: "My Orders" },
    { to: "/dashboard/user/wishlist", icon: Heart, label: "My Wishlist" },
    { to: "/dashboard/user/reviews", icon: Star, label: "My Reviews" },

    { to: "/dashboard/user/support", icon: HeadphonesIcon, label: "Support Center" },
  ];

  const navLink = role === 'admin' ? links : userLinks;

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <>

      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 bg-accent text-white rounded-xl shadow-lg focus:outline-none"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>


      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[40] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-bg-primary border-r border-border-color z-[50] p-6 flex flex-col transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="mb-10 mt-4 lg:mt-0">
          <div className="flex items-center gap-3 px-2 mb-2">
            <div className="w-10 h-10 bg-accent rounded-2xl flex items-center justify-center text-white shadow-lg shadow-accent/20">
              <Box size={22} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] leading-tight">Admin Panel</p>
              <h2 className="text-xl font-black text-text-main tracking-tighter">
                Shop<span className="italic opacity-80">Hub</span>
              </h2>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {navLink.map((link) => (
            <NavLink key={link.to} to={link.to} end onClick={() => setSidebarOpen(false)}>
              {({ isActive }) => (
                <div className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200
                                    ${isActive ? "bg-accent text-white shadow-xl shadow-accent/25 translate-x-1" : "text-text-muted hover:bg-bg-secondary hover:text-text-main"}`}>
                  <div className="flex items-center gap-3">
                    <link.icon size={19} strokeWidth={isActive ? 2.5 : 2} />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight size={14} className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-1" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`} />
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-border-color space-y-4">
          <button
            onClick={() => navigate('/')}
            className="group w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-sm bg-danger/5 text-danger border border-danger/10 hover:bg-danger hover:text-white transition-all shadow-sm"
          >
            <HomeIcon size={19} className="group-hover:-translate-x-1 transition-transform" />
            Home
          </button>

          <button
          onClick={handleLogout}
          className="group w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-sm bg-danger/5 text-danger border border-danger/10 hover:bg-danger hover:text-white transition-all shadow-sm">
            <LogOut size={19} className="group-hover:-translate-x-1 transition-transform" />
            Logout Account
          </button>
          <p className="text-[10px] text-center text-text-muted mt-6 font-bold uppercase tracking-widest opacity-40">v2.4.0 • Enterprise</p>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;