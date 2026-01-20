import React from 'react';
import { ChevronsUpDown } from 'lucide-react';

const SidebarUser: React.FC = () => {
  return (

    <div className="flex items-center justify-between p-4 gap-2">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-[#3F3F46] tracking-[0.1px] leading-[20px]">shadcn</span>
        <span className="text-xs text-[#3F3F46] leading-[14px] tracking-[0.4px]">Super Admin</span>
      </div>
      <button className="p-1 hover:bg-[#F3F4F6] rounded">
        <ChevronsUpDown className="w-4 h-4 text-[#3F3F46]" />
      </button>
    </div>
  );
};

export default SidebarUser;
