import { useQuery } from "@apollo/client"
import { LOGGEDIN_USER } from "../core/graphql/actions/getLoggedInUser.action"

const useUser = () => {
    const {data, loading, error} = useQuery(LOGGEDIN_USER)
    console.log("🚀 ~ useUser ~ data:", data)
    if (loading) return { loading: true, user: null };
    if (error) {
        console.error("Error fetching data:", error);
        return { loading: false, user: null };
    }
    return {
        loading,
        user: data.getLoggedInUser.user 
    }
}

export default useUser
