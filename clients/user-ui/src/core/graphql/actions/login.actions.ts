import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const LOGIN_USER : DocumentNode = gql`
    mutation LoginUser(
        $email: String!,
        $password: String!
    ){
        login(
            loginDto: {
                email: $email
                password: $password
            }
        ) {
            accessToken
            refreshToken
            user{
                id
                email
            }
        }
    }
` 