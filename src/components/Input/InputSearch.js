import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FormGroup, makeStyles } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { Search } from "@material-ui/icons";
import * as _ from 'lodash';
import { Input } from 'reactstrap';

const useStyles = makeStyles(() => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    border: '1px solid rgba(0, 0, 0, 0.26)'
  },
  input: {
    flex: 1,
    border: 'none!important'
  },
  iconButton: {
    padding: 5,
    background: 'transparent',
    border: 'none'
  }
}));

const InputSearch = props => {
  const { 
    onSearch, 
    onSearching = () => {}, 
    searchText, 
    debounce = 500 } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const onSubmit = (data) => {
    const {search} = data;
    console.log('data:', data);
    onSearch(search);
  };

  const debounceListener = _.debounce(onSearching, debounce);

  return (
    <Formik
      onSubmit={onSubmit}
      enableReinitialize={true}
      autoComplete={false}
      initialValues={{
        search: searchText || ''
      }}
    >
      {({ setFieldValue }) => {
        return (
          <Form>
            <div className={classes.root}>
              <Input
                className={classes.input}
                placeholder={t('label.search')}
                name="search"
                onChange={(event) => {
                  setFieldValue('search', event.target.value);
                  debounceListener(event.target.value);
                }}
              />
              <FormGroup>
                <button type="submit" className={classes.iconButton}>
                  <Search />
                </button>
              </FormGroup>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

InputSearch.propTypes = {
  onSearch: PropTypes.func,
  searchText: PropTypes.string,
  onClear: PropTypes.func,
  onSearching: PropTypes.func,
  fullWidth: PropTypes.bool,
  debounce: PropTypes.number
};

export default InputSearch;
