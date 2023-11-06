import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const SigninPage = lazy(() => import("../views/SigninPage"));
const UserManagement = lazy(() => import("../views/UserManagement"));
const VoucherManagement = lazy(() => import("../views/VoucherManagement"));
const VoucherCreate = lazy(() => import("../views/VoucherCreate"));
const AdsManagement = lazy(() => import("../views/AdsManagement"));
const AdsCreate = lazy(() => import("../views/AdsCreate"));
const ServiceManagement = lazy(() => import("../views/ServiceManagement"));
const ServiceCreate = lazy(() => import("../views/ServiceCreate"));
const SystemManagement = lazy(() => import("../views/SystemManagement"));
const Feedback = lazy(() => import("../views/Feedback"));
const Payment = lazy(() => import("../views/PaymentManagement"));

/*****Routes******/

const AppRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/UserManagement" /> },
      { path: "/UserManagement", exact: true, element: <UserManagement /> },
      { path: "/VoucherManagement", exact: true, element: <VoucherManagement /> },
      { path: "/VoucherManagement/create", exact: true, element: <VoucherCreate /> },
      { path: "/VoucherManagement/update/:id", exact: true, element: <VoucherCreate /> },
      { path: "/AdsManagement", exact: true, element: <AdsManagement /> },
      { path: "/AdsManagement/create", exact: true, element: <AdsCreate /> },
      { path: "/AdsManagement/update/:id", exact: true, element: <AdsCreate /> },
      { path: "/ServiceManagement", exact: true, element: <ServiceManagement /> },
      { path: "/ServiceManagement/create", exact: true, element: <ServiceCreate /> },
      { path: "/ServiceManagement/update/:id", exact: true, element: <ServiceCreate /> },
      { path: "/SystemManagement", exact: true, element: <SystemManagement /> },
      { path: "/Feedback", exact: true, element: <Feedback /> },
      { path: "/Payment", exact: true, element: <Payment /> },
    ],
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
];

export default AppRoutes;
