import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import {IconButton, InputAdornment, makeStyles, TextField} from "@material-ui/core";
import classNames from 'classnames';
import AppColor from "utilities/AppColor";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId
} from 'react-places-autocomplete';

const useStyles = makeStyles(() => ({
  override: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      borderRadius: "13px",
      padding: '5px',
      fontStyle: 'italic',
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid rgba(0, 0, 0, 0.49)"
      },
    },
  },
  label: {
    fontSize: 14,
    color: AppColor.black,
    fontWeight: '500'
  }
}))

const MatInputAutocompleteAddress = (props) => {
  const {
    field, form, onChangePostalCode, onChangeLatLng,
    type, label, placeholder, disabled, id, errorMessage,
    onChange, required, className, inputClass, onClear, inputProps,
      initValue
  } = props;
  const classes = useStyles();
  const { name, value } = field;
  const { errors, touched } = form;
  let showError = errors[name] && touched[name];
  const { t } = useTranslation();

  if (errorMessage) {
    showError = !!errorMessage;
  }

  const handleChangeInput = (value) => {
    const changeEvent = {
      target: {
        name: name,
        value: value
      }
    };
    field.onChange(changeEvent);

    onChange && onChange(value);
  };

  const handleChange = address => {
    handleChangeInput(address);
  };

  const handleSelect = async (address, placeId) => {
    handleChangeInput(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => onChangeLatLng && onChangeLatLng(latLng))
      .catch(error => console.error('Error', error));

    const [place] = await geocodeByPlaceId(placeId);
    const { long_name: postalCode = '' } =
      place.address_components.find(c => c.types.includes('postal_code')) || {};
    postalCode && postalCode !== '' && onChangePostalCode && onChangePostalCode(postalCode);
  };

  useEffect(() => {
    handleChangeInput(initValue);
  }, [initValue])

  return (
    <FormGroup className={className}>
      <div className="d-flex">
        <div className="w-100">
          <>
            {label && <Label className={classes.label} for={id || name}>{t(label)}{required && (<span style={{ color: AppColor.red }}>*</span>)}</Label>}
            <PlacesAutocomplete
              value={value}
              onChange={handleChange}
              onSelect={handleSelect}
              debounce={600}
              shouldFetchSuggestions={value.trim().length > 3}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <TextField
                      className={classNames([classes.override, inputClass])}
                      id={id || name}
                      {...field}
                      placeholder={placeholder}
                      type={"text"}
                      size="small"
                      variant="outlined"
                      fullWidth
                      onChange={(event) => handleChangeInput(event)}
                      {...getInputProps({
                        placeholder: placeholder ? t(placeholder) : `${t('text.searchPlace')}...`,
                        className: `location-search-input ${classes.override} ${inputClass}`,
                        disabled: disabled
                      })}
                      InputProps={{
                        ...inputProps,
                        value: value,
                        startAdornment: (
                            <IconButton aria-label="map" disabled>
                              <i className="fas fa-map-marker-alt"/>
                            </IconButton>
                        ),
                        endAdornment: value && (
                            <InputAdornment position="end">
                              <IconButton aria-label="clear" onClick={() => onClear ? onClear() : handleChangeInput('')}>
                                <i className="fas fa-times-circle" />
                              </IconButton>
                            </InputAdornment>
                        ),
                      }}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                          key={`key-${index}`}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </>
        </div>
      </div>
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
}

MatInputAutocompleteAddress.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.any,
  errorMessage: PropTypes.any,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  className: PropTypes.any,
  inputClass: PropTypes.any,
  onChangePostalCode: PropTypes.func,
  onChangeLatLng: PropTypes.func,
  onClear: PropTypes.func,
  inputProps: PropTypes.any,
  initValue: PropTypes.any
};

MatInputAutocompleteAddress.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
  id: ''
};

export default MatInputAutocompleteAddress;
