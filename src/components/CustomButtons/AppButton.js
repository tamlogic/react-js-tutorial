import { Button,  ThemeProvider } from "@material-ui/core";
import React from "react";
import classNames from "classnames";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";
import AppColor from "utils/AppColor";

const theme = createTheme ({
  overrides: {
    MuiButton: {
      contained: {
        '&.Mui': {
          disabled: {
            opacity: 0.6,
            pointerEvents: 'none'
          }
        }
      }
    },
  },
});

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: AppColor.orange,
    color: AppColor.white,
    textTransform: "capitalize",
    borderRadius: 5,
    fontSize: 13,
    fontWeight: "600",
    minHeight: 38
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    color: AppColor.orange,
    border: `2px solid ${AppColor.orange}`
  },
  disabled: {
    opacity: 0.7,
    pointerEvents: 'none',
    color: '#343a40!important'
  }
}));

const AppButton = (props) => {
  const {
    label,
    fullWidth,
    buttonColor,
    style,
    disableElevation,
    buttonProps,
    onClick,
    disabled,
    type,
    isLoading,
    children,
    mode,
    startIcon,
    endIcon,
    className
  } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        fullWidth={fullWidth}
        className={classNames({
          [classes.button]: true,
          [classes.buttonOutline]: mode === 'outlined',
          [className]: true
        })}
        style={{
          ...buttonColor && mode === 'contained' && {
            backgroundColor: buttonColor
          },
          ...buttonColor && mode === 'outlined' && {
            backgroundColor: 'transparent',
            borderColor: buttonColor,
            color: buttonColor
          },
          ...style
        }}
        disableElevation={disableElevation}
        onClick={onClick}
        disabled={disabled}
        classes={{
          disabled: classes.disabled
        }}
        type={type}
        startIcon={startIcon}
        endIcon={endIcon}
        {...buttonProps}
      >
        {isLoading
          ? <Spinner color="primary" style={{
            width: '1rem',
            height: '1rem'
          }} />
          : children
            ? (<React.Fragment>
              {children}
              <span className="ml-2">
                {t(label)}
              </span>
            </React.Fragment>)
            : t(label)}
      </Button>
    </ThemeProvider>
  );
};

AppButton.propTypes = {
  label: PropTypes.any,
  fullWidth: PropTypes.bool,
  buttonColor: PropTypes.string,
  disableElevation: PropTypes.bool,
  style: PropTypes.object,
  buttonProps: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "reset", "submit"]),
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  mode: PropTypes.oneOf(['contained', 'outlined']),
  startIcon: PropTypes.any,
  className: PropTypes.any,
  endIcon: PropTypes.any
};

AppButton.defaultProps = {
  buttonColor: "orange",
  mode: 'contained'
};

export default AppButton;
