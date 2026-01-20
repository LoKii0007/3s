import React from 'react';

const SidebarLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-1 px-6 py-[10px]">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-5xl font-bold text-[#2563EB]">3</span>
        <span className="text-5xl font-bold text-[#10B981]">S</span>
      </div>
      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="text-base font-semibold text-[#374151] leading-tight">
          SMART SHIP
        </span>
        <span className="text-base font-semibold text-[#374151] leading-tight">
          SOLUTIONS
        </span>
      </div>
    </div>
  );
};

export default SidebarLogo;
