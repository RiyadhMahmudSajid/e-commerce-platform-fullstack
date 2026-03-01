import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ctaimg from '/cta.avif'
import { useNavigate } from 'react-router';

export default function Mibbanner() {
  const navigate = useNavigate()
  return (
    
    <section className="py-12 bg-background transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        
        <div className="relative overflow-hidden rounded-3xl bg-bg-secondary border border-border-color shadow-sm flex flex-col lg:flex-row items-stretch">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 p-8 lg:p-14 flex flex-col justify-center space-y-6 relative z-10"
          >
            <div className="space-y-4">
             
              <div className="flex items-center gap-2 text-accent">
                <Sparkles size={16} fill="currentColor" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Limited Access</span>
              </div>

             
              <h2 className="text-4xl lg:text-6xl font-black text-text-main tracking-tighter leading-tight">
                Summer Sale <span className="text-accent italic">Live.</span>
              </h2>

              <p className="max-w-md text-sm lg:text-base text-text-muted font-medium leading-relaxed">
                Experience premium performance with our seasonal collection. Up to 50% off for a limited time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8">
             
              <motion.button
                onClick={()=>navigate('/deals')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-accent text-white hover:bg-accent-hover rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex items-center gap-3 shadow-lg shadow-accent/20"
              >
                Shop Now <ArrowRight size={18} />
              </motion.button>

              <div className="flex items-center gap-8 border-l border-border-color pl-8">
                <div className="text-center">
                  <p className="text-3xl font-black text-text-main">Up to 10%</p>
                  <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold mt-1">Discount</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-text-main">07</p>
                  <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold mt-1">Days Left</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-2/5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-surface"
          >
            <img
              src={ctaimg}
              alt="Summer Sale"
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
           
            <div className="absolute inset-0 bg-gradient-to-r from-bg-secondary via-transparent to-transparent hidden lg:block" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}