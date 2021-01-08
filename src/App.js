import ErrorBoundary from "./Components/Commos/ErrorBoundary";
import './App.scss'
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { HRHome } from "./Pages/HRPage/HRHome";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { NavBar } from "./Components/Commos/NavBar";
import HRApprovalPage from "./Pages/HRPage/HRApprovalPage";
import { BKCHome } from "./Pages/BKCPage/BKCHome";
import { Home } from "./Pages/Home/Home";
import { useSelector } from "react-redux";
import { HistoryBooking } from "./Pages/HistoryBooking/HistoryBooking";
import { NotificationContainer } from 'react-notifications';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-notifications/lib/notifications.css';
import { ROLE } from "./Constants/appConstants";
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
        <Router>
          {/* <div className="mt-5"></div> */}
          <NavBar />
          <div className="mt-1 mb-1"></div>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/history-booking" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.MEMBER]}>
              <HistoryBooking />
            </PrivateRoute>
            <PrivateRoute path="/request-booking" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.MEMBER]}>
              <BKCHome />
            </PrivateRoute>
            <PrivateRoute path="/admin" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
              <HRHome />
            </PrivateRoute>
            <PrivateRoute path="/process/:inforId" roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
              <HRApprovalPage />
            </PrivateRoute>
          </Switch>
        </Router>
      </ErrorBoundary>
    </div>
  );
}
export default App;

function PrivateRoute({ children, ...rest }) {
  const employee = useSelector(state => state.app.employee);
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
