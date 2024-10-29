'use client';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import useUser from '../../hooks/useUser';
import AuthScreen from '../../screens/AuthScreen';

const ProfileDropdown = () => {
    const [signedIn, setSignedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const {user, loading} = useUser();

    useEffect(()=>{
        if (!loading){
            setSignedIn(!!user)
        }
    }, [loading, user])

    const handleLogout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        toast.success("Log out successfully");
        window.location.reload()
    }

    return (
        <div className="flex items-center gap-4 relative">
            {signedIn ? (
                <Dropdown placement="bottom-end"  className='bg-black'>
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            src={user?.avatar?.url}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat"
                       >
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold text-white">Signed in as</p>
                            <p className="font-semibold text-white">{user.email}</p>
                        </DropdownItem>
                        <DropdownItem key="my_profile" className='text-white'>My Profile</DropdownItem>
                        <DropdownItem key="my_orders" className='text-white'>My Orders</DropdownItem>
                        <DropdownItem key="help_and_feedback" className='text-white'>Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger" className='text-white'
                        onClick={handleLogout}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                    <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"     
                            size='sm'                     
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Anonymous Profile Actions" variant="flat"
                        >
                        <DropdownItem key="signin" className='text-white'
                            onClick={() => setOpen(!open)}
                        >
                            Sign in
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" className='text-white'
                        onClick={handleLogout}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )}
            {
                open ? (<AuthScreen/>) : (<div></div>)
            }
        </div>
    );
}

export default ProfileDropdown;
