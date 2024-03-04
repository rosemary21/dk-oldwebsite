import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminContextProvider } from "./contexts/AdminContext";
import { PropertyContextProvider } from "./contexts/PropertyContext";
import { StoreContextProvider } from "./contexts/StoreContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { loginStatesProp } from "./types/contexts";
import Spinner from "./utilities/Spinner";

const WallPainting = lazy(
  () => import("./pages/store/WallPainting/WallPainting")
);
const HandCrafted = lazy(() => import("./pages/store/HandCrafted/HandCrafted"));
const PaymentSuccessful = lazy(() => import("./modals/PaymentSuccessful"));
const Orders = lazy(() => import("./pages/store/Orders/Orders"));
const CaseStudyPage = lazy(() => import("./pages/store/CaseStudy/CaseStudy"));
const DetailsPage = lazy(() => import("./pages/store/DetailsPage/DetailsPage"));
const Customise = lazy(() => import("./pages/store/Customise/Customise"));
const Kids = lazy(() => import("./pages/store/Kids/Kids"));
const AllBrands = lazy(() => import("./pages/store/AllBrands/AllBrands"));
const FashionWomen = lazy(
  () => import("./pages/store/Fashion(Women)/Fashion(Women)")
);
const FashionMen = lazy(() => import("./pages/store/Fashion(Men)/FashionMen"));
const CreateAccount = lazy(
  () => import("./pages/general/CreateAccount/CreateAccount")
);
const PropertyCheckout = lazy(
  () => import("./pages/property/PropertyCheckout/PropertyCheckout")
);
const PropertyDetails = lazy(
  () => import("./pages/property/PropertyDetails/PropertyDetails")
);
const Shortlets = lazy(() => import("./pages/property/Shortlets/Shortlets"));
const Apartments = lazy(
  () => import("./pages/property/Apaprtments/Apartments")
);
const Lands = lazy(() => import("./pages/property/PropertyLands/Lands"));
const PropertyHome = lazy(() => import("./pages/property/PropertyHome/Home"));
const Software = lazy(() => import("./pages/store/Software/Software"));
const AboutUs = lazy(() => import("./pages/general/AboutUs/AboutUs"));
const ArtCraft = lazy(() => import("./pages/store/ArtCraft/ArtCraft"));
const ContactUs = lazy(() => import("./pages/general/ContactUs/ContactUs"));
const Signup = lazy(() => import("./pages/general/SignUp/Signup"));
const Checkout = lazy(() => import("./pages/general/Checkout/Checkout"));
const Settings = lazy(() => import("./pages/admin/Settings/Settings"));
const Receipts = lazy(() => import("./pages/admin/Receipts/Receipts"));
const AdminStock = lazy(() => import("./pages/admin/Stock/Stock"));
const AdminCustomers = lazy(() => import("./pages/admin/Customers/Customers"));
const ProductCategory = lazy(
  () => import("./pages/admin/Products/ProductCategory")
);
const ProductDescription = lazy(
  () => import("./pages/admin/Products/ProductDescription")
);
const Dashboard = lazy(() => import("./pages/admin/Dashboard/dashboard"));
const Login = lazy(() => import("./pages/admin/Login/login"));
const Home = lazy(() => import("./pages/general/Home/Home"));

