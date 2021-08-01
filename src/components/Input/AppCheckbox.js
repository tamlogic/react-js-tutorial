import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import AppColor from "utilities/AppColor";

const useStyles = makeStyles({
  root: {
    color: `${AppColor.orange} !important`
  },
  input: {},
  block: {
    pointerEvents: "none",
  },
});

const AppCheckbox = (props) => {
  const classes = useStyles();
  const {
    label,
    id,
    field,
    form,
    disabled,
    style,
    custom,
    inputChange,
    block,
    className
  } = props;

  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const { t } = useTranslation();

  const handleChangeCheckbox = (event) => {
    field.onChange(event);
    inputChange && inputChange(event.target.checked);
  };

  return (
    <FormControl error={showError} className={className}>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value={value}
          style={{
            color: "#000",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
          className={block ? classes.block : ""}
          control={
            <Checkbox
              id={id}
              name={name}
              disabled={disabled}
              checked={value}
              style={{
                ...style,
                padding: '4px 12px'
              }}
              className={classes.root}
              {...field}
              {...custom}
              onChange={handleChangeCheckbox}
            />
          }
          label={label}
        />
      </FormGroup>
      {showError && <FormHelperText>{t(errors[name])}</FormHelperText>}
    </FormControl>
  );
};

AppCheckbox.propTypes = {
  label: PropTypes.node,
  id: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  field: PropTypes.any,
  form: PropTypes.any,
  custom: PropTypes.any,
  block: PropTypes.any,
  className: PropTypes.any,
  inputChange: PropTypes.func
};

export default AppCheckbox;
