import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";
import gallery13 from "@/assets/gallery-13.png";
import gallery14 from "@/assets/gallery-14.png";
import gallery15 from "@/assets/gallery-15.png";
import gallery16 from "@/assets/gallery-16.png";
import gallery17 from "@/assets/gallery-17.png";
import gallery18 from "@/assets/gallery-18.png";
import gallery19 from "@/assets/gallery-19.png";
import gallery20 from "@/assets/gallery-20.png";

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9, gallery10, gallery11, gallery12, gallery13, gallery14, gallery15, gallery16, gallery17, gallery18, gallery19, gallery20];
const captions = [
  "Our golden moment",
  "Hand in hand, always",
  "Love in bloom",
  "Walking into forever",
  "Cozy nights together",
  "Dancing under the lights",
  "Our love, locked forever",
  "Stargazing with you",
  "Cheers to us",
  "A heart full of love",
  "Together in the rain",
  "Our sunrise, our forever",
];

const PhotoCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), []);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), []);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  const getIndex = (offset: number) => (current + offset + images.length) % images.length;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-12 text-center"
      >
        Our Memories Together
      </motion.h2>

      <div
        className="relative flex items-center justify-center w-full max-w-4xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-0 md:left-4 z-20 p-2 rounded-full bg-secondary/60 backdrop-blur-sm border border-border hover:bg-primary/20 transition-all group"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
        </button>

        {/* Images */}
        <div className="flex items-center justify-center gap-2 md:gap-4 overflow-hidden py-4">
          {[-1, 0, 1].map((offset) => {
            const idx = getIndex(offset);
            const isCenter = offset === 0;
            return (
              <motion.div
                key={`${idx}-${offset}`}
                layout
                initial={false}
                animate={{
                  scale: isCenter ? 1 : 0.75,
                  opacity: isCenter ? 1 : 0.4,
                  filter: isCenter ? "blur(0px)" : "blur(3px)",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`relative flex-shrink-0 rounded-xl overflow-hidden ${
                  isCenter
                    ? "w-56 h-72 md:w-72 md:h-96 glow-border"
                    : "w-36 h-48 md:w-48 md:h-64 hidden sm:block"
                }`}
              >
                <img
                  src={images[idx]}
                  alt={captions[idx]}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-4"
                  >
                    <p className="text-sm font-serif text-foreground/90 text-center italic">
                      {captions[idx]}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-0 md:right-4 z-20 p-2 rounded-full bg-secondary/60 backdrop-blur-sm border border-border hover:bg-primary/20 transition-all group"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-8">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default PhotoCarousel;
