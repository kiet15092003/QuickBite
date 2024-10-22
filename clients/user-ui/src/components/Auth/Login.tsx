import styles from '@/src/utils/style'
import React, { useState } from 'react'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Divider, Input } from '@nextui-org/react'
import { MdEmail } from 'react-icons/md'
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long")
})

type loginSchema = z.infer<typeof formSchema>;

const Login = () => {

    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<loginSchema>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = (data: loginSchema) => {
        console.log(data)
        reset()
    }

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div style={{width: "300px"}}>
      <h1 className={`${styles.title} text-black font-bold mb-4`}>Login will QuickBite</h1>
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
            />
            {
                errors.email && (
                    <span className='text-red-500 block mt-1'>
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
            />
            {
                errors.email && (
                    <span className='text-red-500 block mt-1'>
                        {`${errors.password?.message}`}
                    </span>
                )
            }
            <div className='flex items-center justify-end mt-3'>
                <span className='text-primary-500 ml-1'>Forgot your password?</span>
            </div>
            <Button type='submit' color='primary' className='w-full rounded-md mt-3'>
                Login
            </Button>
            <div className='flex items-center mt-3'>
                <div className="flex-grow h-px bg-gray-400"></div>

                <span className='mx-4 text-gray-400'>Or login with</span>

                <div className="flex-grow h-px bg-gray-400"></div>
            </div>
            <Button className='w-full rounded-md mt-3 bg-white'>
                <span className='flex items-center '>
                    <FcGoogle size={25}/>
                    <span className='ml-2 text-gray-400'>Login with Google</span> 
                </span>
            </Button>
            <div className='flex items-center justify-end mt-3'>
                <span className='text-gray-400'> Not have any account? </span>
                <span className='text-primary-500 ml-1'>Sign up</span>
            </div>
        </form>
    </div>
  )
}

export default Login