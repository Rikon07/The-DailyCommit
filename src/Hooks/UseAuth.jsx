import React, { useContext } from 'react';
import { AuthContext } from '../Providers/Contexts';

const useAuth = () => {
    const authInfo = useContext(AuthContext);
    return authInfo;
};

export default useAuth;