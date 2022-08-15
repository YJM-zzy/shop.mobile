import React from 'react';
import {Navigate} from "react-router-dom";

const Index = ({children}) => {
	const token = localStorage.getItem('token');
	return (
		token ? children : <Navigate to={'/login'}></Navigate>
	);
};

export default Index;