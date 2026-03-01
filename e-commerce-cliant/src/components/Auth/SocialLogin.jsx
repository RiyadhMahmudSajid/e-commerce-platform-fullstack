import React, { useContext } from 'react';

import toast from 'react-hot-toast';

import googlelogo from '/google-logo.png';
import { useNavigate } from 'react-router';
import { AuthContex } from '../../providers/AuthProvider';
import useAxios from '../../hooks/useAxios';

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContex);
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin();
            const user = result.user;

            const userInfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                role: "user",
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString()
            };


            await axiosInstance.post('/users', userInfo);

            toast.success("Google login successful");
            navigate('/');
        } catch (error) {
           
            toast.error("Google login failed");
        }
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-3 border border-border-color rounded-xl hover:bg-bg-secondary transition-all text-sm font-semibold text-text-main active:scale-95"
        >
            <img src={googlelogo} className="w-4 h-4" alt="Google" />
            Continue with Google
        </button>
    );
};

export default SocialLogin;
