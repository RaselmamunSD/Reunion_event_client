import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ProfileBuilder from '../ProfileBuilder';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md relative z-50">
      {/* Top announcement bar */}
      <div className="bg-islamic-green text-white py-2 text-center">
        <p className="bengali-text">৩০ বছর পূর্তি পূনর্মিলন অনুষ্ঠান - ১২ জুন, ২০২৫</p>
      </div>
      
      {/* Main header */}
      <div className="container-custom py-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-16 w-16 flex-shrink-0">
            <img 
              src="/lovable-uploads/6f580a0d-038a-4f6a-be1a-b7859d9d1a4c.png" 
              alt="মাদ্রাসা লোগো" 
              className="h-full w-full object-contain"
            />
          </div>
          <div className="ml-3 text-center md:text-left">
            <h1 className="bengali-text text-lg md:text-xl font-bold text-islamic-dark leading-tight">
              হাড়ীভাঙ্গা তালিমুল ইনসান হাফেজিয়া ক্বওমী মাদ্রাসা
            </h1>
            <p className="bengali-text text-sm text-islamic-green">ও লিল্লাহ্ বোর্ডিং</p>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-islamic-dark p-2">
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="bengali-text font-medium">
              <NavigationMenuItem>
                <Link to="/" className="text-islamic-dark hover:text-islamic-green transition-colors px-4 py-2">
                  হোম
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-islamic-dark hover:text-islamic-green transition-colors bengali-text">
                  অনুষ্ঠান
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 p-4 w-48">
                    <NavigationMenuLink asChild>
                      <Link
                        to="/event"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none bengali-text">অনুষ্ঠান বিবরণ</div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/notice"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none bengali-text">নোটিশ</div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/guests"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none bengali-text">অতিথি</div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/financial-report"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none bengali-text">আর্থিক প্রতিবেদন</div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/registration" className="text-islamic-dark hover:text-islamic-green transition-colors px-4 py-2">
                  রেজিস্ট্রেশন
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <div className="px-4 py-2">
                  <ProfileBuilder />
                </div>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/committee" className="text-islamic-dark hover:text-islamic-green transition-colors px-4 py-2">
                  কমিটি
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/students" className="text-islamic-dark hover:text-islamic-green transition-colors px-4 py-2">
                  ছাত্র
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/profile-frames" className="text-islamic-dark hover:text-islamic-green transition-colors px-4 py-2">
                  প্রোফাইল ফ্রেম
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/contact" className="text-islamic-dark hover:text-islamic-green transition-colors px-4 py-2">
                  যোগাযোগ
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute w-full bg-white shadow-md z-50">
          <ul className="bengali-text font-medium">
            <li><Link to="/" className="block py-3 px-4 border-b hover:bg-islamic-light" onClick={toggleMenu}>হোম</Link></li>
            <li><Link to="/event" className="block py-3 px-4 border-b hover:bg-islamic-light" onClick={toggleMenu}>অনুষ্ঠান বিবরণ</Link></li>
            <li><Link to="/notice" className="block py-3 px-4 border-b hover:bg-islamic-light" onClick={toggleMenu}>নোটিশ</Link></li>
            <li><Link to="/guests" className="block py-3 px-4 border-b hover:bg-islamic-light" onClick={toggleMenu}>অতিথি</Link></li>
            <li><Link to="/registration" className="block py-3 px-4 border-b hover:bg-islamic-light" onClick={toggleMenu}>রেজিস্ট্রেশন</Link></li>
            <li>
              <div className="py-3 px-4 border-b">
                <ProfileBuilder />
              </div>
            </li>
            <li><Link to="/committee" className="block py-3 px-4 border-b hover:bg-islamic-light" onClick={toggleMenu}>কমিটি</Link></li>
            <li><Link to="/students" className="block py-3 px-4 border-b hover:bg-islamic-light" onClick={toggleMenu}>ছাত্র</Link></li>
            <li><Link to="/profile-frames" className="block py-3 px-4 border-b hover:bg-islamic-light" onClick={toggleMenu}>প্রোফাইল ফ্রেম</Link></li>
            <li><Link to="/contact" className="block py-3 px-4 border-b hover:bg-islamic-light" onClick={toggleMenu}>যোগাযোগ</Link></li>
            <li><Link to="/financial-report" className="block py-3 px-4 border-b hover:bg-islamic-light" onClick={toggleMenu}>আর্থিক প্রতিবেদন</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
