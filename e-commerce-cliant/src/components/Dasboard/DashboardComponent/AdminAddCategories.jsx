import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const AdminAddCategories = () => {
    const axiosInstance = useAxios()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
       
        const imageFile = data.photoURL[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMG}`,
            formData
        );

        
        const imageUrl = response.data.data.url;
       


        const category = {
            category: data.categoryname,
            photo: imageUrl
        }
        

        const result = await axiosInstance.post('/category',category)
        
        if(result.data.acknowledged === true){
            toast.success('Category is submited')
        }

    };

    return (
        <div className="max-w-3xl mx-auto bg-bg-primary p-8 rounded-3xl shadow-lg border border-border-color">

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-black text-text-main tracking-tight">
                    Add New Category
                </h2>
                <p className="text-sm text-text-muted mt-1">
                    Create and manage product categories for your store
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">


               
                <div>
                    <label className="block text-sm font-bold text-text-main mb-2">
                        Category Name
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Electronics"
                        {...register("categoryname", {
                            required: "Category name is required",
                        })}
                        className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-color focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                    />
                    {errors.categoryName && (
                        <p className="text-danger text-xs mt-1">
                            {errors.categoryName.message}
                        </p>
                    )}
                </div>

                {/* Category Image */}
                <div>
                    <label className="block text-sm font-bold text-text-main mb-2">
                        Category Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("photoURL", {
                            required: "Category image is required",
                        })}
                        className="w-full text-sm text-text-muted
              file:mr-4 file:py-2.5 file:px-5
              file:rounded-xl file:border-0
              file:bg-accent file:text-white
              file:font-bold hover:file:bg-accent-hover transition-all
            "
                    />
                    {errors.image && (
                        <p className="text-danger text-xs mt-1">
                            {errors.image.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-2xl bg-accent text-white font-black text-sm hover:bg-accent-hover transition-all shadow-lg shadow-accent/20"
                    >
                        Add Category
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminAddCategories;
