import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl, IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import {Formik, Field} from "formik";
import MatInputAutocompleteAddress from "../Input/MatInputAutocompleteAddress";
import AppColor from "../../utilities/AppColor";
import {useDispatch} from "react-redux";
import { setSearchWorkerQueries } from "../../store/slices/worker";

const useStyles = makeStyles({
});

const SearchWorkerInput = (props) => {
  const {
    onSearch,
    value,
    queries
  } = props;

  const dispatch = useDispatch();

  return (
    <FormControl className={"w-100"}>
      <Formik
        initialValues={{
          search: '',
          latLng: ''
        }}
        onSubmit={(data) => onSearch(data)}
      >
        {({handleSubmit, handleChange}) => (
            <>
              <Field
                  component={MatInputAutocompleteAddress}
                  name="search"
                  onChangeLatLng={(latLng) => {
                    handleChange({
                      target: {
                        name: 'latLng',
                        value: latLng
                      }
                    })
                    handleSubmit();
                  }}
                  initValue={value}
                  onClear={() => {
                    handleChange({
                      target: {
                        name: 'latLng',
                        value: ''
                      }
                    });
                    handleChange({
                      target: {
                        name: 'search',
                        value: ''
                      }
                    });
                    setTimeout(() => handleSubmit(), 500)
                  }}
              />
            </>
        )}
      </Formik>
    </FormControl>
  );
};

SearchWorkerInput.propTypes = {
  onSearch: PropTypes.func,
  searchText: PropTypes.string,
  onClear: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  inputProps: PropTypes.object,
  submitOnBlur: PropTypes.bool,
};

SearchWorkerInput.defaultProps = {
  onSearch: () => {},
  searchText: "",
  onClear: null,
  onFocus: null,
  onBlur: null,
  onChange: null,
  inputProps: {},
};

export default SearchWorkerInput;
