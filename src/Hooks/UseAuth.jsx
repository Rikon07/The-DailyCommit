import React, { use } from 'react';
import { AuthContext } from '../Providers/Contexts';

const useAuth = () => {
    const authInfo = use(AuthContext);
    return authInfo;
};

export default useAuth;