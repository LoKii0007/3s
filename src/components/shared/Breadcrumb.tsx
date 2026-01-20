import { Fragment } from 'react'

const Breadcrum = () => {
    const pathnames = [
        {
            name: 'Fleet Management',
            path: '/fleet-management'
        },
        {
            name: 'Sagar Kanya',
            path: '/sagar-kanya'
        },
        {
            name: 'Vessel Hierarchy Tree',
            path: '/vessel-hierarchy'
        }
    ]


    return (
        <div className='flex items-center font-[Poppins] gap-2.5 px-6 py-3'>
            {pathnames.map((name, index) => (
                <Fragment key={name.path}>
                    {/* <Link to={name.path} key={name.path}> */}
                        <span className={`text-sm tracking-[0.25px] leading-[20px] ${index !== pathnames.length - 1 ? 'text-[#71717A] ' : 'text-[#5583F7]'}`}>{name.name}</span>
                    {/* </Link> */}
                    {index !== pathnames.length - 1 && <span className='text-sm rotate-45 text-[#71717A]'>|</span>}
                </Fragment>
            ))}
        </div>
    )
}

export default Breadcrum