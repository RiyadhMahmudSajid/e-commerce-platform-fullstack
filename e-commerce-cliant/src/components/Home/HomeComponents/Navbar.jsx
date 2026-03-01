import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { ShoppingCart, Search, Menu, Moon, Sun, User, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import { ThemeContext } from '../../../providers/ThemeProvider';
import useUserRole from '../../../hooks/useUserRole';
import { AuthContex } from '../../../providers/AuthProvider';
import toast from 'react-hot-toast';
import useCategory from '../../../hooks/useCategory';
import useProduct from '../../../hooks/useProduct';
import { CartContext } from '../../../providers/CartProvider';

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Deals", path: "/deals" },
];

export default function Navbar() {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCatOpen, setIsCatOpen] = useState(false);

    const navigate = useNavigate();
    const { products } = useProduct();
    const { cart } = useContext(CartContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { categories } = useCategory();
    const { user, logOut } = useContext(AuthContex);
    const { role, allLoading } = useUserRole();
 

    const handleLogOut = () => {
        toast.success("Logout Successful");
        logOut();
        setIsMenuOpen(false);
    };

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleSearch = (query) => {
        if (query.trim()) {
            navigate(`/search?query=${query}`);
            setSearch("");
            setSuggestions([]);
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-[100] bg-surface/80 backdrop-blur-md border-b border-border-color transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20 gap-2">


                    <NavLink to="/" className="flex items-center space-x-2 group shrink-0 ">
                        <div className="bg-accent p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-accent/20">
                            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <span className="text-xl md:text-2xl font-black tracking-tighter text-text-main">
                            Shop<span className="text-accent italic">Hub</span>
                        </span>
                    </NavLink>

                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) => `text-md font-medium transition-colors ${isActive ? "text-accent" : "text-text-muted hover:text-accent"}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}


                        <div className='relative group py-4'>
                            <button className="flex items-center gap-1 text-md font-medium text-text-muted hover:text-accent transition-all">
                                Categories
                                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                            </button>
                            <div className="absolute left-0 top-[80%] w-52 bg-surface border border-border-color rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 p-3">
                                {categories?.map((cat) => (
                                    <NavLink key={cat.category} to={`category/${cat.category}`} className="block px-4 py-2 text-sm text-text-muted hover:bg-accent/10 hover:text-accent rounded-lg transition-colors">
                                        {cat.category}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-3">

                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    if (e.target.value.length > 0) {
                                        setSuggestions(products.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 5));
                                    } else setSuggestions([]);
                                }}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch(search)}
                                className="pl-9 pr-4 py-2 rounded-xl border border-border-color bg-bg-secondary text-sm text-text-main focus:w-64 transition-all w-44"
                            />
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
                            {suggestions.length > 0 && (
                                <ul className="absolute w-full bg-surface border border-border-color rounded-xl mt-2 shadow-2xl z-50 overflow-hidden">
                                    {suggestions.map(p => (
                                        <li key={p._id} onClick={() => handleSearch(p.name)} className="px-4 py-2.5 text-sm text-text-muted cursor-pointer hover:bg-accent hover:text-white transition-colors">
                                            {p.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-bg-secondary text-text-main hover:text-accent transition-colors">
                            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        </button>

                        <div className="relative group py-4">
                            <button className="flex items-center gap-1 p-2.5 rounded-xl bg-bg-secondary text-text-main hover:text-accent transition-all">
                                <User size={18} />
                            </button>
                            <div className="absolute right-0 top-[80%] w-60 bg-surface border border-border-color rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 p-4">
                                {user ? (
                                    <div className="space-y-3">
                                        <div className="pb-2 border-b border-border-color">
                                            <p className="text-xs font-black text-accent uppercase">Signed in as</p>
                                            <p className="text-sm font-bold text-text-main truncate">{user?.displayName || "User"}</p>
                                        </div>
                                        <NavLink to="/dashboard" className="flex items-center gap-2 text-sm font-bold text-text-muted hover:text-accent">
                                            <LayoutDashboard size={16} /> Dashboard
                                        </NavLink>
                                        <button onClick={handleLogOut} className="flex items-center gap-2 text-sm font-bold text-danger w-full pt-2 border-t border-border-color">
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link to="/login" className="block w-full py-2 text-center bg-accent text-white rounded-xl font-bold text-sm">Login to Account</Link>
                                )}
                            </div>
                        </div>

                        <Link to='/cart' className="relative p-2.5 rounded-xl bg-accent text-white shadow-lg shadow-accent/20 group">
                            <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="absolute -top-1.5 -right-1.5 bg-danger text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-surface">{totalCount}</span>
                        </Link>
                    </div>

                    <div className="flex md:hidden items-center space-x-3">
                        <Link to='/cart' className="relative p-2 rounded-lg bg-accent text-white">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-1 -right-1 bg-danger text-[9px] w-4 h-4 flex items-center justify-center rounded-full">{totalCount}</span>
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg bg-bg-secondary text-text-main">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`md:hidden fixed inset-x-0 top-[64px] bg-surface border-b border-border-color h-[calc(100vh-64px)] overflow-y-auto transition-all duration-500 ease-in-out ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
                <div className="p-6 space-y-6">

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-bg-secondary border border-border-color text-text-main"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                if (e.target.value.length > 0) {
                                    setSuggestions(products.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 5));
                                } else setSuggestions([]);
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch(search)}
                        />
                        <Search className="absolute left-3.5 top-3.5 text-text-muted" size={20} />
                        {suggestions.length > 0 && (
                            <ul className="absolute w-full bg-surface border border-border-color rounded-xl mt-2 shadow-2xl z-50 overflow-hidden">
                                {suggestions.map(p => (
                                    <li key={p._id} onClick={() => handleSearch(p.name)} className="px-4 py-2.5 text-sm cursor-pointer hover:bg-accent hover:text-white transition-colors">
                                        {p.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 mb-2">Main Menu</p>
                        {navLinks.map((link) => (
                            <NavLink key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl font-bold text-text-main hover:bg-bg-secondary transition-colors">
                                {link.name}
                            </NavLink>
                        ))}

                        <div>
                            <button onClick={() => setIsCatOpen(!isCatOpen)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-text-main hover:bg-bg-secondary">
                                Categories
                                <ChevronDown size={18} className={`transition-transform duration-300 ${isCatOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isCatOpen && (
                                <div className="pl-6 mt-1 space-y-1">
                                    {categories?.map((cat) => (
                                        <NavLink key={cat.category} to={`category/${cat.category}`} onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm font-bold text-text-muted hover:text-accent transition-colors">
                                            {cat.category}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="pt-6 border-t border-border-color space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-text-main">Appearance</span>
                            <button onClick={toggleTheme} className="flex items-center gap-2 px-4 py-2 bg-bg-secondary rounded-xl text-text-main font-bold text-sm">
                                {theme === 'light' ? <><Moon size={16} /> Dark</> : <><Sun size={16} /> Light</>}
                            </button>
                        </div>

                        {user ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-4 bg-bg-secondary rounded-2xl">
                                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-black">
                                        {user.displayName?.[0] || "U"}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-black text-text-main truncate">{user.displayName}</p>
                                        <p className="text-[10px] text-text-muted uppercase tracking-tight">{role}</p>
                                    </div>
                                </div>
                                <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-text-main hover:bg-bg-secondary">
                                    <LayoutDashboard size={20} /> My Dashboard
                                </NavLink>
                                <button onClick={handleLogOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-danger hover:bg-danger/10">
                                    <LogOut size={20} /> Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link to="/login"  onClick={() => setIsMenuOpen(false)} className="block w-full py-4 text-center bg-accent text-white rounded-2xl font-bold shadow-lg shadow-accent/20">
                                Login to Account
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}