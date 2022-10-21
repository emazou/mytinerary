import HomePage from "./pages/HomePage";
import CitiesPage from "./pages/CitiesPage";
import NewCitiesPage from "./pages/NewCitiesPage";
import { Route, Routes } from "react-router-dom";
import WebsiteLayout from "./layouts/WebsiteLayout";
import ScrollToTop from "./components/ScrollToTop";
import UnderConstruction from "./pages/UnderConstruction";
import CityDetails from "./pages/CityDetails";
import EditCity from "./pages/EditCity";
import MyTineraries from "./pages/MyTineraries";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { useSelector, useDispatch } from "react-redux";
import NewItinerary from "./pages/NewItinerary";
import { useSignInTokenMutation } from "./features/usersAPI";
import { setUser } from "./features/loggedSlice";
import { useEffect } from 'react'
function App() {
  const logged = useSelector((state) => state.logged.loggedState);
  const user = useSelector((state) => state.logged.user);
  const dispatch = useDispatch();
  const role = user?.role;
  const [signInToken] = useSignInTokenMutation();
  async function verifyToken() {
    try {
      let res = await signInToken(localStorage.getItem("token"));
      if (res.data?.success) {
        dispatch(setUser(res.data?.response.user));
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      verifyToken();
    }
  }, []);
  return (
    <>
      <ScrollToTop />
      <WebsiteLayout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/cities" element={<CitiesPage />}></Route>
          <Route path="/cities/:id" element={<CityDetails />}></Route>
          <Route
            path="/newCities"
            element={role === "admin" ? <NewCitiesPage /> : <HomePage />}
          ></Route>
          <Route
            path="/editCities"
            element={role === "admin" ? <EditCity /> : <HomePage />}
          ></Route>
          <Route
            path="/mytineraries"
            element={logged ? <MyTineraries /> : <HomePage />}
          ></Route>
          <Route
            path="/profile"
            element={logged ? <Profile /> : <HomePage />}></Route>
          <Route
            path="/newitinerary/:id"
            element={logged ? <NewItinerary /> : <HomePage />}
          ></Route>
          <Route
            path="/auth/signin"
            element={!logged ? <SignIn /> : <HomePage />}
          ></Route>
          <Route
            path="/auth/signup"
            element={(!logged || role === "admin") && <SignUp role={role} />}
          ></Route>
          <Route path="*" element={<UnderConstruction />}></Route>
        </Routes>
      </WebsiteLayout>
    </>
  );
}

export default App;
