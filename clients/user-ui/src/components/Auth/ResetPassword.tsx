import { useResetPasswordService } from '@/src/core/services/Auth/resetPassword.service';
import styles from '@/src/utils/style';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { z } from 'zod';

const formSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Confirmed password must be required")
})

type resetPasswordSchema = z.infer<typeof formSchema>;

const ResetPassword = ({activationToken} : {activationToken: string}) => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<resetPasswordSchema>({
        resolver: zodResolver(formSchema),
    });

    const {resetPassword, loading} = useResetPasswordService()

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const togglePasswordVisible = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
    const toggleConfirmPasswordVisible = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
    }

    const router = useRouter()

    const onSubmit = async (data: resetPasswordSchema) => {
        if (Object.keys(errors).length === 0) {
            try {
                const response = await resetPassword({
                    password: data.password,
                    activationToken: activationToken
                });
                if (response.data.resetPassword.user){
                    toast.success("Reset password successfully");
                    router.push('/');            
                    reset();
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error.message)
            }
            
        } else {
        console.log("Form has errors:", errors);
        }
    }
    return (
    <div className='w-full fixed top-0 left-0 h-screen z-50 flex items-center justify-center bg-white'>
      <div
        className='absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat
        flex items-center justify-center'
        style={{
          backgroundImage: `url("/images/foodBgAuth.jpg")`,
        }}
      >
        <div className='relative z-10 backdrop-blur-md bg-white/80 rounded-md p-5'
        style={{ width: "340px" }}>
        <div style={{ width: "300px" }}>
            <h1 className={`${styles.title} text-black font-bold mb-3`}>Reset your password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    {...register("password")}
                    placeholder="Enter your password"
                    startContent={<FaLock size={20} color='grey' />}
                    radius='sm'
                    variant='underlined'
                    className='mt-5'
                    endContent={
                        <button className='focus:outline-none' type='button' onClick={togglePasswordVisible}>
                            {isPasswordVisible ? <FaEye size={20} color='grey' /> : <FaEyeSlash size={20} color='grey' />}
                        </button>
                    }
                    type={isPasswordVisible ? 'text' : 'password'}
                    style={{ color: 'grey' }}
                />
                {errors.password && (
                    <span className='text-red-500 block mt-1 text-xs'>
                        {errors.password?.message}
                    </span>
                )}
                <Input 
                    {...register("confirmPassword")}
                    placeholder="Confirm your password"
                    startContent={<FaLock size={20} color='grey' />}
                    radius='sm'
                    variant='underlined'
                    className='mt-5'
                    endContent={
                        <button className='focus:outline-none' type='button' onClick={toggleConfirmPasswordVisible}>
                            {isConfirmPasswordVisible ? <FaEye size={20} color='grey' /> : <FaEyeSlash size={20} color='grey' />}
                        </button>
                    }
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    style={{ color: 'grey' }}
                />
                {errors.confirmPassword ? (
                    <span className='text-red-500 block mt-1 text-xs'>
                    {errors.confirmPassword.message}
                    </span>
                ) : (
                    watch("password") && watch("confirmPassword") && watch("password") !== watch("confirmPassword") && (
                    <span className='text-red-500 block mt-1 text-xs'>
                        Passwords do not match
                    </span>
                    )
                )}
                <Button 
                    type='submit' 
                    color='primary' 
                    className='w-full rounded-md mt-5'
                    isDisabled={loading}
                >
                    Reset your password
                </Button>
            </form>
        </div>
        </div>
      </div>
      </div>
    )
}

export default ResetPassword
