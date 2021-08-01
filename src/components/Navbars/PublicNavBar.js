import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import './index.scss';
import classNames from "classnames";

import { useHistory, Link } from "react-router-dom";
import Logo from "assets/img/theme/logo.png";
import { Box, Button, ClickAwayListener, Grow, Menu, MenuItem, MenuList, Paper, withStyles } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { ExitToApp, Gavel, Person } from "@material-ui/icons";
import Poppers from "@material-ui/core/Popper";
import { useDispatch } from "react-redux";
import { logout } from "store/slices/auth";
import { useTranslation } from "react-i18next";
import InputSearch from "components/Input/InputSearch";

const styles = {
  header: {
    background: '#171515',
    color: '#fff',
    padding: '0.5rem 1.5rem'
  },
  navBar: {
    fontSize: '2rem',
    position: 'relative'
  },
  navLogo: {
    padding: '0',
    cursor: 'pointer'
  },
  navInfo: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    cursor: 'pointer',
    '& a:hover': {
      color: '#d87f9c',
      fontWeight: 700
    }
  },
  navSearch: {
    flex: 1,
    padding: '0 2rem'
  },
  headerTop: {
    display: 'flex',
    flex: '1 0 0px',
    justifyContent: 'space-between'
  },
  headerBottom: {
    display: 'flex',
    flex: '1 0 0px',
    alignItems: 'center'
  },
  dropdownItem: {
    '&:hover': {
      background: '#9c3657c9',
      color: '#fff'
    }
  }
}

const useStyles = makeStyles(styles);

export default function PublicNavBar(props) {
  const {
    userInfo,
    loggedIn,
    searchKey,
    onSearch,
    onSelectCategory,
    onSelectBrand,
    onSelectPrice
  } = props;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [scrollTop, setScrollTop] = useState(window.pageYOffset);
  const [isShowSearch, setIsShowSearch] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollBar);

    return () => {
      window.removeEventListener("scroll", handleScrollBar);
    };
  }, [scrollTop]);

  const handleScrollBar = (e) => {
    const elementScrollTop = e.srcElement.scrollingElement.scrollTop;
    if (elementScrollTop > scrollTop) {
      setIsShowSearch(false);
    } else {
      setIsShowSearch(true);
    }
    setScrollTop(elementScrollTop);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const handleCloseProfile = async () => {
    setOpenProfile(null);
  };

  const signOut = async () => {
    await dispatch(logout());
    history.push("/auth/login");
  };

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      width: '80%'
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  return (
    <AppBar className={classes.appBar}>
      <div className={`${classes.header} header-lg`}>
        <div id={'bar-header'} className={classes.navBar}>
          {/* <i className="fas fa-bars"></i> */}
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon fontSize="large" style={{ color: '#fff' }} />
          </Button>
        </div>
        <a className={classes.navLogo} onClick={() => history.push('/home')}>
          <img src={Logo} alt="Giano Logo" />
        </a>
        <div className={`widget subscribe ${classes.navSearch}`}>
          <InputSearch
            searchText={searchKey}
            onSearch={onSearch}
          />
        </div>
        <div className={classes.navInfo}>
          <Link to={"/products"} className="nav-link" style={{
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>Shop All Item</Link>
        </div>
        <div className={classes.navInfo}>
          {
            loggedIn ?
              (
                <div className={classes.manager}>
                  <div
                    color={"transparent"}
                    onClick={handleClickProfile}
                  >
                    <span style={{ padding: '.5rem 1rem' }}>{`${userInfo.firstName || ''} ${userInfo.lastName || ''}`}</span>
                    <Person className={classes.icons} />
                  </div>
                  <Poppers
                    open={Boolean(openProfile)}
                    anchorEl={openProfile}
                    transition
                    disablePortal
                    className={
                      classNames({ [classes.popperClose]: !openProfile })
                    }
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        id="profile-menu-list-grow"
                        style={{
                          transformOrigin:
                            placement === "bottom" ? "center top" : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleCloseProfile}>
                            <MenuList role="menu">
                              <MenuItem
                                onClick={() => history.push("/profile")}
                                className={classes.dropdownItem}
                              >
                                <Person className="mr-2" />
                                {t("title.profile")}
                              </MenuItem>
                              <MenuItem
                                onClick={() => history.push("/my-bidding")}
                                className={classes.dropdownItem}
                              >
                                <Gavel className="mr-2" />
                                {t("label.myBidding")}
                              </MenuItem>
                              <MenuItem
                                onClick={signOut}
                                className={classes.dropdownItem}
                              >
                                <ExitToApp className="mr-2" />
                                {t("label.logout")}
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Poppers>
                </div>
              )
              :
              (
                <Link to={"/auth/login"} className="nav-link">Sign In</Link>
              )
          }
        </div>
      </div>
      <div className={`${classes.header} header-sm`}>
        <div className={classes.headerTop}>
          <a className={classes.navLogo} onClick={() => history.push('/home')}>
            <img src={Logo} alt="Giano Logo" />
          </a>
          <div className={classes.navInfo}>
            {
              loggedIn ?
                (
                  <div className={classes.manager}>
                    <div
                      color={"transparent"}
                      onClick={handleClickProfile}
                    >
                      <span style={{ padding: '.5rem 1rem' }}>{`${userInfo.firstName || ''} ${userInfo.lastName || ''}`}</span>
                      <Person className={classes.icons} />
                    </div>
                    <Poppers
                      open={Boolean(openProfile)}
                      anchorEl={openProfile}
                      transition
                      disablePortal
                      className={
                        classNames({ [classes.popperClose]: !openProfile })
                      }
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          id="profile-menu-list-grow"
                          style={{
                            transformOrigin:
                              placement === "bottom" ? "center top" : "center bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleCloseProfile}>
                              <MenuList role="menu">
                                <MenuItem
                                  onClick={() => history.push("/profile")}
                                  className={classes.dropdownItem}
                                >
                                  <Person className="mr-2" />
                                  {t("title.profile")}
                                </MenuItem>
                                <MenuItem
                                  onClick={() => history.push("/my-bidding")}
                                  className={classes.dropdownItem}
                                >
                                  <Gavel className="mr-2" />
                                  {t("label.myBidding")}
                                </MenuItem>
                                <MenuItem
                                  onClick={signOut}
                                  className={classes.dropdownItem}
                                >
                                  <ExitToApp className="mr-2" />
                                  {t("label.logout")}
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Poppers>
                  </div>
                )
                :
                (
                  <Link to={"/auth/login"} className="nav-link">Sign In</Link>
                )
            }
          </div>
        </div>
        {
          isShowSearch && (
            <div className={`${classes.headerBottom} header-bottom`}>
              <div id={'bar-header'} className={classes.navBar}>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  <MenuIcon fontSize="large" style={{ color: '#fff' }} />
                </Button>
              </div>
              <div className={`widget subscribe ${classes.navSearch}`}>
                <InputSearch
                  searchText={searchKey}
                  onSearch={onSearch}
                />
              </div>
              <div className={classes.navInfo}>
                <Link to={"/products"} className="nav-link" style={{
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  <span className={'shopping-text'}>Shop All Item</span>
                  <span className={'shopping-icon'}><i className="fas fa-shopping-cart"></i></span>
                </Link>
              </div>
            </div>
          )
        }
      </div>
    </AppBar>
  );
}

PublicNavBar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
  userInfo: PropTypes.any,
  searchKey: PropTypes.any,
  onSearch: PropTypes.func,
  loggedIn: PropTypes.bool,
  onSelectCategory: PropTypes.func,
  onSelectBrand: PropTypes.func,
  onSelectPrice: PropTypes.func
};
