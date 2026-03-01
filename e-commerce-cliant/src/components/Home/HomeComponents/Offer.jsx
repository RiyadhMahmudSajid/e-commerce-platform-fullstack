import { Tag, Truck, Clock, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

export default function Offers() {
  const navigate = useNavigate()
  const offers = [
    {
      icon: Tag,
      title: 'Daily Deals',
      description: 'New deals every day with up to 70% off',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Clock,
      title: 'Flash Sales',
      description: 'Limited time offers with huge discounts',
      bgColor: 'bg-red-100 dark:bg-red-900',
      iconColor: 'text-red-600 dark:text-red-400',
    },
    {
      icon: Gift,
      title: 'Special Bundles',
      description: 'Save more when you buy product bundles',
      bgColor: 'bg-green-100 dark:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400',
    },
  ];

  return (
    <div className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Special Offers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Don't miss out on our exclusive deals and promotions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-emerald-500 dark:hover:border-emerald-400"
              >
                <div className={`w-16 h-16 ${offer.bgColor} rounded-lg flex items-center justify-center mb-4 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${offer.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {offer.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 p-8 text-white"
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-2">Some Product</h3>
              <p className="text-pink-100 mb-4">Up to 10% off on trendy styles</p>
              <motion.button
                onClick={() => navigate('/deals')}
                whileHover={{ scale: 1.05 }}
                className="bg-white text-rose-600 px-6 py-2 rounded-lg font-semibold  hover:bg-pink-50 transition-colors duration-300"
              >
                Shop Now
              </motion.button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-8 text-white"
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-2">All Product</h3>
              <p className="text-cyan-100 mb-4">Latest gadgets at best prices</p>
              <motion.button
                onClick={() => navigate('/products')}
                whileHover={{ scale: 1.05 }}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-cyan-50 transition-colors duration-300"
              >
                Shop Now
              </motion.button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
