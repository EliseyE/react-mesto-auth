import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props}) => {
  return(
    props.isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
)}

export default ProtectedRoute;
