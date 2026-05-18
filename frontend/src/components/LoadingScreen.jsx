import { motion } from "framer-motion";
import { Moon } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="relative h-screen w-full bg-mirage-obsidian flex flex-col items-center justify-center overflow-hidden font-sans mirage-grain">
      {/* Background Depth */}
      <div className="absolute inset-0 mirage-gradient opacity-40" />
      
      {/* Centered Logo & Animation */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="mb-8"
        >
          <Moon className="text-mirage-gold" size={48} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-serif italic text-white tracking-[0.4em] mb-4 uppercase">
            Flicksy
          </h2>
          <div className="flex items-center gap-4 opacity-40">
            <div className="h-[1px] w-8 bg-mirage-gold" />
            <p className="text-[8px] tracking-[0.6em] uppercase text-mirage-gold font-light">
              Refining_Archives
            </p>
            <div className="h-[1px] w-8 bg-mirage-gold" />
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mt-16 w-48 bg-white/5 h-[1px] relative overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-mirage-gold h-full"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ width: "40%" }}
          />
        </div>
      </div>

      {/* Decorative Signature */}
      <div className="absolute bottom-12 left-0 w-full text-center opacity-10">
        <p className="text-[10px] tracking-[0.8em] uppercase text-mirage-silver font-light">
          Midnight_Mirage_Estate
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
