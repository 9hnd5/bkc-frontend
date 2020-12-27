import ErrorBoundary from "./Components/Commos/ErrorBoundary";
import './App.scss'
import {HRHome} from "./Pages/HRPage/HRHome";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Nav from "./Components/Commos/Nav";
import HRApprovalPage from "./Pages/HRPage/HRApprovalPage";
import { BKCHome } from "./Pages/BKCPage/BKCHome";
import { LoginPage } from "./Pages/CommonsPage/LoginPage";
function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <Nav />
          <div className="mt-1 mb-1"></div>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/bookingcar" component={BKCHome} />
            <Route path="/hr-page" component={HRHome} />
            <Route path="/process/:id" component={HRApprovalPage} />
          </Switch>
        </Router>
      </ErrorBoundary>
    </div>
  );
}
export default App;
