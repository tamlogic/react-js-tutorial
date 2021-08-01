import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useTranslation } from "react-i18next";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { IconButton, InputAdornment, ThemeProvider, createTheme } from "@material-ui/core";
import {
  Clear as ClearIcon,
  InsertInvitation as CalendarIcon,
} from "@material-ui/icons";
import AppColor from "utilities/AppColor";
import { Label } from "reactstrap";
import { getIn } from "formik";

const CustomDatePicker = (props) => {
  const {
    label,
    id,
    field,
    form,
    placeholder,
    disabled,
    style,
    className,
    shrink = false,
    custom,
    InputProps,
    onChange,
    required,
    mainColor = AppColor.mainColor
  } = props;

  const useStyles = makeStyles({
    input: {
      color: AppColor.orange,
      backgroundColor: AppColor.white,
      '& .MuiOutlinedInput-input': {
        padding: '10px 14px'
      },
      '& .MuiInputLabel-outlined': {
        transform: 'unset',
        position: 'inherit',
        color: '#000'
      },
      '& .MuiInputBase-root.Mui-disabled': {
        background: 'rgba(0, 0, 0, 0.1)',
        pointerEvents: 'none'
      },
      '& .MuiFormHelperText-contained': {
        margin: 0
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: mainColor
      }
    },
    customColor: {

    }
  });
  const classes = useStyles();

  const theme = createTheme ({
    overrides: {
      MuiPaper: {
        root: {
          '& .MuiPickersToolbar-toolbar': {
            backgroundColor: mainColor
          },
          '& .MuiPickersYear-root': {
            '&:focus': {
              color: mainColor,
            }
          },
          '& .MuiPickersYear-yearSelected': {
            color: mainColor,
            '&:hover': {
              color: mainColor,
            }
          },
          '& .MuiPickersMonth-root': {
            '&:focus': {
              color: mainColor,
            }
          },
          '& .MuiPickersMonth-monthSelected': {
            color: mainColor,
            '&:hover': {
              color: mainColor,
            }
          },
          '& .MuiPickersDay-daySelected': {
            backgroundColor: mainColor,
            '&:hover': {
              backgroundColor: mainColor
            }
          }
        }
      },
    },
  });

  const { name, value = '' } = field;
  const { errors, touched } = form;
  const { t } = useTranslation();

  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const showError = error && touch;

  let format = "yyyy/MM/DD";

  if (custom && custom.format) {
    format = custom.format;
  }

  const handleChangeInput = (event) => {
    let value;
    if (event !== "") {
      value = moment(event.toDate()).format(format);
    } else {
      value = event;
    }
    const changeEvent = {
      target: {
        name: name,
        value: value,
      },
    };
    field.onChange(changeEvent);

    onChange && onChange(value);
  };

  const renderLabel = (date) => {
    if (date && value !== "") {
      return date.format(format);
    } else {
      return "";
    }
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} className={`${className}`}>
      <ThemeProvider theme={theme}>
        {label && <Label className={classes.label} for={id || name}>{t(label)}{required && (<span style={{ color: AppColor.red }}>*</span>)}</Label>}
        <DatePicker
          error={showError}
          variant="inline"
          inputVariant="outlined"
          id={id}
          name={name}
          helperText={showError ? typeof error === "object"
            ? t(error.message, { value: error.value })
            : t(error)
            : ''}
          disabled={disabled}
          placeholder={placeholder}
          autoOk={true}
          style={{
            ...style,
            marginBottom: "1rem",
          }}
          fullWidth
          InputLabelProps={{
            shrink: shrink,
          }}
          value={value}
          className={classNames({ [className]: true, [classes.input]: true })}
          // {...field}
          {...custom}
          onChange={(event) => handleChangeInput(event)}
          format={format}
          labelFunc={renderLabel}
          InputProps={{
            ...InputProps,
            endAdornment:
              value && value !== "" ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChangeInput("");
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : (
                <InputAdornment position="end">
                  <IconButton>
                    <CalendarIcon />
                  </IconButton>
                </InputAdornment>
              ),
          }}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

CustomDatePicker.propTypes = {
  label: PropTypes.node,
  id: PropTypes.string,
  shrink: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  InputProps: PropTypes.object,
  onChange: PropTypes.func,
  field: PropTypes.any,
  custom: PropTypes.any,
  form: PropTypes.any,
  required: PropTypes.bool,
  mainColor: PropTypes.any
};

export default CustomDatePicker;
