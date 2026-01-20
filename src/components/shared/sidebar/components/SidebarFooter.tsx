import React from 'react';

const SidebarFooter: React.FC = () => {
  return (
    <div className="pt-2 pb-4 px-[13px] gap-1">
      <div className=''>
        <div className='flex text-base'>
          <div className="font-semibold text-transparent stroke-2 bg-clip-text bg-linear-to-r from-[#003366] to-[#003366]">Stream</div>
          <div className='text-[#4FA345]'>.</div>
        </div>
        <div className='flex text-[7px] items-center gap-0.5'>
          <span className=''>powered by</span>
          <div className='flex'>
            <span className='text-[#5583F7] mr-[1px]'>3</span>
            <span className='text-[#4FA345] mr-[1px]'>S</span>
            <span className='text-[#18181B]'>Smart Ship Solutions</span>
          </div>
        </div>
      </div>
      <div className='text-[10px] tracking-[0.5px] leading-[16px] text-[#717171]'>
        version 0.0.1
      </div>
    </div>
  );
};

export default SidebarFooter;
