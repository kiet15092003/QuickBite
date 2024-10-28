import { DocumentNode, gql } from "@apollo/client";

export const RESET_PASSWORD_USER : DocumentNode = gql`
    mutation ResetPassword(
        $password: String!,
        $activationToken: String!
    ) {
        resetPassword(
            resetPasswordDto: {
                password: $password
                activationToken: $activationToken
            }
        ){
            user {
                id
                password
            }
        }
    }
`