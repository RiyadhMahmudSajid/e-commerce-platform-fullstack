import { createBrowserRouter } from "react-router";
import RootLayout from "../components/Layouts/Root/RootLayout";
import HomePage from "../components/Home/HomePages/HomePage";
import AuthLayOut from "../components/Layouts/Auth/AuthLayOut";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import DashboardLayout from "../components/Layouts/Dashbord/DashboardLayout";
import DashboardSidebar from "../components/Dasboard/DashboardSideBar/DashboardSideBar";
import AdminOverview from "../components/Dasboard/DashboardComponent/AdminOverview";
import AdminAddCategories from "../components/Dasboard/DashboardComponent/AdminAddCategories";
import AdminAddProduct from "../components/Dasboard/DashboardComponent/AdminAddProduct";
import Category from "../components/Home/singlecategory/category";
import ManageProduct from "../components/Dasboard/DashboardComponent/ManageProduct";
import AllProducts from "../components/Home/HomeComponents/AllProduct";
import SearchResults from "../components/pages/SearchResults";
import ProductDescrip from "../components/Home/HomeComponents/ProductDescrip";
import DashboardHome from "../components/Dasboard/DashboardHome/DashboardHome";
import CartPage from "../components/Home/Cart/CartPage";
import CheckoutPage from "../components/Home/Cart/CheckoutPage";
import UserOrder from "../components/Dasboard/userDashboard/UserOrder";
import UserWhishlist from "../components/Dasboard/userDashboard/UserWhishlist";
import AdminOrderView from "../components/Dasboard/DashboardComponent/AdminOrderView";
import AdminUserView from "../components/Dasboard/DashboardComponent/AdminUserView";
import PaymentSuccess from "../components/Payment/PaymentSuccess";
import PaymentFail from "../components/Payment/PaymentFail";
import UserReview from "../components/Dasboard/userDashboard/UserReview";
import AdminSupport from "../components/Dasboard/DashboardComponent/AdminSupport";
import UserSupport from "../components/Dasboard/userDashboard/UserSupport";
import Deals from "../components/Home/HomeComponents/Deals";
import LearnMore from "../components/Home/HomeComponents/LearnMore";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../components/NotFound/NotFound";
import UserProfile from "../components/Dasboard/userDashboard/UserProfile";





export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage
      },
      {
        path: 'category/:category',
        Component: Category
      },
      {
        path: '/products',
        Component: AllProducts
      },
      {
        path: '/search',
        Component: SearchResults
      },
      {
        path: `/product/:id`,
        Component: ProductDescrip,
      },
      {
        path: "/cart",

        Component: CartPage
      },
      {
        path: "/checkout",
        element: <PrivateRoute><CheckoutPage></CheckoutPage></PrivateRoute>
      },
      {
        path: '/payment/success/:tranId',
        element:  <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>
      },

      {
        path: '/payment/fail',
        Component: PaymentFail
      },
      {
        path: '/deals',
        Component: Deals
      },
      {
        path: '/learnmore',
        Component: LearnMore
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayOut,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  },

  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashboardHome

      },
      {
        path: "/dashboard/admin/overview",
        Component: AdminOverview,
      },
      {
        path: '/dashboard/add-categories',
        Component: AdminAddCategories
      },
      {
        path: '/dashboard/add-product',
        Component: AdminAddProduct
      },
      {
        path: '/dashboard/manage-products',
        Component: ManageProduct
      },
      {
        path: '/dashboard/user/profile',
        Component:UserProfile
      },
      {
        path: '/dashboard/user/my-orders',
        Component: UserOrder
      },
      {
        path: '/dashboard/user/wishlist',
        Component: UserWhishlist
      },
      {
        path: '/dashboard/orders',
        Component: AdminOrderView
      },
      {
        path: '/dashboard/users',
        Component: AdminUserView
      },
      {
        path: '/dashboard/user/reviews',
        Component: UserReview
      },
      {
        path: '/dashboard/support',
        Component: AdminSupport
      },
      {
        path: '/dashboard/user/support',
        Component: UserSupport
      }
    ]
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  }



]);