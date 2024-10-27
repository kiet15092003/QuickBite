import { useForgotPasswordService } from '@/src/core/services/Auth/forgotPassword.service';
import styles from '@/src/utils/style';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';
import { z } from 'zod'
import toast from 'react-hot-toast';

const formSchema = z.object({
    email: z.string().email("Invalid email"),
})

type forgotPasswordSchema = z.infer<typeof formSchema>;

const ForgotPassword = ({setActiveSite} : {setActiveSite: (e: string) => void}) => {
    const {register, handleSubmit, formState: { errors }, reset} = useForm<forgotPasswordSchema>({
        resolver: zodResolver(formSchema)
    })

    const {loading, forgotPassword} = useForgotPasswordService()

    const onSubmit = async (reqData: forgotPasswordSchema) => {
        try {
            forgotPassword(reqData.email)
            toast.success("Please check your mail to reset your password")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message)
        }        
        reset()
    }
    return (
        <div style={{ width: "300px" }}>
            <h1 className={`${styles.title} text-black font-bold mb-3`}>Forgot your password?</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    isClearable
                    startContent={<MdEmail size={20} color='grey' />}
                    radius='sm'
                    variant='underlined'
                    style={{ color: 'grey' }}
                />
                {errors.email && (
                    <span className='text-red-500 block mt-1 text-xs'>
                        {errors.email.message}
                    </span>
                )}
                <div className='flex items-center justify-end mt-3'>
                    <span className='text-primary-500 ml-1 cursor-pointer'
                        onClick={()=>setActiveSite('login')}
                    >Back to your login?</span>
                </div>
                <Button 
                    type='submit' 
                    color='primary' 
                    className='w-full rounded-md mt-3'
                    isDisabled={loading}
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default ForgotPassword
