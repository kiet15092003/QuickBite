import { useMutation } from "@apollo/client"
import { RESET_PASSWORD_USER } from "../../graphql/actions/resetPassword.action"
import { ResetPasswordModel } from "../../models/Auth/resetPassword.model"

export const useResetPasswordService = () => {
    const [ resetPasswordMutation, {loading}  ] = useMutation(RESET_PASSWORD_USER)

    const resetPassword = async (
        resetPasswordModel: ResetPasswordModel
    ) => {
        const response = await resetPasswordMutation(
            {
                variables: resetPasswordModel
            }
        )
        return response
    }
    return {resetPassword, loading}
}