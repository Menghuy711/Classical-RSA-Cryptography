import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export const SlideTabs = ({ onTabChange }: { onTabChange?: (index: number) => void }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  // State to track the currently selected tab, defaulting to the first tab (index 0)
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  // This effect runs when the component mounts or when the selected tab changes.
  // It calculates the position of the selected tab and sets the cursor.
  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [selected]);

  const handleTabClick = (index: number) => {
    setSelected(index);
    onTabChange?.(index);
  };

  return (
    <ul
      onMouseLeave={() => {
        // When the mouse leaves the container, reset the cursor
        // to the position of the currently selected tab.
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
          const { width } = selectedTab.getBoundingClientRect();
          setPosition({
            left: selectedTab.offsetLeft,
            width,
            opacity: 1,
          });
        }
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-green-500 bg-zinc-900 p-1 dark:border-green-500 dark:bg-zinc-900"
    >
      {["Caesar Cipher", "General Shift", "Affine", "Transposition", "RSA"].map((tab, i) => (
        <Tab
          key={tab}
          ref={(el: HTMLLIElement | null) => {
        if (tabsRef.current) {
          tabsRef.current[i] = el;
        }
      }}
          setPosition={setPosition}
          onClick={() => handleTabClick(i)}
        >
          {tab}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

// The Tab component is wrapped in forwardRef to accept a ref from its parent.
const Tab = React.forwardRef<
  HTMLLIElement,
  {
    children: React.ReactNode;
    setPosition: React.Dispatch<
      React.SetStateAction<{
        left: number;
        width: number;
        opacity: number;
      }>
    >;
    onClick: () => void;
  }
>(({ children, setPosition, onClick }, ref) => {
  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref || typeof ref === "function" || !ref.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base transition-colors hover:text-green-400"
    >
      {children}
    </li>
  );
});

Tab.displayName = "Tab";

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-green-500 dark:bg-green-500 md:h-12"
    />
  );
};
