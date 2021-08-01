import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Select from 'react-select';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AppColor from 'utilities/AppColor';
import { getIn } from "formik";
import moment from "moment-timezone";
import { Box, ClickAwayListener } from '@material-ui/core';
import { MINUTES_PICKER, HOURS_PICKER, HOURS_PICKER_SLEEPOVER } from 'config/AppConfig';
import classNames from "classnames";

const SelectTime = (props) => {
  const { field, form, placeholder, label, isSleepover,
    disabled, onSelected, isClearable = false,
    required, minTime, maxTime, shouldDisableTime,
    mainColor = AppColor.mainColor, className
  } = props;
  const { name, value } = field;
  const { errors, touched, setFieldTouched } = form;
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const showError = error && touch;
  const { t } = useTranslation();


  const useStyle = makeStyles(() => ({
    unPaddingTop: {
      paddingTop: 0,
      width: '100%'
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
    },
    wrapSelect: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    preview: {
      padding: '0.3rem 0.3rem',
      border: '1px solid #c4b5bc',
      borderRadius: 4,
      backgroundColor: AppColor.white,
      display: 'flex',
      justifyContent: 'space-between',
      boxShadow: '0px 4px 4px rgb(0 0 0 / 25%)',
      cursor: 'pointer',
      width: '100%'
    },
    selectBox: {
      display: 'flex',
      position: 'absolute',
      width: '100%',
      maxWidth: 350,
      minWidth: 200,
      background: AppColor.white,
      zIndex: 1000,
      border: '1px solid #c4b5bc',
      top: 0,
      padding: '3rem 1rem',
      borderRadius: 4,
      boxShadow: '0px 4px 4px rgb(0 0 0 / 25%)'
    },
    disabled: {
      backgroundColor: 'hsl(0, 0%, 95%)',
      pointerEvents: 'none'
    }
  }));

  const classes = useStyle();

  const [showPicker, setShowPicker] = useState(false);

  const hourOptions = isSleepover ? HOURS_PICKER_SLEEPOVER : HOURS_PICKER;

  const minHours = minTime ? moment(minTime, 'HH:mm').hours() : 0;
  const minMinutes = minTime ? moment(minTime, 'HH:mm').minutes() : 0;
  const maxHours = maxTime ? moment(maxTime, 'HH:mm').hours() : 23;
  const maxMinutes = maxTime ? moment(maxTime, 'HH:mm').minutes() : 55;
  const hours = !!value && value !== '' ? moment(value).hours() : '';
  const minutes = !!value && value !== '' ? moment(value).minutes() : '';

  const handleSelecteHours = (option) => {
    const selectedValue = option ? option.value : option;
    let time;
    if (isSleepover && selectedValue <= 6) {
      time = moment(new Date()).hours(selectedValue).minutes((minutes && minutes !== '' && minutes >= minMinutes) ? minutes : 0).add(1, 'day').format('YYYY/MM/DD HH:mm');
    } else {
      time = moment(new Date()).hours(selectedValue).minutes((minutes && minutes !== '' && minutes >= minMinutes) ? minutes : minMinutes).format('YYYY/MM/DD HH:mm');
    }

    const changeEvent = {
      target: {
        name: name,
        value: time
      }
    };
    field.onChange(changeEvent);
    onSelected && onSelected(time);
    setFieldTouched(name, true);
  };
  const handleSelectMinutes = (option) => {
    const selectedValue = option ? option.value : option;
    let time;
    time = moment(value && value !== '' ? value : new Date()).hours((hours && hours !== '') ? hours : minHours).minutes(selectedValue).format('YYYY/MM/DD HH:mm');

    const changeEvent = {
      target: {
        name: name,
        value: time
      }
    };
    field.onChange(changeEvent);
    onSelected && onSelected(time);
    setFieldTouched(name, true);
  };
  const handleClose = () => {
    if (minutes < minMinutes) {
      handleSelecteHours({
        value: hours
      });
    }
    setShowPicker(false);
  };

  return (
    <FormGroup className={classNames({
      [classes.wrapSelect]: true,
      [className]: !!className
    })}>
      {label && <Label
        for={name}
        className={classes.unPaddingTop}
      >{t(label)}{required && (<span style={{ color: AppColor.red }}>*</span>)}</Label>}
      <Box
        className={classNames({
          [classes.preview]: true,
          [classes.disabled]: disabled,
          'preview-time': true
        })}
        onClick={() => setShowPicker(true)}
      >
        {value && value !== '' ? moment(value).format('HH:mm') : '00:00'}
      </Box>
      {
        showPicker && (
          <ClickAwayListener
            onClickAway={handleClose}
          >
            <Box className={classes.selectBox}>
              <Box flex="1 0 0px">
                <Label
                  for={name}
                  className={classes.unPaddingTop}
                >{t('label.hours')}{required && (<span style={{ color: AppColor.red }}>*</span>)}</Label>
                <Select
                  id={`${name}-${(new Date()).getTime()}`}
                  {...field}
                  value={{
                    value: hours,
                    label: hours
                  }}
                  onChange={handleSelecteHours}
                  isClearable={isClearable}
                  placeholder={t(placeholder)}
                  options={hourOptions.filter(hour => {
                    if (shouldDisableTime) {
                      return shouldDisableTime(hour, 'hours') && hour >= minHours && hour <= maxHours
                    }
                    return hour >= minHours && hour <= maxHours
                  }).map(item => {
                    return {
                      value: item,
                      label: item
                    }
                  })}
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
              </Box>
              <Box flex="1 0 0px">
                <Label
                  for={name}
                  className={classes.unPaddingTop}
                >{t('label.minutes')}{required && (<span style={{ color: AppColor.red }}>*</span>)}</Label>
                <Select
                  id={`${name}-${(new Date()).getTime()}`}
                  {...field}
                  value={{
                    value: minutes,
                    label: minutes
                  }}
                  onChange={(option) => {
                    handleSelectMinutes(option);
                    setShowPicker(false);
                  }}
                  isClearable={isClearable}
                  placeholder={t(placeholder)}
                  isDisabled={!hours && hours !== 0}
                  options={MINUTES_PICKER.filter(min => {
                    if (shouldDisableTime) {
                      return shouldDisableTime(min, 'minutes') && min >= minMinutes && min <= maxMinutes
                    }
                    return min >= minMinutes && min <= maxMinutes
                  }).map(item => {
                    return {
                      value: item,
                      label: item
                    }
                  })}
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
              </Box>
            </Box>
          </ClickAwayListener>
        )
      }
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

SelectTime.propTypes = {
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
  isSleepover: PropTypes.bool,
  minTime: PropTypes.any,
  maxTime: PropTypes.any,
  shouldDisableTime: PropTypes.any,
  className: PropTypes.any,
  mainColor: PropTypes.any
};

SelectTime.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
  onSelected: null
};

export default SelectTime;
