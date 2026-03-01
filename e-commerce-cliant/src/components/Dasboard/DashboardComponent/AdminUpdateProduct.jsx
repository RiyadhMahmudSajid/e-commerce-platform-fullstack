import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, PackagePlus, DollarSign } from "lucide-react";
import { ModalContex } from "../../../providers/ModalProvider";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminUpdateProduct = ({ product, refreshData }) => {

    const axiosSecure = useAxiosSecure()
    const { setShowModal } = useContext(ModalContex);

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
        defaultValues: product
    });

    useEffect(() => {
        reset(product);
    }, [product, reset]);

    const onSubmit = async (data) => {
        try {
            let imageUrl = product.photo;


            if (data.photoURL && data.photoURL.length > 0 && data.photoURL[0] instanceof File) {
                const formData = new FormData();
                formData.append('image', data.photoURL[0]);
                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMG}`,
                    formData
                );
                imageUrl = response.data.data.url;
            }

            const updatedInfo = {
                ...data,
                price: parseFloat(data.price),
                photo: imageUrl,
                updatedAt: new Date().toISOString()
            };

            const result = await axiosSecure.patch(`/product/${product._id}`, updatedInfo);

            if (result.data.modifiedCount > 0 || result.data.acknowledged) {
                toast.success("Product Updated!");
                refreshData();
                setShowModal(false);
            }
        } catch (err) {
            
            toast.error("Failed to update product");
        }
    };

    return (
        <div className="relative bg-bg-primary w-full max-w-2xl mx-auto rounded-[2rem] shadow-2xl overflow-hidden border border-border-color">
            <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 p-2 hover:bg-bg-secondary rounded-full transition-colors text-text-muted">
                <X size={20} />
            </button>

            <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-accent/10 rounded-xl text-accent"><PackagePlus size={24} /></div>
                    <h2 className="text-xl font-black text-text-main uppercase tracking-tight">Edit <span className="text-accent">Product</span></h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <input {...register("name")} placeholder="Product Name" className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-color text-sm focus:outline-none focus:border-accent" />
                        <input {...register("category")} placeholder="Category" className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-color text-sm focus:outline-none focus:border-accent" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="relative">
                            <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input type="number" step="0.01" {...register("price")} className="w-full pl-8 pr-4 py-3 rounded-xl bg-bg-secondary border border-border-color text-sm focus:outline-none focus:border-accent" />
                        </div>
                        <input type="number" {...register("discount")} placeholder="Disc %" className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-color text-sm focus:outline-none focus:border-accent" />
                        <input type="number" step="0.1" {...register("rating")} placeholder="Rating" className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-color text-sm focus:outline-none focus:border-accent" />
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-bg-secondary/50 rounded-2xl border border-dashed border-border-color">
                        <img src={product.photo} className="w-12 h-12 rounded-lg object-cover" alt="current" />
                        <input type="file" {...register("photoURL")} className="text-xs text-text-muted" />
                    </div>

                    <textarea {...register("description")} rows="3" placeholder="Description" className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-color text-sm resize-none focus:outline-none focus:border-accent"></textarea>

                    <button disabled={isSubmitting} className="w-full py-4 bg-accent text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all">
                        {isSubmitting ? "Updating..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminUpdateProduct;