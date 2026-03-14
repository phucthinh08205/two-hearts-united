import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const LoveMessage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="glass-card max-w-2xl w-full p-8 md:p-12 text-center animate-pulse-glow"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <Heart className="w-10 h-10 text-primary fill-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gradient mb-6 leading-tight"
        >
          Our 2 Year Journey ❤️
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="space-y-4"
        >
          <p className="text-foreground/80 text-lg md:text-xl leading-relaxed font-light">
            Two years ago, my world changed forever when you walked into my life.
            Every moment with you has been a beautiful chapter in our story — 
            filled with laughter, love, and countless memories I'll cherish forever.
          </p>
          <p className="text-foreground/60 text-base md:text-lg leading-relaxed font-light italic font-serif">
            "You are my today and all of my tomorrows. Here's to us, 
            and to every adventure that still awaits."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-2 text-muted-foreground text-sm"
        >
          <span className="h-px w-8 bg-primary/30" />
          <span>Forever Yours</span>
          <span className="h-px w-8 bg-primary/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LoveMessage;
