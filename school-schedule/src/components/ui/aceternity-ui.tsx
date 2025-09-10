import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
    </div>
  );
};

export const BackgroundGrid = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]",
        className
      )}
    />
  );
};

export const BorderBeam = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className={cn(
        "absolute inset-0 rounded-lg border border-white/20",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/20 bg-black p-8",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          {revealText}
        </motion.div>
      </div>
      {children}
    </div>
  );
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50",
        "bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3",
        className
      )}
    >
      <div className="flex items-center space-x-6">
        {navItems.map((item, idx) => (
          <motion.a
            key={idx}
            href={item.link}
            className={cn(
              "transition-colors duration-200 flex items-center space-x-2 px-3 py-1 rounded-full",
              item.name === "Get Started" 
                ? "bg-white text-black hover:bg-white/90 font-semibold" 
                : "text-white/80 hover:text-white hover:bg-white/10"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
};

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div className={cn("relative h-[40rem] max-w-5xl mx-auto", containerClassName)}>
      <BackgroundGrid />
      <BackgroundBeams />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 2, ease: "linear", delay: 0.5 }}
      className={cn(
        "relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 bg-[length:0%_100%] bg-no-repeat bg-[0_100%]",
        className
      )}
    >
      {children}
    </motion.span>
  );
};
