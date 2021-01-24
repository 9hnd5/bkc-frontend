import ErrorBoundary from "./Components/Commons/ErrorBoundary";
import './App.scss'
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { NavBar } from "./Components/Commons/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { NotificationContainer } from 'react-notifications';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-notifications/lib/notifications.css';
import { BookingRequest } from "./Pages/BookingRequest";
import { useEffect } from "react";
import { requestAuthenticated } from "./ActionCreators/appActionCreator";
import { BookingHistory } from "./Pages/BookingHistory";
import { Admin } from "./Pages/Admin";
import { BookingApproval } from "./Pages/BookingApproval";
import { CarManagement } from "./Pages/CarManagement";
import { DriverManagement } from "./Pages/DriverManagement";
export const history = require("history").createBrowserHistory();
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestAuthenticated("hoe.ph@greenfeed.com.vn"));
  });
  return (
    <div className="App">
      <ErrorBoundary>
        <NotificationContainer />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Router history={history}>
          {/* <div className="mt-5"></div> */}
          <NavBar />
          <div className="mt-1 mb-1"></div>
          <Switch>
            <Route path="/booking-request/:action?/:ticketId?" exact component={BookingRequest} />
            <Route path="/booking-history" component={BookingHistory} />
            <Route path="/admin" component={Admin} />
            <Route path="/booking-approval/:ticketId" component={BookingApproval} />
            <Route path="/car-management/" component={CarManagement} />
            <Route path="/driver-management/" component={DriverManagement} />
            {/* <PrivateRoute path="/history-booking" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.MEMBER]}>

            </PrivateRoute>
            <PrivateRoute path="/request-booking/:action?" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.MEMBER]}>

            </PrivateRoute>
            <PrivateRoute path="/admin" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>

            </PrivateRoute>
            <PrivateRoute path="/:action/:bookingInforId" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>

            </PrivateRoute> */}
          </Switch>
        </Router>
      </ErrorBoundary>
    </div>
  );
}
export default App;

// function PrivateRoute({ children, ...rest }) {
//   const employee = useSelector(state => state.app.employee);
//   const { roles, path } = rest;
//   let isAuth = null;
//   if (!roles.length) {
//     isAuth = false;
//   }
//   else {
//     for (let r of roles) {
//       if (r === employee.role) {
//         isAuth = true;
//         break;
//       }
//     }
//   }
//   if (!isAuth) console.log("Not have permission");
//   return (
//     <Route
//       path={path}
//       render={() => {
//         return isAuth ? (children) : (<Redirect to="/" />)
//       }}
//     />
//   );
// }
