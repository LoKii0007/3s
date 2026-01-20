
import SidebarLogo from './SidebarLogo';
import SidebarNav from './SidebarNav';
import SidebarUser from './SidebarUser';
import SidebarFooter from './SidebarFooter';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full w-fit bg-white gap-2 p-4 font-[Poppins]">
      {/* Logo Section */}
      <SidebarLogo />

      <div className='h-0.5 mx-auto w-5/6 opacity-20 bg-linear-to-b from-[#787677] to-[#8E8E8E]'>

      </div>

      {/* Navigation Section */}
      <SidebarNav />

      {/* User Section */}
      <div className="space-y-2">
        <SidebarUser />
        <div className='h-0.5 mx-auto w-5/6 opacity-20 bg-linear-to-b from-[#787677] to-[#8E8E8E]'>

        </div>
        <SidebarFooter />
      </div>
    </div>
  );
};

export default Sidebar;
