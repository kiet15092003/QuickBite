import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaLock, FaPhone, FaUser } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { z } from 'zod'
import styles from '../../utils/style';
import { useRegisterService } from '../../core/services/Auth/register.service';

const formSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8,"Password must be at least 8 characters long"),
    name: z.string().min(1,"Name must be required"),
    phoneNumber : z.string().min(10,"Phone number must be 10 characters long").max(10, "Password must be 10 characters long")
})

type registerSchema = z.infer<typeof formSchema>;

const Register = ({setActiveSite}: {setActiveSite : (e:string) => void}) => {

    const {register , handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<registerSchema>({
        resolver: zodResolver(formSchema)
    })

    const {registerUser, loading} = useRegisterService()

    const [isVisible, setIsVisible] = useState<boolean>(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    const onSubmit = async (data: registerSchema) => {
        try {
            const response = await registerUser(data)
            toast.success("Please check your email to activate your account")
            localStorage.setItem("activationToken", response.data.register.activationToken)
            reset();
            setActiveSite('verification');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    
    return (
        <div style={{width: "300px"}}>
            <h1 className={`${styles.title} text-black font-bold mb-3`}>Signup with QuickBite</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Input 
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    isClearable
                    startContent={
                        <MdEmail size={20} color='grey' />
                    }
                    radius='sm'
                    variant='underlined'
                    style={{ color: 'grey' }}
                />
                {
                    errors.email && (
                        <span className='text-red-500 block mt-1 text-xs'>
                            {`${errors.email.message}`}
                        </span>
                    )
                }
                <Input 
                    {...register("password")}
                    placeholder="Enter your password"
                    startContent={
                    <FaLock size={20} color='grey' />
                    }
                    radius='sm'
                    variant='underlined'
                    className='mt-5'
                    endContent = {
                        <button className='focus:outline-none' type='button'
                        onClick={toggleVisibility}>
                            {
                                isVisible ? (
                                    <FaEye size={20} color='grey'/>
                                ) : (
                                    <FaEyeSlash size={20} color='grey'/>
                                )
                            }
                        </button>
                    }
                    type={ isVisible ? 'text' : 'password'}
                    style={{ color: 'grey' }}
                />
                {
                    errors.password && (
                        <span className='text-red-500 block mt-1 text-xs'>
                            {`${errors.password?.message}`}
                        </span>
                    )
                }
                <Input 
                    {...register("name")}
                    placeholder="Enter your name"
                    startContent={
                    <FaUser size={20} color='grey' />
                    }
                    radius='sm'
                    variant='underlined'
                    className='mt-5'
                    style={{ color: 'grey' }}
                />
                {
                    errors.name && (
                        <span className='text-red-500 block mt-1 text-xs'>
                            {`${errors.name?.message}`}
                        </span>
                    )
                }
                <Input 
                    {...register("phoneNumber")}
                    placeholder="Enter your phone number"
                    startContent={
                    <FaPhone size={20} color='grey' />
                    }
                    radius='sm'
                    variant='underlined'
                    className='mt-5'
                    type='text'
                    style={{ color: 'grey' }}
                />
                {
                    errors.phoneNumber && (
                        <span className='text-red-500 block mt-1 text-xs'>
                            {`${errors.phoneNumber?.message}`}
                        </span>
                    )
                }
                <Button 
                    type='submit' 
                    color='primary' 
                    className='w-full rounded-md mt-6'
                    isDisabled={isSubmitting || loading}
                >
                    Signup
                </Button>
                <div className='flex items-center mt-3'>
                    <div className="flex-grow h-px bg-gray-400"></div>
                    <span className='mx-4 text-gray-400'>Or signup with</span>
                    <div className="flex-grow h-px bg-gray-400"></div>
                </div>
                <Button className='w-full rounded-md mt-3 bg-white'>
                    <span className='flex items-center '>
                        <FcGoogle size={25}/>
                        <span className='ml-2 text-gray-400'>Signup with Google</span> 
                    </span>
                </Button>
                <div className='flex items-center justify-end mt-3'>
                    <span className='text-gray-400'> Already have account? </span>
                    <span className='text-primary-500 ml-1 cursor-pointer'
                        onClick={()=>setActiveSite('login')}
                    >Login</span>
                </div>
            </form>
        </div>
    )
}

export default Register
