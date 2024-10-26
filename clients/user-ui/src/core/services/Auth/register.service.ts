import { useMutation } from "@apollo/client"
import { REGISTER_USER } from "../../graphql/actions/register.action"
import { RegisterModel } from "../../models/Auth/register.model"

export const useRegisterService = () => {
    const [registerMutation, {loading}] = useMutation(REGISTER_USER)
    const registerUser = async (
        registerModel: RegisterModel
    ) => {
        try {
            const response = await registerMutation({
                variables: {
                    name: registerModel.name,
                    email: registerModel.email,
                    password: registerModel.password,
                    phoneNumber: registerModel.phoneNumber,
                }
            })
            console.log(response)
            return response
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            throw new Error(error.message)
        }  
    }
    return {registerUser, loading}
}