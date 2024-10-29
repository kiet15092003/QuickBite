import { gql } from "@apollo/client";

export const FORGOT_PASSWORD = gql`
    query ForgotPassword(
        $email: String!
    ){
        forgotPassword(
            forgotPasswordDto: {
                email: $email
            }
        ){
            message
        }
    }
`