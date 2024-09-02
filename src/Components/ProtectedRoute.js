import { useSelector, useDispatch } from 'react-redux';
import { openLoginModal } from './ModalSlice'; 
import Home from './Home';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    if (isAuthenticated === null) {
       dispatch(openLoginModal("SignUP"))
       return <Home/>
    }
    else{
    return <Component {...rest} />;
    }
};

export default ProtectedRoute;
