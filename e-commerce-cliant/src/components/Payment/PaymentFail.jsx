import React from 'react';
import { useNavigate } from 'react-router';

const PaymentFail = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-bg-primary rounded-3xl p-8 border border-border-color text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl text-danger font-bold">!</span>
                </div>
                <h2 className="text-2xl font-bold text-text-main mb-2">Payment Failed</h2>
                <p className="text-text-muted mb-8">Something went wrong while processing your payment.</p>

                <button
                    onClick={() => navigate('/')}
                    className="w-full py-4 bg-text-main text-bg-primary rounded-xl font-bold"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default PaymentFail;