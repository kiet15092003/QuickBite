import { useLazyQuery } from "@apollo/client"
import { FORGOT_PASSWORD } from "../../graphql/actions/forgotPassowrd.action"
import { ForgotPasswordModel } from "../../models/Auth/forgotPassword.model";

export const useForgotPasswordService = () => {
    const [triggerForgotPassword, { loading, data }] = useLazyQuery(FORGOT_PASSWORD);
    const forgotPassword = (forgotPasswordModel: ForgotPasswordModel) => {
        triggerForgotPassword({
            variables: {
                email: forgotPasswordModel.email
            }
        })
    }
    return {forgotPassword, loading, data}
}