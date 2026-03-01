import React from 'react';

const Loading = ({ size = "md" }) => {

    const sizes = {
        sm: "w-6 h-6 border-2",
        md: "w-12 h-12 border-4",
        lg: "w-20 h-20 border-8"
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full space-y-4">

            <div className="relative">

                <div className={`${sizes[size]} border-primary rounded-full`}></div>


                <div className={`${sizes[size]} border-t-white  border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0`}></div>
            </div>


            <p className="text-text-secondary font-medium tracking-widest animate-pulse text-sm uppercase">
                Loading...
            </p>
        </div>
    );
};

export default Loading;