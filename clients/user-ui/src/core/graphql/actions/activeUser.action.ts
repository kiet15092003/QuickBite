import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const ACTIVE_USER : DocumentNode = gql`
    mutation ActiveUser(
        $activationToken: String!
        $activationCode: String!
    ){
        activateUser(
            activationDto: {
                activationToken: $activationToken,
                activationCode: $activationCode
            }    
        ){
            user{
                id
                email
            }
        }
    }
`