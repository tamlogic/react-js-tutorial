import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AppColor from 'utilities/AppColor';
import { getIn } from "formik";

const SelectField = (props) => {
  const { field, form, options, label, placeholder,
    disabled, onSelected, isClearable = false,
    required,
    mainColor = AppColor.mainColor
  } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const showError = error && touch;
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState();

  const useStyle = makeStyles(() => ({
    unPaddingTop: {
      paddingTop: 0
    },
    alignCenter: {
      alignItems: 'center'
    },
    inputBox: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '0!important',
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
    input: {
      width: '100%'
    }
  }));

  const classes = useStyle();

  useEffect(() => {
    const initOption = options.find(option => option.value === value);
    if (initOption) {
      setSelectedOption(initOption);
    } else {
      setSelectedOption(null);
    }
  }, [options, value]);

  const handleSelectedOptionChange = (option) => {
    setSelectedOption(option);
    const selectedValue = option ? option.value : option;

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue
      }
    };
    field.onChange(changeEvent);
    onSelected && onSelected(selectedValue);
  };

  return (
    <FormGroup>
      {label && <Label
        for={name}
        className={classes.unPaddingTop}
      >{t(label)}{required && (<span style={{ color: AppColor.red }}>*</span>)}</Label>}
      <Select
        id={`${name}-${(new Date()).getTime()}`}
        {...field}
        value={selectedOption}
        onChange={handleSelectedOptionChange}
        isClearable={isClearable}
        placeholder={t(placeholder)}
        isDisabled={disabled}
        options={options}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: 'hsl(0, 0%, 80%)',
            boxShadow: '0 4px 4px rgb(0 0 0 / 25%)',
            minHeight: 40,
            '&:hover': {
              borderColor: mainColor,
              boxShadow: `0 0 0 1px ${mainColor}`
            },
            '&:focus': {
              borderColor: mainColor,
              boxShadow: `0 0 0 1px ${mainColor}`
            }
          }),
          option: (styles, { isDisabled, isSelected }) => {
            return {
              ...styles,
              backgroundColor: isSelected ? mainColor : AppColor.white,
              color: isSelected ? AppColor.white : AppColor.black,
              cursor: isDisabled ? 'not-allowed' : 'default',
              '&:active': {
                backgroundColor: '#ffa50087'
              }
            };
          },
          dropdownIndicator: () => ({
            padding: '0 8px!important',
            color: '#aaa'
          }),
          valueContainer: (base) => ({
            ...base,
            padding: '0 8px!important'
          })
        }}

        className={`${showError ? 'is-invalid' : ''} ${classes.input}`}
      />
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
};

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  col: PropTypes.number,
  onSelected: PropTypes.func,
  isClearable: PropTypes.bool,
  required: PropTypes.bool,
  mainColor: PropTypes.any
};

SelectField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
  onSelected: null
};

export default SelectField;
