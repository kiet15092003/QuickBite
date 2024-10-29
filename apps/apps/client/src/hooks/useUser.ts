import { useQuery } from "@apollo/client";
import { LOGGEDIN_USER } from "../core/graphql/actions/getLoggedInUser.action";

const useUser = () => {
    const { data, loading, error } = useQuery(LOGGEDIN_USER);
    return {
        loading,
        user: error ? null : data?.getLoggedInUser?.user,
    };
};

export default useUser;
