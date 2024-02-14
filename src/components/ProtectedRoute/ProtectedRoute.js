import { Navigate } from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props}) => {
    if (props.isLoading) {
        return null;
    }

    return (
        props.loggedIn ? <Component {...props} /> : <Navigate to="/" replace/>
    )
};

export default ProtectedRoute;
