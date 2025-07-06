import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user } = React.useContext(UserDataContext);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return <>{children}</>;
};

export default UserProtectWrapper;
