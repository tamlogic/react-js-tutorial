import {
  drawerWidth,
  drawerSmallWidth,
  transition,
  container,
} from "assets/jss/material-dashboard-react.js";

const appStyle = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
  },
  mainPanel: {
    [theme.breakpoints.down("sm")]: {
      width: `calc(100% - ${drawerSmallWidth}px)`
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    },
    overflow: "auto",
    paddingTop: "80px",
    position: "relative",
    float: "right",
    ...transition,
    height: "100vh",
    overflowScrolling: "touch",
    width: `calc(100% - ${drawerWidth}px)`
  },
  content: {
    marginTop: "70px",
    padding: "10px 10px",
    minHeight: "calc(100vh - 123px)",
  },
  container: {
    ...container,
    paddingLeft: 0,
    paddingRight: 0,
  },
  map: {
    marginTop: "70px",
  },
});

export default appStyle;
