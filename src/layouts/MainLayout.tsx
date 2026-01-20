import Sidebar from '../components/shared/sidebar/components/Sidebar'
import { Outlet } from 'react-router-dom'
import Breadcrumb from '../components/shared/Breadcrumb'
import Footer from '../components/shared/Footer'

const MainLayout = () => {
  return (
    <>
      <div className='main-layout w-screen h-screen flex '>
        {/* sidebar  */}
        <Sidebar />

        {/* content  */}
        <div className='flex flex-col w-full flex-1 '>
          <div className='shrink-0'>
            <Breadcrumb />
          </div>
          <div className='flex-1 border border-[#E8E8E8] border-r-0 rounded-[24px] overflow-hidden'>
            <Outlet />
          </div>
          <div className='shrink-0 w-full'>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainLayout