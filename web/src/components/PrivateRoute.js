
import * as React from 'react';
import { navigate } from 'gatsby';
import { auth } from '../services/auth';
export default function PrivateRoute({ component: Component, ...rest }) { React.useEffect(() => { auth.init(); if (!auth.isLoggedIn()) navigate('/'); }, []); return auth.isLoggedIn() ? <Component {...rest} /> : null; }
