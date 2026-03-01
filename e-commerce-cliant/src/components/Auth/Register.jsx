import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { NavLink } from 'react-router';
import { AuthContex } from '../../providers/AuthProvider';
import axios from 'axios';

import toast from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';
import SocialLogin from './SocialLogin';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, upDateUser } = useContext(AuthContex);
    const axiosInstance = useAxios();


    const onSubmit = async (data) => {
       
        try {

            await createUser(data.email, data.password)
            const imageFile = data.photoURL[0];
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMG}`,
                formData
            );

            const imageUrl = response.data.data.url;
            const userProfile = {
                displayName: data.name,
                photoURL: imageUrl
            };
            await upDateUser(userProfile);
            const userInfo = {
                name: data.name,
                email: data.email,
                photo: imageUrl,
                role: "user",
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString()
            };

            const result = await axiosInstance.post('/users', userInfo)
            
            if (result.data.insertedId) {

                toast.success("Account created successfully")
            }

        } catch (err) {
            //
        }



    };

    return (
        <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-4 py-10 transition-colors duration-300">

            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-text-main">ShopHub</h1>
                <p className="text-text-muted text-sm mt-1">Create your account to start shopping</p>
            </div>

            <div className="w-full max-w-[400px] bg-bg-primary border border-border-color p-8 rounded-3xl shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor='name' className="text-sm font-semibold text-text-main">Full Name</label>
                        <input
                            type="text"
                            id='name'
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-xl text-text-main focus:outline-none focus:border-accent transition-all text-sm"
                            placeholder="John Doe"
                        />
                        {errors.name && <span className="text-danger text-xs">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor='email' className="text-sm font-semibold text-text-main">Email</label>
                        <input
                            type="email"
                            id='email'
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-xl text-text-main focus:outline-none focus:border-accent transition-all text-sm"
                            placeholder="example@mail.com"
                        />
                        {errors.email && <span className="text-danger text-xs">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor='password' className="text-sm font-semibold text-text-main">Password</label>
                        <input
                            type="password"
                            id='password'
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "Min 8 characters" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Must include uppercase, lowercase, number, and special character"
                                }
                            })}
                            className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-xl text-text-main focus:outline-none focus:border-accent transition-all text-sm"
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-danger text-xs">{errors.password.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-text-main" htmlFor='photoURL'>Photo</label>
                        <input
                            type="file"
                            id='photoURL'
                            {...register("photoURL", {
                                required: "Photo is required",

                            })}
                            className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-xl text-text-main focus:outline-none focus:border-accent transition-all text-sm"
                            placeholder="••••••••"
                        />
                        <p className="text-[10px] text-text-muted mt-0.5">
                            Password must be at least 8 characters with letters, numbers & symbols.
                        </p>
                        {errors.photoURL && <span className="text-danger text-xs">{errors.photoURL.message}</span>}
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-hover text-white py-3.5 rounded-xl font-bold text-sm transition-all mt-2 active:scale-95"
                    >
                        Create Account
                    </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px bg-border-color flex-1"></div>
                    <span className="text-text-muted text-xs uppercase tracking-widest">or</span>
                    <div className="h-px bg-border-color flex-1"></div>
                </div>

                <div>
                    <SocialLogin></SocialLogin>
                </div>

                <p className="text-center text-sm text-text-muted mt-8 font-medium">
                    Have an account?{' '}
                    <NavLink to="/login" className="text-accent font-bold hover:underline underline-offset-4">
                        Sign In
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Register;