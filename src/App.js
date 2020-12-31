import ErrorBoundary from "./Components/Commos/ErrorBoundary";
import './App.scss'
import '@fortawesome/fontawesome-free/css/all.css';
import { HRHome } from "./Pages/HRPage/HRHome";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Nav from "./Components/Commos/Nav";
import HRApprovalPage from "./Pages/HRPage/HRApprovalPage";
import { BKCHome } from "./Pages/BKCPage/BKCHome";
import { Home } from "./Pages/Home/Home";
import { useSelector } from "react-redux";
import { HistoryBooking } from "./Pages/HistoryBooking/HistoryBooking";
function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <div className="mt-2"></div>
          <Nav />
          <div className="mt-1 mb-1"></div>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/historybooking" roles={["Admin", "Employee"]}>
              <HistoryBooking />
            </PrivateRoute>
            <PrivateRoute path="/bookingcar" roles={["Admin", "Employee"]}>
              <BKCHome />
            </PrivateRoute>
            <PrivateRoute path="/hr-page" roles={["Admin"]}>
              <HRHome />
            </PrivateRoute>
            <PrivateRoute path="/process/:inforId" roles={["Admin"]}>
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
      if (r == employee.role) {
        isAuth = true;
        break;
      }
    }
  }
  if(!isAuth) console.log("Not have permission");
  return (
    <Route
      path={path}
      render={() => {
        return isAuth ? (children) : (<Redirect to="/" />)
      }}
    />
  );
}
