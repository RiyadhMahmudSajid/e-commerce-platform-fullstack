import React from 'react';
import { Link } from 'react-router';
import { Home, ArrowLeft, Ghost } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6 transition-colors duration-500">
            <div className="max-w-3xl w-full text-center space-y-8">
                
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative inline-block"
                >
                    <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full"></div>
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="relative z-10 text-accent"
                    >
                        <Ghost size={120} strokeWidth={1.5} />
                    </motion.div>
                </motion.div>

                <div className="space-y-4">
                    <motion.h1 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-8xl md:text-[12rem] font-black text-text-main tracking-tighter leading-none opacity-10"
                    >
                        404
                    </motion.h1>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl md:text-4xl font-black text-text-main uppercase tracking-tight">
                            Lost in <span className="text-accent italic">Space?</span>
                        </h2>
                        <p className="mt-4 text-text-muted font-medium max-w-md mx-auto leading-relaxed">
                            The page you are looking for doesn't exist or has been moved to another coordinate.
                        </p>
                    </motion.div>
                </div>

        
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4 pt-6"
                >
                    <Link 
                        to="/" 
                        className="w-full md:w-auto px-8 py-4 bg-accent text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 active:scale-95"
                    >
                        <Home size={18} /> Back to Home
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()}
                        className="w-full md:w-auto px-8 py-4 bg-bg-secondary text-text-main border border-border-color rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-surface transition-all active:scale-95"
                    >
                        <ArrowLeft size={18} /> Go Back
                    </button>
                </motion.div>

                <div className="pt-20">
                    <div className="flex justify-center items-center gap-3 opacity-20 grayscale">
                        <div className="h-[1px] w-12 bg-text-muted"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">ShopHub Security</span>
                        <div className="h-[1px] w-12 bg-text-muted"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;