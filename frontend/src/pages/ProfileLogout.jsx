import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const logout = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/captain-login');
                }
            } catch (err) {
                console.log(err);
                localStorage.removeItem('token');
                navigate('/captain-login');  
            }
        };

        logout();
    }, [token, navigate]);

    return (
        <div>
            Logging out...
        </div>
    );
};

export default ProfileLogout;
