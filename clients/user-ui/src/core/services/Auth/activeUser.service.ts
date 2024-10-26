import { useMutation } from "@apollo/client";
import { ACTIVE_USER } from "../../graphql/actions/activeUser.action";
import { ActiveUserModel } from "../../models/Auth/activeUser.model";

export const useActiveUserService = () => {
    const [avtiveUserMutation, {loading}] = useMutation(ACTIVE_USER);
    const activeUser = async (
        activeUserModel: ActiveUserModel
    ) => {
        try {
            const response = await avtiveUserMutation(
                {
                  variables: {
                    activationCode: activeUserModel.activationCode,
                    activationToken: activeUserModel.activationToken
                  }
                }
            )
            return response
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            throw new Error(error.message)
        }     
    }
    return {activeUser, loading}
}