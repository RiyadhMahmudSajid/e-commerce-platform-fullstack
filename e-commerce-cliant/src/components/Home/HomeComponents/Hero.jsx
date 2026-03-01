import { ArrowRight, Info, Play, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import heroImage from "../../../assets/Hero1.png";
import { useNavigate } from "react-router";

export default function Hero() {
  const navigate = useNavigate()
  return (
    <motion.section
      initial={{ scale: 1.05, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative min-h-[90vh] flex items-center bg-background overflow-hidden transition-colors duration-500"
    >
  
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] bg-accent opacity-[0.08] rounded-full blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full py-12">
        <div className="grid lg:grid-cols-12 gap-14 items-center">

 
          <div className="lg:col-span-7 space-y-10">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-soft border border-accent/10 rounded-full"
            >
              <Sparkles size={14} className="text-accent" />
              <span className="text-accent font-semibold tracking-widest uppercase text-[10px]">
                Next Gen Technology
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold text-text-main leading-tight tracking-tight"
            >
              Style <br />
              <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                Perfected
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-lg text-lg text-text-muted leading-relaxed"
            >
              Experience the balance of refined aesthetics and powerful performance —
              thoughtfully crafted for modern lifestyles.
            </motion.p>

            <div className="flex flex-wrap items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>navigate('/products')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-text-main text-bg-primary font-semibold transition-all duration-300 hover:bg-accent hover:shadow-lg active:scale-95"
              >
                Start Exploring
                <ArrowRight size={18} />
              </motion.button>

              <motion.button
               onClick={()=>{navigate('/learnmore')}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 text-text-main font-medium hover:text-accent transition"
              >
                <span className="w-11 h-11 flex items-center justify-center rounded-full border border-border-color">
                  <Info size={14} className="ml-0.5" />
                </span>
                Learn More
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="pt-10 flex items-center gap-10 border-t border-border-color/60"
            >
              <div>
                <p className="text-2xl font-semibold text-text-main">99%</p>
                <p className="text-[10px] text-text-muted uppercase tracking-widest">Accuracy</p>
              </div>
              <div className="w-px h-8 bg-border-color" />
              <div>
                <p className="text-2xl font-semibold text-text-main">24/7</p>
                <p className="text-[10px] text-text-muted uppercase tracking-widest">Support</p>
              </div>
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-bg-secondary border-[4px] border-bg-primary shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)]"
            >
              <img
                src={heroImage}
                alt="Product Showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-5 right-5 px-4 py-1.5 bg-black/20 backdrop-blur-md rounded-full">
                <p className="text-white text-[10px] font-semibold tracking-widest uppercase">
                  In Stock
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
