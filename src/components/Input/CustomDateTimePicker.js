import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useTranslation } from "react-i18next";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { IconButton, InputAdornment } from "@material-ui/core";
import {
  Clear as ClearIcon,
  InsertInvitation as CalendarIcon,
} from "@material-ui/icons";

const useStyles = makeStyles({
  input: {
    paddingBottom: 0,
    "& .MuiFormLabel-root": {
      fontSize: 14,
      lineHeight: "unset",
      fontWeight: 400,
      color: "#000",
      transform: "translate(0, 1.5px) scale(1)",
      position: "relative",
      marginBottom: '0.5rem',
    },
    "&::placeholder": {
      opacity: 0.3,
      fontSize: "0.8rem",
    },
    "& .MuiInput-root": {
      marginTop: "0",
      border: '1px solid #c4b5bc',
      borderRadius: 4,
      padding: '10px 20px'
    },
    "& .MuiInputBase-input": {
      padding: 0      
    },
    "& .MuiInput-underline:before": {
      display: 'none'
    }
  },
});

const CustomDateTimePicker = (props) => {
  const classes = useStyles();
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
  } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const { t } = useTranslation();

  let format = "yyyy/MM/DD hh:mm a";

  if (custom && custom.format) {
    format = custom.format;
  }

  const [errorMessage, setErrorMessage] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [showError, setShowError] = useState(errors[name] && touched[name]);

  useEffect(() => {
    if (name.includes("[")) {
      let indexOne = name.indexOf("[");
      let indexTwo = name.indexOf(".");
      let firstkey = name.slice(0, indexOne);
      let secondkey = name.slice(indexOne + 1, indexOne + 2);
      let thirdkey = name.slice(indexTwo + 1);

      if (
        errors[firstkey] &&
        errors[firstkey][secondkey] &&
        errors[firstkey][secondkey][thirdkey] &&
        touched[firstkey] &&
        touched[firstkey][secondkey] &&
        touched[firstkey][secondkey][thirdkey]
      ) {
        setShowError(true);
        setErrorMessage(errors[firstkey][secondkey][thirdkey]);

        if (
          Object.keys(errors)[0] === firstkey &&
          secondkey === "0" &&
          Object.keys(errors[firstkey][0])[0] === thirdkey
        ) {
          setIsFocus(true);
        }
      } else {
        setShowError(false);
        setErrorMessage("");
      }
    } else if (errors[name] && touched[name]) {
      setShowError(true);
      setErrorMessage(errors[name]);

      if (Object.keys(errors)[0] === name) {
        setIsFocus(true);
      }
    } else {
      setShowError(false);
      setErrorMessage("");
    }
  }, [errors, touched]);

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
    if (value !== "") {
      return date.format(format);
    } else {
      return "";
    }
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DateTimePicker
        error={showError}
        variant="dialog"
        inputRef={(input) => isFocus && input && input.focus()}
        id={id}
        label={label}
        name={name}
        helperText={t(errorMessage)}
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
          classes: { input: classes.input },
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
    </MuiPickersUtilsProvider>
  );
};

CustomDateTimePicker.propTypes = {
  label: PropTypes.node,
  id: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  InputProps: PropTypes.object,
  onChange: PropTypes.func,
  field: PropTypes.any,
  form: PropTypes.any,
  shrink: PropTypes.bool,
  custom: PropTypes.any
};

export default CustomDateTimePicker;
