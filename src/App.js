import ErrorBoundary from "./Components/Commos/ErrorBoundary";
import './App.scss'
import HRHomePage from "./Pages/HRPage/HRHomePage";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Nav from "./Components/Commos/Nav";
import { useEffect } from "react";
import { fetchUserRequest } from "./ActionCreators/bkcActionCreators";
import { useDispatch } from "react-redux";
import HRApprovalPage from "./Pages/HRPage/HRApprovalPage";
import BKCHomePage from "./Pages/BKCPage/BKCHomePage";
import { LoginPage } from "./Pages/CommonsPage/LoginPage";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserRequest());
  })
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <Nav />
          <div className="mt-1 mb-1"></div>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/bookingcar" component={BKCHomePage}/>
            <Route path="/hr-page" component={HRHomePage} />
            <Route path="/process/:id" component={HRApprovalPage} />
          </Switch>
        </Router>
      </ErrorBoundary>
    </div>
  );
}
export default App;
