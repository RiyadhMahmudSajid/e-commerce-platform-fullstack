import { Shield, Truck, CreditCard, HeadphonesIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function TrustSignals() {
    const signals = [
        {
            icon: Shield,
            title: 'Secure Payment',
            description: '100% secure payment with SSL encryption',
        },
        {
            icon: Truck,
            title: 'Fast Delivery',
            description: 'Same day delivery for orders before 2 PM',
        },
        {
            icon: CreditCard,
            title: 'Easy Returns',
            description: '30-day return policy on all products',
        },
        {
            icon: HeadphonesIcon,
            title: '24/7 Support',
            description: 'Dedicated customer support team',
        },
    ];

    return (
        <div className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {signals.map((signal, index) => {
                        const Icon = signal.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index, duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center text-center space-y-4 cursor-pointer"
                            >
                                <div className="w-20 h-20 bg-surface dark:bg-bg-secondary rounded-full flex items-center justify-center transition-transform duration-300">
                                    <Icon className="w-10 h-10 text-accent dark:text-accent-hover" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {signal.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {signal.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
