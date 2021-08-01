import React from "react";
// import AuthRoute from "./router/AuthRoute";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "views/Component/Navbar";
import store from "store/configStore";
import { Provider } from "react-redux";

const App = () => {

  return (
    <React.Fragment>
      <Provider store={store}>
        <Navbar/>
      </Provider>
    </React.Fragment>
    
    /* <Router>
        <Switch>
            <AuthRoute path="/auth" component={Login} />
            <Redirect to="/auth" />
        </Switch>
    </Router> */
  );
};

export default App;
