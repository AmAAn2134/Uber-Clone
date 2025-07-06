import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/captainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/caption-login', { replace: true });
      return;
    }
    console.log(token);
    
    const fetchCaptain = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setCaptain(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        navigate('/caption-login', { replace: true });
      }
    };

    fetchCaptain();
  }, [navigate, captain]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
