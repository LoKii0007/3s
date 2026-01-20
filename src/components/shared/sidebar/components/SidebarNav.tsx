import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from '../constants/menuItems';
import { ChevronDown } from 'lucide-react';

const SidebarNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (item: typeof menuItems[0]) => {
    if (item.path === '/') {
      return location.pathname === '/';
    }
    return item.path && location.pathname.startsWith(item.path);
  };

  return (
    <nav className="flex-1 p-2 font-[Poppins]">
      <ul className="space-y-1">
        {menuItems.map((item) => {
          const active = isActive(item);
          return (
            <li key={item.id}>
              <button
                onClick={() => handleItemClick(item)}
                className={`
                  w-full flex items-center p-2 gap-2 rounded-lg text-sm tracking-[0.25px] leading-[20px]
                  transition-colors duration-150
                  ${
                    active
                      ? 'bg-[#F9F9F9] text-[#5583F7] font-semibold'
                      : 'text-[#3F3F46]'
                  }
                  hover:bg-[#f0f0f0] hover:text-[#5583f7]
                `}
              >
                <span className={`shrink-0 strokeWidth={1.5}`}>
                  {item.icon}
                </span>
                <span className="flex-1 text-left">{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown className='w-4 h-4' strokeWidth={1.5} />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarNav;
