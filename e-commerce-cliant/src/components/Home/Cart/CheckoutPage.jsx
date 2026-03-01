import { useContext } from "react";
import { CartContext } from "../../../providers/CartProvider";
import { AuthContex } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { cart,  setCart } = useContext(CartContext);
  const { user } = useContext(AuthContex);
  const axiosSecure = useAxiosSecure();
  
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }


    const orderInfo = {
      email: user.email,

      productId: cart.map(item => item._id).join(","),

      productName: cart.map(item => item.name).join(" | "),

      productCategory: cart.map(item => item.category).join(","),

      price: total,
      quantity: cart.length,

      photo: cart[0].photo,
      totalAmount: total,

      status: "pending",
    };


    try {
      const response = await axiosSecure.post("/orders/create", orderInfo);
      

      if (response.data?.gateWayPageUrl) {
        window.location.replace(response.data.gateWayPageUrl);
        setCart([])
      }

    } catch (error) {
      
      toast.error("Order failed, try again");
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary py-12 px-4">
      <div className="max-w-5xl mx-auto">

        <header className="mb-12">
          <h1 className="text-3xl font-semibold text-text-main">
            Checkout
          </h1>
          <p className="text-text-muted mt-2">
            Review your items and complete your order.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-7 space-y-6">

            <div className="bg-bg-primary p-6 rounded-2xl border border-border-color shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                Shipping Information
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between border-b border-border-color/50 py-2">
                  <span className="text-text-muted">Name</span>
                  <span className="font-medium text-text-main">
                    {user?.displayName || "Guest"}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-text-muted">Email</span>
                  <span className="font-medium text-text-main">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>

            {/* CART ITEMS */}
            <div className="bg-bg-primary rounded-2xl border border-border-color shadow-sm overflow-hidden">
              <div className="p-5 border-b border-border-color flex justify-between items-center bg-bg-secondary/30">
                <span className="font-semibold text-text-main">
                  Your Bag
                </span>
                <span className="text-xs bg-accent-soft text-accent px-3 py-1 rounded-full font-bold">
                  {cart.length} Items
                </span>
              </div>

              <div className="divide-y divide-border-color/40">
                {cart.map(item => (
                  <div key={item._id} className="p-6 flex items-center gap-4">
                    <div className="h-20 w-20 rounded-xl bg-bg-secondary overflow-hidden border border-border-color">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-text-main">
                        {item.name}
                      </h4>
                      <p className="text-sm text-text-muted">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="font-semibold text-text-main">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="lg:col-span-5">
            <div className="bg-bg-primary p-8 rounded-3xl border border-border-color shadow-xl sticky top-8">

              <h3 className="text-lg font-semibold text-text-main mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="font-medium text-text-main">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-muted">Shipping</span>
                  <span className="font-medium text-text-main">
                    ${shipping.toFixed(2)}
                  </span>
                </div>

                <div className="pt-4 border-t border-border-color flex justify-between">
                  <span className="font-semibold text-text-main">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-text-main">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => { handleBuyNow() }}

                className="w-full mt-8 bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-semibold transition-all shadow-lg shadow-accent-soft active:scale-95"
              >
                Place Order
              </button>

              <p className="mt-6 text-xs text-center text-text-muted">
                By placing your order, you agree to our <br />
                <span className="underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                &{" "}
                <span className="underline cursor-pointer">
                  Privacy Policy
                </span>
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
