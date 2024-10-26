'use client';
import useUser from '@/src/hooks/useUser';
import AuthScreen from '@/src/screens/AuthScreen';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

const ProfileDropdown = () => {
    const [signedIn, setSignedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const {user, loading} = useUser();

    useEffect(()=>{
        if (!loading){
            setSignedIn(!!user)
        }
    }, [loading, user])

    return (
        <div className="flex items-center gap-4 relative">
            {signedIn ? (
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold text-white">Signed in as</p>
                            <p className="font-semibold text-white">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="my_profile" className='text-white'>My Profile</DropdownItem>
                        <DropdownItem key="my_orders" className='text-white'>My Orders</DropdownItem>
                        <DropdownItem key="help_and_feedback" className='text-white'>Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger" className='text-white'>Log Out</DropdownItem>
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
                    <DropdownMenu aria-label="Anonymous Profile Actions" variant="flat">
                        <DropdownItem key="signin" className='text-white'
                            onClick={() => setOpen(!open)}
                        >
                            Sign in
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
