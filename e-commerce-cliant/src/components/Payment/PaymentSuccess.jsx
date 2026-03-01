import React from 'react';
import { useNavigate, useParams } from 'react-router';

const PaymentSuccess = () => {
    const { tranId } = useParams()
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-bg-primary rounded-3xl p-8 border border-border-color shadow-2xl text-center">

              
                <div className="w-20 h-20 bg-accent-soft rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h2 className="text-3xl font-bold text-text-main mb-2">Payment Successful!</h2>
                <p className="text-text-muted mb-8">
                    Your order has been confirmed. Thank you for shopping with us.
                </p>

                <div className="bg-bg-secondary p-4 rounded-2xl mb-8 border border-border-color">
                    <p className="text-xs text-text-muted uppercase tracking-widest font-bold mb-1">Transaction ID</p>
                    <p className="text-text-main font-mono font-bold">{tranId}</p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/dashboard/user/my-orders')}
                        className="w-full py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-[var(--color-accent-soft)]"
                    >
                        View My Orders
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-transparent text-text-main font-semibold hover:underline"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;