import React from 'react';
import { Link } from 'react-router'; 
import { 
    Facebook, Twitter, Instagram, Linkedin, 
    CreditCard, Wallet, ShieldCheck, ExternalLink,
    ChevronRight
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0A0A0A] text-white pt-24 pb-12 border-t border-white/5 font-sans">
            <div className="max-w-7xl mx-auto px-6">
                
              
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 pb-16">
               
                    <div className="md:col-span-5 space-y-8">
                        <Link to="/" className="text-3xl font-black tracking-tighter uppercase italic group inline-block">
                            Shop<span className="text-accent group-hover:text-white transition-colors">Hub</span>
                        </Link>
                        <p className="text-gray-400 text-base leading-relaxed max-w-sm font-medium">
                            Redefining the digital shopping experience with premium quality and unparalleled trust. Your satisfaction is our mission.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialIcon icon={<Facebook size={20} />} to="https://facebook.com" />
                            <SocialIcon icon={<Instagram size={20} />} to="https://instagram.com" />
                            <SocialIcon icon={<Twitter size={20} />} to="https://twitter.com" />
                            <SocialIcon icon={<Linkedin size={20} />} to="https://linkedin.com" />
                        </div>
                    </div>

       
                    <div className="md:col-span-3">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-accent/90">Navigation</h3>
                        <ul className="space-y-5">
                            <FooterLink to="/" label="Home" />
                            <FooterLink to="/products" label="Browse Shop" />
                            <FooterLink to="/deals" label="Exclusive Deals" />
                            <FooterLink to="/dashboard/user/profile" label="My Account" />
                        </ul>
                    </div>

             
                    <div className="md:col-span-4">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-accent/90">Security & Verified</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-accent/30 transition-all">
                                <ShieldCheck size={22} className="text-green-500 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-tight">Verified Secure</h4>
                                    <p className="text-[11px] text-gray-500 font-medium">100% encrypted checkout process.</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6 px-2 opacity-70">
                                <div className="flex flex-col items-center gap-1">
                                    <Wallet size={20} className="text-gray-400" />
                                    <span className="text-[9px] font-black uppercase tracking-tighter">Mastercard</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <CreditCard size={20} className="text-gray-400" />
                                    <span className="text-[9px] font-black uppercase tracking-tighter">Visa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

         
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                            © {currentYear} SHOPHUB INC.
                        </p>
                        <span className="hidden md:block w-1 h-1 bg-gray-800 rounded-full"></span>
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                            Established 2026
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest group cursor-default">
                        <span>Built with Passion</span>
                        <ExternalLink size={10} className="group-hover:text-accent transition-colors" />
                    </div>
                </div>
            </div>
        </footer>
    );
};



const FooterLink = ({ to, label }) => (
    <li>
        <Link 
            to={to} 
            className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm font-bold transition-all duration-300"
        >
            <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-accent" />
            {label}
        </Link>
    </li>
);

const SocialIcon = ({ icon, to }) => (
    <a 
        href={to} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center hover:bg-accent hover:text-black transition-all duration-500 border border-white/5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10"
    >
        {icon}
    </a>
);

export default Footer;