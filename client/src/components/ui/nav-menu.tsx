import React, { useState } from 'react';

type NavMenuProps = {
  items?: string[];
  onItemClick?: (item: string) => void;
};

export default function NavMenu({ 
  items = ['Home', 'Topics', 'Member', 'Converter', 'About'],
  onItemClick 
}: NavMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (item: string) => {
    setIsMenuOpen(false);
    onItemClick?.(item);
  };

  return (
    <>
      {/* Mobile menu toggle button - only visible on small screens */}
      <button 
        onClick={toggleMenu}
        className="md:hidden relative z-20 p-2"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
      </button>
      
      {/* Menu container - adapts to screen size */}
      <div className={`
        absolute md:relative top-full md:top-auto left-0 right-0 md:left-auto md:right-auto
        md:flex md:items-center md:gap-6
        ${isMenuOpen ? 'block' : 'hidden md:block'}
      `}>
        <ul className={`
          flex flex-col items-center space-y-6
          md:flex-row md:space-y-0 md:space-x-4 md:justify-end
          lg:space-x-8
        `}>
          {items.map((item) => (
            <li key={item} className="list-none">
              <button 
                onClick={() => handleItemClick(item)}
                className="relative inline-block group font-mono text-sm"
              >
                {/* Link text */}
                <span className="
                  relative z-10 block uppercase text-white
                  font-semibold transition-colors duration-300 
                  group-hover:text-green-400
                  py-2 px-3
                  md:text-xs md:py-1 md:px-2
                  lg:text-sm lg:py-2 lg:px-3
                ">
                  {item}
                </span>
                {/* Bottom border animation */}
                <span className="
                  absolute bottom-0 left-0 w-0 h-0.5 bg-green-400
                  transition-all duration-300
                  group-hover:w-full
                " />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
