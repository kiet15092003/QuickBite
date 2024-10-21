'use client';
import React, { useState } from 'react'
import NavItems from './NavItems';
import styles from '@/src/utils/style';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const [activeItem, setActiveItem] = useState(0);
  return (
    <header className='w-full bg-gray-900'>
      <div className='w-[90%] m-auto h-[80px] flex items-center justify-between'>
        <h1 className={`${styles.logo}`}> 
          QuickBite
        </h1>
        <NavItems activeItem={activeItem} setActiveItem={setActiveItem}/>  
        <ProfileDropdown/>
      </div>
    </header>
  )
}

export default Header
