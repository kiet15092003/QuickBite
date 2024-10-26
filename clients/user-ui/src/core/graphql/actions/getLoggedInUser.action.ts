import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const LOGGEDIN_USER: DocumentNode = gql`
    query GetLoggedInUser{
        getLoggedInUser {
            accessToken
            refreshToken
            user {
                id
                email
                name
                password
            }
        }
    }
`