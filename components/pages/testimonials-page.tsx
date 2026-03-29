"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content:
      "Akronix transformed our legacy application into a high-performance modern SaaS platform. Their attention to detail and ability to execute rapidly was phenomenal.",
    author: "Sarah Jenkins",
    role: "CTO, TechNova",
    rating: 5,
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: 2,
    content:
      "The landing page they built for us increased our conversion rate by 300% in the first month. The design is absolutely premium and the code is pristine.",
    author: "Marcus Doe",
    role: "Founder, GrowthGen",
    rating: 5,
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    content:
      "Working with Akronix was the best decision we made for our MVP. They guided us through the technical complexities and delivered a week ahead of schedule.",
    author: "Emily Chen",
    role: "CEO, InnovateTech",
    rating: 5,
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    id: 4,
    content:
      "Stunning attention to aesthetics without compromising on performance. Our users constantly praise how fluid and snappy the interface feels.",
    author: "James Wilson",
    role: "Product Lead, Nexus AI",
    rating: 5,
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: 5,
    content:
      "The dedicated team at Akronix went above and beyond to ensure our multi-tenant architecture was robust, secure, and infinitely scalable.",
    author: "Alicia Rodriguez",
    role: "VP Engineering, CloudScale",
    rating: 5,
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    id: 6,
    content:
      "From wireframing to deployment, the entire process was seamless. They truly understand what it takes to build a product that stands out.",
    author: "David Kim",
    role: "Director, Forward Ventures",
    rating: 5,
    gradient: "from-violet-500/20 to-fuchsia-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />

      <div className="container-xl relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-6">
            <Star size={14} className="fill-cyan-400" />
            <span>Client Success Stories</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
            Don&apos;t just take <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              our word for it.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
            We partner with ambitious startups and enterprises to build category-defining digital products. Here&apos;s what they have to say about working with Akronix.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative h-full glass-card rounded-2xl p-8 border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all duration-300">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <Quote size={28} className="text-white/20" />
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    &quot;{testimonial.content}&quot;
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-lg font-bold text-white uppercase">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-cyan-400/80">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 relative rounded-3xl overflow-hidden glass-card border border-white/10 bg-white/5 p-12 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 mix-blend-overlay" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to build something amazing?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Join the growing list of successful companies that trust Akronix with their most critical digital products.
            </p>
            <a href="/contact" className="inline-block btn-primary px-8 py-3 text-lg">
              Start Your Project
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
