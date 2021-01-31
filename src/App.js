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
import { TicketRequest } from "./Pages/TicketRequest";
import { useEffect } from "react";
import { TicketHistory } from "./Pages/TicketHistory";
import { TicketManagement } from "./Pages/TicketManagement";
import { TicketHandle } from "./Pages/TicketHandle";
import { CarManagement } from "./Pages/CarManagement";
import { DriverManagement } from "./Pages/DriverManagement";
import { ROLE } from "./Constants/CommonsConstants";
export const history = require("history").createBrowserHistory();
function App() {
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
            <PrivateRoute path="/ticket-request/:action?/:ticketId?" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.MEMBER]}>
              <TicketRequest />
            </PrivateRoute>

            <PrivateRoute path="/ticket-history" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.MEMBER]}>
              <TicketHistory />
            </PrivateRoute>

            <PrivateRoute path="/ticket-management" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
              <TicketManagement />
            </PrivateRoute>

            <PrivateRoute path="/booking-approval/:ticketId" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
              <TicketHandle />
            </PrivateRoute>

            <PrivateRoute path="/car-management" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
              <CarManagement />
            </PrivateRoute>

            <PrivateRoute path="/driver-management" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
              <DriverManagement />
            </PrivateRoute>

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

function PrivateRoute({ children, ...rest }) {
  const employee = useSelector(state => state.appReducer.employee);
  const { roles, path } = rest;
  let isAuth = null;
  if (!roles.length) {
    isAuth = false;
  }
  else {
    for (let r of roles) {
      if (r === employee.role) {
        isAuth = true;
        break;
      }
    }
  }
  if (!isAuth) console.log("Not have permission");
  return (
    <Route
      path={path}
      render={() => {
        return isAuth ? (children) : (<Redirect to="/" />)
      }}
    />
  );
}
