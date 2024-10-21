import Link from 'next/link'
import React from 'react'

const navItems = [
    {
        title: "Home",
        url: "/",
    },
    {
        title: "About us",
        url: '/about',
    },  
    {
        title: "Restaurants",
        url:"/restaurants",
    },
    {
        title: "Popular Foods",
        url: "/foods",
    },
    {
        title: "Contact us",
        url: "/contact",
    }
]

const NavItems = ({activeItem = 0, setActiveItem}:
    {
        activeItem?: number,
        setActiveItem: (index: number) => void
    }) => {
    return (
        <div>
            {navItems.map((item, index)=>(
                <Link
                    key={item.url}
                    href={item.url}
                    onClick={()=>setActiveItem(index)}
                    className={
                        `px-5 text-[18px] font-[500] 
                        ${
                            activeItem === index ? "text-[#37b668]" : "text-white"
                        }`
                    }
                >
                    {item.title}
                </Link>
            ))}
        </div>
    )
}

export default NavItems