export default function App() {
  // ** States for staff login
  const [loginStates, setLoginStates] = useLocalStorage<loginStatesProp>(
    "loginStates",
    {
      isLoginSuccessful: false,
      isLoginFailed: false,
      user: "",
    }
  );
  const user = loginStates.user;

  return (
    <BrowserRouter>
      <AdminContextProvider>
        <StoreContextProvider>
          <PropertyContextProvider>
            <Routes>
              {/* ============= GENERAL ROUTES ============== */}
              <Route
                path="/"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <Home />
                  </Suspense>
                }
              />

              <Route
                path="/checkout"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <Checkout />
                  </Suspense>
                }
              />

              <Route
                path="/property-checkout"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <PropertyCheckout />
                  </Suspense>
                }
              />

              <Route
                path="/signup"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <Signup />
                  </Suspense>
                }
              />

              <Route
                path="/contact-us"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <ContactUs />
                  </Suspense>
                }
              />

              <Route
                path="/about-us"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <AboutUs />
                  </Suspense>
                }
              />

              <Route
                path="/create-account"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <CreateAccount />
                  </Suspense>
                }
              />

              <Route
                path="/payment-successful"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <PaymentSuccessful />
                  </Suspense>
                }
              />

              {/* ================ STORE ROUTES ================ */}
              <Route
                path="/fashion"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <FashionMen />
                  </Suspense>
                }
              />

              <Route
                path="/women"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <FashionWomen />
                  </Suspense>
                }
              />

              <Route
                path="/kids"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <Kids />
                  </Suspense>
                }
              />

              <Route
                path="/all-brands"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <AllBrands />
                  </Suspense>
                }
              />

              <Route
                path="/art-craft"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <ArtCraft />
                  </Suspense>
                }
              />

              <Route
                path="/wall-painting"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <WallPainting />
                  </Suspense>
                }
              />

              <Route
                path="/hand-craft"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <HandCrafted />
                  </Suspense>
                }
              />

              <Route
                path="/details-page"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <DetailsPage />
                  </Suspense>
                }
              />

              <Route
                path="/customise"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <Customise />
                  </Suspense>
                }
              />

              <Route
                path="/software"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <Software />
                  </Suspense>
                }
              />

              <Route
                path="/caseStudy-page"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <CaseStudyPage />
                  </Suspense>
                }
              />

              <Route
                path="/order"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <Orders />
                  </Suspense>
                }
              />

              {/* ================ PROPERTY ROUTES ================ */}
              <Route
                path="/property-home"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <PropertyHome />
                  </Suspense>
                }
              />

              <Route
                path="/property-lands"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <Lands />
                  </Suspense>
                }
              />

              <Route
                path="/property-apartments"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <Apartments />
                  </Suspense>
                }
              />

              <Route
                path="/property-shortlets"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <Shortlets />
                  </Suspense>
                }
              />

              <Route
                path="/property-details"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <PropertyDetails />
                  </Suspense>
                }
              />

              {/* ================ ADMIN ROUTES ================ */}
              <Route
                path="/admin-login"
                element={
                  <Suspense fallback={Spinner({ animationType: "border" })}>
                    <Login
                      loginStates={loginStates}
                      setLoginStates={setLoginStates}
                    />
                  </Suspense>
                }
              />

              <Route
                path="/admin-dashboard"
                element={
                  user ? (
                    <Suspense fallback={Spinner({ animationType: "border" })}>
                      <Dashboard />
                    </Suspense>
                  ) : (
                    <Navigate to="/admin-login" />
                  )
                }
              />

              <Route
                path="/prod-description"
                element={
                  user ? (
                    <Suspense fallback={Spinner({ animationType: "border" })}>
                      <ProductDescription />
                    </Suspense>
                  ) : (
                    <Navigate to="/admin-login" />
                  )
                }
              />

              <Route
                path="/prod-category"
                element={
                  user ? (
                    <Suspense fallback={Spinner({ animationType: "border" })}>
                      <ProductCategory />
                    </Suspense>
                  ) : (
                    <Navigate to="/admin-login" />
                  )
                }
              />

              <Route
                path="/admin-customers"
                element={
                  user ? (
                    <Suspense fallback={Spinner({ animationType: "border" })}>
                      <AdminCustomers />
                    </Suspense>
                  ) : (
                    <Navigate to="/admin-login" />
                  )
                }
              />

              <Route
                path="/admin-stock"
                element={
                  user ? (
                    <Suspense fallback={Spinner({ animationType: "border" })}>
                      <AdminStock />
                    </Suspense>
                  ) : (
                    <Navigate to="/admin-login" />
                  )
                }
              />

              <Route
                path="/admin-receipts"
                element={
                  user ? (
                    <Suspense fallback={Spinner({ animationType: "border" })}>
                      <Receipts />
                    </Suspense>
                  ) : (
                    <Navigate to="/admin-login" />
                  )
                }
              />

              <Route
                path="/admin-settings"
                element={
                  user ? (
                    <Suspense fallback={Spinner({ animationType: "border" })}>
                      <Settings />
                    </Suspense>
                  ) : (
                    <Navigate to="/admin-login" />
                  )
                }
              />
            </Routes>
          </PropertyContextProvider>
        </StoreContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  );
}
