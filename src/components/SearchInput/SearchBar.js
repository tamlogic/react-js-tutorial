import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Search } from "@material-ui/icons";
import {
  FormControl,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
  overrides: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#F1F1F1",
      borderRadius: "20px",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  },
});

const SearchBar = (props) => {
  const {
    onSearch,
    onFocus,
    onBlur,
    onChange,
    placeholder,
    value,
    inputProps,
    submitOnBlur,
  } = props;

  const classes = useStyles(props);

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    onChange ? onChange(value) : setSearchValue(value);
  };

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  return (
    <FormControl className={"w-100"}>
      <TextField
        className={classes.overrides}
        id="standard-search-input"
        placeholder={placeholder}
        type={"text"}
        value={value}
        size="small"
        variant="outlined"
        onChange={(event) => handleSearch(event.target.value)}
        onFocus={() => {
          onFocus && onFocus();
        }}
        onBlur={() => {
          onBlur && onBlur();
          submitOnBlur && onSearch(searchValue);
        }}
        InputProps={{
          ...inputProps,
          endAdornment: (
            <InputAdornment position="end">
              <Search onClick={() => onSearch(searchValue)} />
            </InputAdornment>
          ),
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSearch(searchValue);
          }
        }}
      />
    </FormControl>
  );
};

SearchBar.propTypes = {
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

SearchBar.defaultProps = {
  onSearch: () => {},
  searchText: "",
  onClear: null,
  onFocus: null,
  onBlur: null,
  onChange: null,
  inputProps: {},
};

export default SearchBar;
