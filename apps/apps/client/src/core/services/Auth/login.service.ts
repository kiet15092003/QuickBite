import { useMutation } from "@apollo/client"
import { LOGIN_USER } from "../../graphql/actions/login.actions";
import { LoginUserModel } from "../../models/Auth/loginUser.model";

export const useLoginService = () => {
    const [loginMutation, {loading}] = useMutation(LOGIN_USER);
    const loginUser = async (
        loginUserModel : LoginUserModel
    ) => {
        try {
            const response = await loginMutation({
                variables: {
                    email: loginUserModel.email,
                    password: loginUserModel.password
                }
            })
            return response
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            throw new Error(error!.message)
        }
    }
    return {loginUser, loading}
}