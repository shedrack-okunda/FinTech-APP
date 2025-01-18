import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Protected } from "./features/auth/component/Protected";
import { Logout } from "./features/auth/component/Logout";
import { NotFoundPage } from "./pages/NotFoundPage";
import {
  CardPage,
  DashboardPage,
  ForgotPasswordPage,
  InvoicePage,
  LoginPage,
  OtpVerificationPage,
  ResetPasswordPage,
  SignupPage,
  TransactionPage,
  WalletPage,
} from "./pages";
import { useSelector } from "react-redux";
import {
  SelectIsAuthChecked,
  SelectLoggedInUser,
} from "./features/auth/AuthSlice";
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { Layout } from "./layout/Layout";

export default function App() {
  const isAuthChecked = useSelector(SelectIsAuthChecked);
  const loggedInUser = useSelector(SelectLoggedInUser);

  useAuthCheck();

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:userId/:passwordResetToken"
          element={<ResetPasswordPage />}
        />
        <Route
          exact
          path="/logout"
          element={
            <Protected>
              <Logout />
            </Protected>
          }
        />

        {loggedInUser?.isAdmin ? (
          <>
            <Route
              path="/"
              element={
                <Protected>
                  <Layout />
                </Protected>
              }
            />
          </>
        ) : (
          <>
            <Route
              element={
                <Protected>
                  <Layout />
                </Protected>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionPage />} />
              <Route path="/cards" element={<CardPage />} />
              <Route path="/wallets" element={<WalletPage />} />
              <Route path="/invoices" element={<InvoicePage />} />
            </Route>
          </>
        )}

        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  return isAuthChecked ? <RouterProvider router={routes} /> : "";
}
