import { useLazyQuery } from "@apollo/client"
import { FORGOT_PASSWORD } from "../../graphql/actions/forgotPassowrd.action"

export const useForgotPasswordService = () => {
    const [triggerForgotPassword, { loading, data }] = useLazyQuery(FORGOT_PASSWORD);
    const forgotPassword = (email: string) => {
        triggerForgotPassword({
            variables: {email}
        })
    }
    return {forgotPassword, loading, data}
}