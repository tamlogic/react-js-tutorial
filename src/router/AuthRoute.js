import { Route } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component path={rest.path} {...props} />;
      }}
    />
  );
};

AuthRoute.propTypes = {
  component: PropTypes.any,
  path: PropTypes.any,
  location: PropTypes.object,
};

export default AuthRoute;
