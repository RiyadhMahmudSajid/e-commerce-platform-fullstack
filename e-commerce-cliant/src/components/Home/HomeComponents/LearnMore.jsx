import React, { useContext } from 'react';
import Hero from '../../../assets/Hero1.png';
import { Link } from 'react-router';
import {
    CheckCircle2, Rocket, ShieldCheck,
    Users, Zap, ArrowRight
} from 'lucide-react';
import { AuthContex } from '../../../providers/AuthProvider';


const LearnMore = () => {
    
    return (
        <div className="bg-bg-primary text-text-main min-h-screen">

            <section className="py-20 px-6 border-b border-border-color bg-[#0A0A0A]">
                <div className="max-w-5xl mx-auto text-center space-y-6">
                    <span className="text-accent text-xs font-black uppercase tracking-[0.3em] bg-accent/10 px-4 py-2 rounded-full">
                        Our Story
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                        REDEFINING THE <br />
                        <span className="text-accent italic">SHOPPING</span> EXPERIENCE.
                    </h1>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto font-medium">
                        Founded in 2025, ShopHub was built on the idea that quality and design should be accessible to everyone, everywhere.
                    </p>
                </div>
            </section>


            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ValueCard
                        icon={<ShieldCheck size={32} className="text-accent" />}
                        title="Quality First"
                        desc="Every product in our catalog undergoes a rigorous 5-step quality check before it reaches your door."
                    />
                    <ValueCard
                        icon={<Zap size={32} className="text-accent" />}
                        title="Fast Delivery"
                        desc="With our 24/7 logistics partner, we ensure your orders are processed and shipped within hours."
                    />
                    <ValueCard
                        icon={<Users size={32} className="text-accent" />}
                        title="User Centric"
                        desc="Our dashboard and support system are designed keeping your convenience as our top priority."
                    />
                </div>
            </section>

            <section className="py-20 px-6 bg-bg-secondary">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="aspect-square bg-accent/20 rounded-[3rem] overflow-hidden border border-accent/30">

                            <img
                                src={Hero}
                                alt="Team working"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-accent text-black p-8 rounded-3xl hidden md:block">
                            <p className="text-4xl font-black tracking-tighter">10K+</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest">Happy Customers</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-4xl font-black uppercase tracking-tighter leading-tight">
                            Why We Do <br /> What We Do.
                        </h2>
                        <p className="text-text-muted leading-relaxed">
                            We noticed that the market was flooded with overpriced items that didn't live up to the hype. We decided to cut the middleman and bring the best products directly from manufacturers to you.
                        </p>

                        <div className="space-y-4">
                            <Point text="Transparency in pricing and sourcing" />
                            <Point text="Sustainability-focused packaging" />
                            <Point text="Instant refund & return policy" />
                        </div>

                        <Link
                            to="/products"
                            className="inline-flex items-center gap-3 bg-accent text-black font-black px-8 py-4 rounded-2xl uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                        >
                            Start Shopping <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-24 text-center px-6">
                <div className="max-w-3xl mx-auto space-y-8">
                    <Rocket size={48} className="mx-auto text-accent animate-bounce" />
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Still have questions?</h2>
                    <p className="text-text-muted">Our support team is always ready to help you with anything you need.</p>

                    
                </div>
            </section>
        </div>
    );
};


const ValueCard = ({ icon, title, desc }) => (
    <div className="p-10 bg-bg-secondary border border-border-color rounded-[2.5rem] space-y-6 hover:border-accent/50 transition-all group">
        <div className="p-4 bg-bg-primary w-fit rounded-2xl group-hover:bg-accent/10 transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight">{title}</h3>
        <p className="text-text-muted text-sm leading-relaxed font-medium">{desc}</p>
    </div>
);

const Point = ({ text }) => (
    <div className="flex items-center gap-3">
        <CheckCircle2 size={18} className="text-accent" />
        <span className="text-sm font-bold text-text-main uppercase tracking-tight">{text}</span>
    </div>
);

export default LearnMore;