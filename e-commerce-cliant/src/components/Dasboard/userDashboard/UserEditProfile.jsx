import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { X, Camera, User, Save, AlertCircle } from 'lucide-react';

import toast from 'react-hot-toast';
import { ModalContex } from '../../../providers/ModalProvider';
import { AuthContex } from '../../../providers/AuthProvider';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';

const UserEditProfile = () => {
    const axiosInstance = useAxios()
    const { setShowModal } = useContext(ModalContex);
    const { user, setUser, upDateUser } = useContext(AuthContex);
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        defaultValues: { displayName: user?.displayName || '', }
    });
    const updateUserMutation = useMutation({
        mutationFn: (updateUserInfo) =>
            axiosInstance.patch(`/user?email=${user?.email}`, updateUserInfo),

        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            toast.success("Profile updated successfully");
            setShowModal(false);
        },

        onError: () => {
            toast.error("Profile update failed");
        }
    });


    const onSubmit = async (data) => {
        

        let imageUrl = user?.photoURL

        if (data.photoURL > 0 && data.photoURL[0] instanceof File) {
            const imageFile = data.photoURL[0];
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMG}`,
                formData
            );

           
             imageUrl = response.data.data.url;
        }


        const updateUserProfile = {
            displayName: data.displayName || user.displayName,
            photoURL: imageUrl
        }
        await upDateUser(updateUserProfile)
        const userInfo = {
            name: data.displayName || user.displayName,

            photo: imageUrl
        }
        updateUserMutation.mutate(userInfo);
        setShowModal(false);
    };

    return (
        <div className="fixed inset-0 z-[45] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-bg-secondary w-full max-w-lg rounded-[2.5rem] border border-border-color shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">

                <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-6 right-6 p-2 bg-bg-primary hover:bg-red-500/10 hover:text-red-500 text-text-muted rounded-xl transition-all z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-8 lg:p-10">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-text-main tracking-tight">Edit Profile</h2>
                        <p className="text-sm text-text-muted">Update your personal information and photo</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="flex justify-center mb-8">
                            <div className="relative group">
                                <div className="w-28 h-28 rounded-3xl overflow-hidden ring-4 ring-bg-primary shadow-xl">
                                    <img
                                        src={user?.photoURL || "https://i.ibb.co/3S6P2Gj/user.png"}
                                        alt="Current Profile"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <label className="absolute -bottom-2 -right-2 p-2.5 bg-accent text-white rounded-xl shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all">
                                    <Camera size={18} />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        {...register("photo")}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        {...register("displayName", {
                                            required: "Name is required",
                                            minLength: { value: 3, message: "Minimum 3 characters" }
                                        })}
                                        className={`w-full bg-bg-primary border ${errors.displayName ? 'border-red-500' : 'border-border-color'} text-text-main rounded-2xl py-4 pl-12 pr-4 focus:border-accent focus:outline-none transition-all font-medium text-sm`}
                                    />
                                </div>
                                {errors.displayName && (
                                    <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1">
                                        <AlertCircle size={12} /> {errors.displayName.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2 opacity-60">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">Email Address (Read Only)</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full bg-bg-primary border border-border-color text-text-muted rounded-2xl py-4 px-6 text-sm font-medium cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-4 bg-bg-primary border border-border-color text-text-main rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-red-500/5 hover:text-red-500 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-4 bg-accent text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">Updating...</span>
                                ) : (
                                    <><Save size={16} /> Save Changes</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserEditProfile;