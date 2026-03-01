import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { AuthContex } from '../../providers/AuthProvider';
import SocialLogin from './SocialLogin';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useContext(AuthContex);
    const navigate = useNavigate()
    const onSubmit = async (data) => {

        await signInUser(data.email, data.password)
        navigate(`${location.state?location.state : '/'}`);

    };

    return (
        <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-4 py-10 transition-colors duration-300">

            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-text-main">ShopHub</h1>
                <p className="text-text-muted text-sm mt-1">Welcome back! Please enter your details.</p>
            </div>

            <div className="w-full max-w-[400px] bg-bg-primary border border-border-color p-8 rounded-3xl shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">


                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-text-main" htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-3.5 bg-bg-secondary border border-border-color rounded-xl text-text-main focus:outline-none focus:border-accent transition-all text-sm font-medium"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <span className="text-danger text-xs font-medium">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-text-main" htmlFor="password">Password</label>
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3.5 bg-bg-secondary border border-border-color rounded-xl text-text-main focus:outline-none focus:border-accent transition-all text-sm font-medium"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <span className="text-danger text-xs font-medium">{errors.password.message}</span>}
                    </div>

                    <button

                        type="submit"
                        className="w-full bg-accent hover:bg-accent-hover text-white py-3.5 rounded-xl font-bold text-sm transition-all mt-2 active:scale-95 shadow-md shadow-accent/10"
                    >
                        Sign In
                    </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px bg-border-color flex-1"></div>
                    <span className="text-text-muted text-[10px] uppercase tracking-widest font-bold">OR</span>
                    <div className="h-px bg-border-color flex-1"></div>
                </div>

                <div>
                    <SocialLogin></SocialLogin>
                </div>

                <p className="text-center text-sm text-text-muted mt-8 font-medium">
                    New to ShopHub?{' '}
                    <NavLink to="/register" className="text-accent font-bold hover:underline underline-offset-4">
                        Create account
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;