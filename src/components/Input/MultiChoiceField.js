import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import AppColor from 'utilities/AppColor';

const MultiChoiceField = (props) => {
  const { field, form, options, label, minWidth, col, onSelected, disabled } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const { t } = useTranslation();


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
        margin: 0
      }
    },
    colInput: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    input: {
      width: '100%',
      margin: '0.5rem 0!important'
    },
    box: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))`,
      gridGap: '0.25rem',
      width: '100%'
    },
    item: {
      border: '1px solid #d2d2d2',
      minHeight: 30,
      borderRadius: 15,
      wordBreak: 'break-word',
      textAlign: 'center',
      padding: '0 0.5rem',
      marginBottom: '0.25rem',
      cursor: 'pointer',
      '&:hover': {
        background: AppColor.orange,
        borderColor: AppColor.white,
        color: AppColor.white
      },
      '&.active': {
        background: AppColor.orange,
        borderColor: AppColor.white,
        color: AppColor.white
      }
    }
  }));

  const classes = useStyle();

  const handleSelectedOptionChange = (id) => {
    let newValue;
    const existValue = value.filter(item => item === id)[0];
    if(existValue) {
      newValue = value.filter(item => item !== id);
    } else {
      newValue = [...value, id];
    }
    const changeEvent = {
      target: {
        name: name,
        value: newValue
      }
    };
    field.onChange(changeEvent);
    onSelected && onSelected(id);
  };

  return (
    <FormGroup className={`${classes.inputBox} ${col !== 12 && classes.colInput}`}>
      {label && <Label
        for={name}
        className={classes.unPaddingTop}
      >{t(label)}</Label>}
      <Box className={classes.box}>
        {
          options.map(({ id, label: itemLabel }) => (
            <div
              key={`multi-${id}`}
              className={`${classes.item} ${value.includes(id) && 'active'} ${disabled ? 'disabled' : ''}`}
              onClick={() => handleSelectedOptionChange(id)}
            >
              {t(itemLabel)}
            </div>
          ))
        }
      </Box>
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

MultiChoiceField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  col: PropTypes.number,
  onSelected: PropTypes.func,
  isClearable: PropTypes.bool,
  minWidth: PropTypes.number,
};

MultiChoiceField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
  onSelected: null,
  minWidth: 170
};

export default MultiChoiceField;
