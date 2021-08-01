import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { makeStyles } from "@material-ui/core";
import classNames from 'classnames';
import AppColor from "../../utilities/AppColor";
import InputMask from 'react-input-mask';
import { getIn } from "formik";

const useStyles = makeStyles(() => ({
  input: {
    border: '1px solid rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    height: '40px',
    '&:focus': {
      border: `1px solid ${AppColor.orange}`,
      boxSizing: 'border-box',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: 5,
    }
  },
  label: {
    fontSize: 14,
    color: AppColor.black,
    fontWeight: '500'
  },
  strongText: {
    fontWeight: 700
  }
}))

const AppInput = (props) => {
  const {
    field, form,
    type, label, placeholder, disabled, id, checked, errorMessage, isTouched,
    onCheck, rightButtonLabel, onRightButtonClick, showRightButton, showNextRightButton,
    onNextRightButtonClick, rightButtonIcon, rightButtonClass, nextRightButtonLabel,
    isCancel, onChange, required, className, InputProps, inputClass, children, strongLabel,
    mask, maskChar
  } = props;
  const classes = useStyles();
  const { name, value = '', ...rest } = field;
  const { errors, touched, isValid } = form;
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  let showError = error && touch;
  const { t } = useTranslation();

  if (errorMessage) {
    showError = !!errorMessage && isTouched;
  }

  let inputMask = {};
  if (mask) {
    inputMask = {
      tag: InputMask,
      mask: mask,
      maskChar: maskChar
    }
  }

  const handleChangeInput = (event) => {
    event.persist();

    const changeEvent = {
      target: {
        name: name,
        value: event.target.value
      }
    };
    field.onChange(changeEvent);

    onChange && onChange(event.target.value);
  };

  return (
    <FormGroup check={type === 'radio' || type === 'checkbox'} className={className}>
      <div className="d-flex">

        {type !== 'radio' && type !== 'checkbox' && (
          <div className="w-100">
            <>
              {label && <Label className={`${classes.label} ${strongLabel ? classes.strongText : ''}`} for={id || name}>{t(label)}{required && (<span style={{ color: AppColor.red }}>*</span>)}</Label>}

              <Input
                id={id || name}
                {...rest}
                name={name}
                value={value || ''}
                className={classNames([classes.input, inputClass])}
                type={type}
                disabled={disabled}
                placeholder={t(placeholder)}
                onChange={(event) => handleChangeInput(event)}
                onKeyPress={event => {
                  if (type === 'number' && event.key === 'e') {
                    event.preventDefault();
                  }
                }}
                invalid={showError}
                {...inputMask}
              >
                {children}
              </Input>
            </>
          </div>
        )}
        {(type === 'radio' || type === 'checkbox') && (
          <div className="mr-2 w-100">
            <Label for={id || name} check>
              <Input
                id={id || name}
                {...field}

                type={type}
                disabled={disabled}
                placeholder={t(placeholder)}
                checked={checked}
                onChange={(event) => {
                  onCheck(event.target.value);
                  field.onChange(event);
                  onChange && onChange(value);
                  // handleChangeInput(event.target.value);
                }}
                {...InputProps}
                invalid={showError}
                tag={InputMask}
                mask={mask}
                maskChar={maskChar}
              />{' '}
              {t(label)}
            </Label>
          </div>
        )}
        {showRightButton && (
          <div className="d-flex align-items-end">
            <button
              className={`btn btn-${isCancel ? 'danger' : 'info'} text-nowrap`}
              type="button"
              onClick={onRightButtonClick}
            >{isCancel ? t({ id: 'button.cancel' }) : rightButtonLabel}</button>
          </div>
        )}
        {showNextRightButton && (
          <div className="d-flex align-items-end">
            <button
              className={`btn text-nowrap ${rightButtonClass}`}
              type="button"
              onClick={() => onNextRightButtonClick(value)}
              disabled={!isValid}
            >
              {nextRightButtonLabel}
              {
                rightButtonIcon
                  ? <i className={rightButtonIcon} aria-hidden="true"> </i>
                  : null
              }
            </button>
          </div>
        )}
      </div>
      {showError && (
        <FormFeedback style={{
          display: showError ? 'inline' : 'none'
        }}>
          {
            typeof error === "object"
              ? t(error.message, { value: error.value })
              : t(error)
          }
        </FormFeedback>
      )}
    </FormGroup>
  );
}

AppInput.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.any,
  checked: PropTypes.bool,
  onCheck: PropTypes.func,
  rightButtonLabel: PropTypes.string,
  onRightButtonClick: PropTypes.func,
  onNextRightButtonClick: PropTypes.func,
  showRightButton: PropTypes.bool,
  showNextRightButton: PropTypes.bool,
  rightButtonIcon: PropTypes.string,
  nextRightButtonLabel: PropTypes.string,
  rightButtonClass: PropTypes.string,
  isCancel: PropTypes.bool,
  errorMessage: PropTypes.any,
  isTouched: PropTypes.bool,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  InputProps: PropTypes.object,
  className: PropTypes.any,
  inputClass: PropTypes.any,
  children: PropTypes.any,
  strongLabel: PropTypes.bool,
  mask: PropTypes.any,
  maskChar: PropTypes.any
};

AppInput.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
  id: '',
  checked: false,
  onCheck: function () {
  },
  rightButtonLabel: 'Text',
  onRightButtonClick: function () {
  },
  onNextRightButtonClick: function () {
  },
  isTouched: false
};

export default AppInput;
