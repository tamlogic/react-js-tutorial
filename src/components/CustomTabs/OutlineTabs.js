import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import classNames from "classnames";

import AppColor from "../../utilities/AppColor";
import AppButton from "../CustomButtons/AppButton";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2} className="h-auto overflow-auto">
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 17,
    boxShadow: "none",
    border: "none",
  },
  activeTab: {
    borderBottom: `2px solid ${AppColor.yellow}`,
    fontWeight: "bold",
    color: AppColor.yellow,
  },
  tabs: {
    minHeight: 43,
    "& :last-child": {
      margin: 0,
    },
  },
  tab: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: AppColor.white,
    fontSize: 12,
    textTransform: "unset",
    fontFamily: "Popin, san-serif",
    minHeight: 43,
  },
  buttonContainer: {
    marginTop: -17,
    display: "flex",
    justifyContent: "space-around",
    paddingLeft: 25,
    paddingRight: 25,
    "& :last-child": {
      margin: "0 !important",
    },
  },
}));

const AppTabs = (props) => {
  const { tabs, bottomActions, style, activeTab, onChangeTab } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    onChangeTab ? onChangeTab(newValue) : setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    onChangeTab ? onChangeTab(index) : setValue(index);
  };

  useEffect(() => {
    setValue(activeTab);
  }, [activeTab]);

  const StyledTabs = withStyles({
    indicator: {
      display: "none",
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

  return (
    <div style={style}>
      <Paper className={classes.root}>
        <div
          style={{
            padding: "10px 23px",
            paddingBottom: 0,
          }}
        >
          <StyledTabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            variant="fullWidth"
            className={classes.tabs}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={classNames({
                  [classes.activeTab]: value === index,
                  [classes.tab]: true,
                })}
                label={tab.tabLabel}
                {...a11yProps(index)}
              />
            ))}
          </StyledTabs>
        </div>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {tabs.map((tab, index) => (
            <TabPanel
              key={index}
              value={value}
              index={index}
              dir={theme.direction}
            >
              {tab.tabContent}
            </TabPanel>
          ))}
        </SwipeableViews>
      </Paper>
      <div className={classes.buttonContainer}>
        {bottomActions.map((button, index) => (
          <AppButton
            key={index}
            label={button.label}
            fullWidth={button.fullWidth}
            style={button.style}
            buttonColor={button.buttonColor}
            onClick={button.onClick}
            rounder={button.rounder}
            disableElevation={button.disableElevation}
          />
        ))}
      </div>
    </div>
  );
};

AppTabs.propTypes = {
  activeTab: PropTypes.any,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabLabel: PropTypes.string.isRequired,
      tabContent: PropTypes.any.isRequired,
    })
  ),
  bottomActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      fullWidth: PropTypes.bool,
      buttonColor: PropTypes.oneOf(["yellow", "grey", "red"]),
      style: PropTypes.object,
      rounder: PropTypes.bool,
      disableElevation: PropTypes.bool,
      onClick: PropTypes.func,
    })
  ),
  style: PropTypes.object,
  onChangeTab: PropTypes.func,
};

AppTabs.defaultProps = {
  tabs: [],
  bottomActions: [],
  onClick: () => {},
};

export default AppTabs;
