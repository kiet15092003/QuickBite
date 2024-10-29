"use client"
import {gql, DocumentNode} from '@apollo/client'

export const REGISTER_USER: DocumentNode = gql`
mutation RegisterUser(
    $name: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
){
    register(
        registerDto: {
            name: $name,
            email: $email,
            password: $password,
            phoneNumber: $phoneNumber
        }
    ){
        activationToken
    }
}
`