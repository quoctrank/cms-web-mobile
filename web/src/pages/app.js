
import * as React from 'react';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../app/Dashboard';
export default function App() { return <PrivateRoute component={Dashboard} />; }
