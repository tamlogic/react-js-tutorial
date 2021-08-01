import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import MultiSelect from 'react-multi-select-component';
import { useTranslation } from 'react-i18next';
import { getIn } from "formik";
import AppColor from 'utilities/AppColor';

const MultiSelectField = (props) => {
  const { field, form, options = [], label, placeholder, disabled, col, required } = props;
  const { name } = field;
  const { errors, touched } = form;
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const showError = error && touch;

  const { t } = useTranslation();

  const useStyle = makeStyles(() => ({
    unPaddingTop: {
      paddingTop: 0
    },
    disabled: {
      'dropdown-container': {
        backgroundColor: '#e9ecef',
        opacity: 1
      }
    },
    inputBox: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      '& label': {
        minWidth: 100,
        paddingRight: '0.5rem',
        marginBottom: '0.5rem'
      }
    },
    colInput: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    alignCenter: {
      alignItems: 'center'
    },
    input: {
      width: '100%'
    }
  }));

  const classes = useStyle();

  const handleSelectedOptionChange = (selectedOption) => {
    const changeEvent = {
      target: {
        name: name,
        value: selectedOption
      }
    };
    field.onChange(changeEvent);
  };

  const translate = {
    selectSomeItems: t('label.selectSomeItems'),
    allItemsAreSelected: t('label.allItemsAreSelected'),
    selectAll: t('button.selectAll'),
    search: t('label.search'),
    clearSearch: t('label.clearSearch')
  };

  return (
    <FormGroup>
      {label && <Label
        for={name}
        className={classes.unPaddingTop}
      >{t(label)}{required && (<span style={{ color: AppColor.red }}>*</span>)}</Label>}
      <MultiSelect
        id={`${name}-${(new Date()).getTime()}`}
        {...field}
        onChange={handleSelectedOptionChange}
        overrideStrings={translate}
        placeholder={placeholder}
        options={options}
        labelledBy={'Select'}
        disabled={disabled}
        styles={{
          control: (base) => ({
            ...base
          })
        }}
        className={`${showError ? 'is-invalid' : ''} ${disabled ? classes.disabled : ''} ${classes.input}`}
      />

      {showError && (
        <FormFeedback style={{
          display: showError ? 'inline' : 'none'
        }}>
          {
            typeof errors[name] === "object"
              ? t(errors[name].message, { value: errors[name].value })
              : t(errors[name])
          }
        </FormFeedback>
      )}
    </FormGroup>
  );
};

MultiSelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.array,
  col: PropTypes.any
};

MultiSelectField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: []
};

export default MultiSelectField;
