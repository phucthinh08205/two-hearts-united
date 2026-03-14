import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Heart, Volume2 } from "lucide-react";

const VoiceMessage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * duration;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card max-w-lg w-full p-8 md:p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
            <Volume2 className="w-7 h-7 text-primary" />
          </div>
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gradient mb-2">
          A Message From My Heart
        </h2>
        <p className="text-muted-foreground text-sm mb-8">Press play to hear how much you mean to me</p>

        {/* Audio element - user can replace src with their recording */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => { setIsPlaying(false); setProgress(0); }}
          preload="metadata"
        >
          {/* Replace this src with your actual voice message URL */}
        </audio>

        {/* Custom player */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-accent transition-colors flex-shrink-0 group"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-primary-foreground" />
              ) : (
                <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
              )}
            </button>

            <div className="flex-1 space-y-1">
              <div
                className="h-2 bg-muted rounded-full cursor-pointer overflow-hidden"
                onClick={handleSeek}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime((progress / 100) * duration || 0)}</span>
                <span>{duration ? formatTime(duration) : "0:00"}</span>
              </div>
            </div>
          </div>

          {/* Waveform decoration */}
          <div className="flex items-end justify-center gap-[3px] h-8 opacity-60">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-primary/40 rounded-full"
                animate={{
                  height: isPlaying
                    ? [4, Math.random() * 28 + 4, 4]
                    : 4 + Math.sin(i * 0.5) * 8,
                }}
                transition={{
                  duration: isPlaying ? 0.4 + Math.random() * 0.3 : 0,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1 text-muted-foreground text-xs">
          <Heart className="w-3 h-3 text-primary fill-primary" />
          <span>Add your voice recording to make it personal</span>
        </div>
      </motion.div>
    </section>
  );
};

export default VoiceMessage;
