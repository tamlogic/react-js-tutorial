import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


import { useTranslation } from "react-i18next";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const styles = {
  address: {
    display: 'flex',
    flex: '1 0 100%',
    alignItems: 'center',
    '& i': {
      fontSize: '1rem',
      marginRight: '0.5rem'
    }
  }
}

const useStyles = makeStyles(styles);

export default function PublicFooter(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();


  return (
    <footer className="footer-top-area pt-100">
      <div className="container">
        <div className="row footer-wrapper">
          <div className="col-lg-6 col-sm-12 col-md-6">
            <div className="single-widget">
              <a className="brand">
                <img src={require('assets/img/theme/footer-logo.png')} alt="footer-logo" />
              </a>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  incididunt  labore et dolore magna aliqua. Quis ipsum suspendisse ultrices.Risus commodo.</p>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 col-md-6">
            <div className="single-widget">
              <h3>Address</h3>
              <ul>
                <li className={classes.address}>
                  <i className="fa fa-map-marker"></i>
                  <a>25 Street, west Cruch, Newzeland</a>
								</li>
                <li className={classes.address}>
                  <i className="fa fa-phone"></i>
                  <a href="tel:+25462755">+25462755, 265497466</a>
                </li>
                <li className={classes.address}>
                  <i className="fa fa-envelope"></i>
                  <a href="mailto:giano@gmail.com">giano@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div>
              <p>Copyright © Giano. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

PublicFooter.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
