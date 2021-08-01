import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import AppConfig from "config/AppConfig";

const useStyles = makeStyles({
  input: {
    paddingBottom: 0,
    "& .MuiFormLabel-root": {
      fontSize: "1rem",
      lineHeight: "unset",
      fontWeight: 700,
      color: "#000",
      transform: "translate(0, 1.5px) scale(1)",
      position: "relative",
      marginBottom: 0,
    },
    "&::placeholder": {
      opacity: 0.3,
      fontSize: "0.8rem",
    },
    "& .MuiInput-root": {
      marginTop: "0",
    },
  },
});

const AppInput = (props) => {
  const classes = useStyles();
  const {
    label,
    id,
    field,
    form,
    type,
    placeholder,
    disabled,
    style,
    className,
    shrink = false,
    custom,
    InputProps,
    onChange,
    decimalScale,
  } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const { t } = useTranslation();

  const [errorMessage, setErrorMessage] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [showError, setShowError] = useState(errors[name] && touched[name]);

  useEffect(() => {
    setIsFocus(false);
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

  useEffect(() => {
    if (isFocus) {
      setTimeout(() => {
        setIsFocus(false);
      }, 1000);
    }
  }, [isFocus]);

  const handleChangeInput = (event) => {
    let value = event.target.value;
    if (type === "number") {
      if (value === "") {
        value = "";
      } else if (value !== "" && AppConfig.PATTERNS.INPUT_NUMBER.test(value)) {
        if (decimalScale === 0 && value.includes(".")) {
          return;
        }
        if (
          decimalScale !== undefined &&
          value.includes(".") &&
          !value.includes("e") &&
          value.split(".")[1].length > decimalScale
        ) {
          return;
        }
      } else {
        return;
      }
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

  return (
    <TextField
      error={showError}
      inputRef={(input) => isFocus && input && input.focus()}
      id={id}
      label={label}
      name={name}
      helperText={
        typeof errorMessage === "object"
          ? t(errorMessage.message, { value: errorMessage.value })
          : t(errorMessage)
      }
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      style={{
        ...style,
        marginBottom: "1rem",
      }}
      fullWidth
      InputLabelProps={{
        shrink: shrink,
      }}
      className={classNames({ [className]: true, [classes.input]: true })}
      {...field}
      {...custom}
      InputProps={{
        ...InputProps,
        classes: { input: classes.input },
      }}
      onChange={handleChangeInput}
      multiline
    />
  );
};

AppInput.propTypes = {
  label: PropTypes.node,
  id: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  InputProps: PropTypes.object,
  onChange: PropTypes.func,
  decimalScale: PropTypes.number,
};

export default AppInput;
