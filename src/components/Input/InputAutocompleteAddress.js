import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { makeStyles } from "@material-ui/core";
import classNames from 'classnames';
import AppColor from "utilities/AppColor";
import { getIn } from "formik";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId
} from 'react-places-autocomplete';

const useStyles = makeStyles(() => ({
  input: {
    border: '1px solid rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    height: '45px',
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
  }
}))

const InputAutocompleteAddress = (props) => {
  const {
    field, form, onChangePostalCode, onChangeLatLng,
    type, label, placeholder, disabled, id, errorMessage,
    onChange, required, className, inputClass, isTouched
  } = props;
  const classes = useStyles();
  const { name, value = '' } = field;
  const { errors, touched, setFieldTouched } = form;
  const error = getIn(errors, name);
  const touch = getIn(touched, name);

  let showError = error && touch;
  const { t } = useTranslation();

  if (errorMessage) {
    showError = !!errorMessage && isTouched;
  }

  const handleChangeInput = (value) => {
    const changeEvent = {
      target: {
        name: name,
        value: value
      }
    };
    field.onChange(changeEvent);

    setFieldTouched && setFieldTouched(name, true);
    onChange && onChange(value);
  };

  const handleChange = address => {
    handleChangeInput(address);
  };

  const handleSelect = async (address, placeId) => {
    handleChangeInput(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => onChangeLatLng(latLng))
      .catch(error => console.error('Error', error));

    const [place] = await geocodeByPlaceId(placeId);
    const { long_name: postalCode = '' } =
      place.address_components.find(c => c.types.includes('postal_code')) || {};
    postalCode && postalCode !== '' && onChangePostalCode && onChangePostalCode(postalCode);
  };

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
                  <Input
                    id={id || name}
                    {...field}
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
                    {...getInputProps({
                      placeholder: placeholder ? t(placeholder) : `${t('text.searchPlace')}...`,
                      className: `location-search-input ${classes.input} ${inputClass}`,
                      disabled: disabled
                    })}
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
            typeof error === "object"
              ? t(error.message, { value: error.value })
              : t(error)
          }
        </FormFeedback>
      )}
    </FormGroup>
  );
}

InputAutocompleteAddress.propTypes = {
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
  isTouched:PropTypes.bool,
  className: PropTypes.any,
  inputClass: PropTypes.any,
  onChangePostalCode: PropTypes.func,
  onChangeLatLng: PropTypes.func
};

InputAutocompleteAddress.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
  id: ''
};

export default InputAutocompleteAddress;
