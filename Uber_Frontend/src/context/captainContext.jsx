import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'


export const CaptainDataContext = createContext();

export const useCaptain = () => {
    const context = useContext(CaptainDataContext);
    if (!context) {
        throw new Error('useCaptain must be used within a CaptainProvider');
    }
    return context;
};

export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if captain is logged in on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('/api/captain/profile', {
                withCredentials: true
            });
            setCaptain(response.data.data.captain);
        } catch (err) {
            setCaptain(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/captain/login', {
                email,
                password
            }, { withCredentials: true });
            setCaptain(response.data.data.captain);
            setError(null);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            return { success: false, error: err.response?.data?.message };
        }
    };

    const logout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`, { withCredentials: true });
            setCaptain(null);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Logout failed');
        }
    };

    const register = async (captainData) => {
        try {
            const response = await axios.post('/api/captain/register', captainData, {
                withCredentials: true
            });
            setCaptain(response.data.data.captain);
            setError(null);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            return { success: false, error: err.response?.data?.message };
        }
    };

    const value = {
        captain,
        loading,
        error,
        login,
        logout,
        register
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};
export default CaptainContext;
