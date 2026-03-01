import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import { Navigate } from 'react-router';


const DashboardHome = () => {

    const { role } = useUserRole()

    if (!role) return null;


    return role === 'admin'
        ? <Navigate to="/dashboard/admin/overview" replace />
        : <Navigate to="/dashboard/user/profile" replace />;

};

export default DashboardHome;