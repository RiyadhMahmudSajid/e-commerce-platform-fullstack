import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import Loading from '../../loading/Loading';
import useCategory from '../../../hooks/useCategory';
import { useNavigate } from 'react-router';

const Categories = () => {
  const { isLoading, categories } = useCategory();
  const navigate = useNavigate()
  if (isLoading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-surface transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-[10px] font-semibold text-accent uppercase tracking-[0.3em] mb-3"
          >
            Curated Collections
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold text-text-main tracking-tighter mb-4"
          >
            Shop by Category
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-text-muted text-lg max-w-2xl mx-auto font-medium"
          >
            Explore our wide range of products across different categories, designed for your lifestyle.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories?.map((category, index) => (
            <motion.div
              onClick={() => navigate(`category/${category.category}`)}
              key={category._id || category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              viewport={{ once: true }}
              className="group cursor-pointer transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-bg-secondary border border-border-color transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-accent/20 group-hover:-translate-y-2"
              >
                <img
                  src={category.photo}
                  alt={category.category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                  <div className="bg-white text-accent p-2 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                    <ChevronRight size={20} strokeWidth={3} />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="mt-5 text-center px-2"
              >
                <h3 className="text-sm font-black text-text-main uppercase tracking-wider group-hover:text-accent transition-colors duration-300">
                  {category.category}
                </h3>
                <p className="text-[10px] text-text-muted font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  BROWSE ITEMS
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Categories;
