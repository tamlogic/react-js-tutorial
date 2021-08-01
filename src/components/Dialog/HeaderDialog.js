import { Box, makeStyles, withStyles } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FILTER_PRICES } from "config/AppConfig";

const Style = {
  open: {
    display: 'flex',
    position: 'absolute',
    background: ' #fff',
    color: '#000',
    width: '80vw',
    padding: '1rem',
    borderRadius: '4px',
    fontSize: '1rem',
    opacity: 1,
    top: 'auto',
    transition: 'top 2s'
  },
  close: {
    top: -7000,
    position: 'absolute',
    display: 'flex',
    background: ' #fff',
    color: '#000',
    width: '80vw',
    padding: '1rem',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'top 2s'
  },
  barItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& *': {
      cursor: 'pointer'
    }
  },
  title: {
    color: '#888783',
    fontSize: '1.2rem',
    margin: '0 0 .3em 0',
    fontWeight: 700
  },
  info: {
    fontSize: '1rem',
    '&:hover': {
      color: '#4d0322',
      fontWeight: 700
    }
  },
  body: {
    fontSize: '1.5rem',
    padding: '1rem',
    ['@media (max-width:550px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '1rem',
      padding: '0.5rem',
    },
    '& .MuiBox-root': {
      display: 'flex'
    }
  },
  dialog: {
    '& .MuiBackdrop-root': {
      background: 'unset',
      backgroundColor: 'unset'
    },
    '& .MuiDialog-container': {
      alignItems: 'unset',
      justifyContent: 'unset',
      paddingTop: 108,
      paddingLeft: 16
    }
  }
}

const useStyles = makeStyles(Style);

const HeaderDialog = (props) => {
  const {
    handleClose,
    onSelectCategory,
    onSelectBrand,
    onSelectPrice
  } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  const categories = [];
  const brands = [];

  const handleSelectBrand = (brand) => {
    onSelectBrand(brand)
    handleSelectItem();
  };

  const handleSelectCategory = (category) => {
    onSelectCategory(category)
    handleSelectItem();
  };

  const handleSelectPrice = (price) => {
    onSelectPrice(price);
    handleSelectItem();
  };

  const handleSelectItem = () => {
    handleClose();
    history.push('/products');
  };

  return (
    <Box className={classes.body}>
      <Box style={{
        textAlign: 'center'
      }}>
        <Box display={'flex'} className={classes.barItem}>
          <span className={classes.title}>{t("title.brands")}</span>
          {
            brands.map(item => (
              <span
                key={`brand-${item.id}`}
                onClick={() => handleSelectBrand(item)}
                className={classes.info}
              >
                {item.name}
              </span>
            ))
          }
        </Box>
        <Box display={'flex'} className={classes.barItem}>
          <span className={classes.title}>Categories</span>
          {
            categories.map(item => (
              <span
                key={`category-${item.id}`}
                onClick={() => handleSelectCategory(item)}
                className={classes.info}
              >
                {item.name}
              </span>
            ))
          }
        </Box>
        <Box display={'flex'} className={classes.barItem}>
          <span className={classes.title}>Price</span>
          {
            FILTER_PRICES.map((item) => {
              const { from, to } = item
              return (
                <span
                  onClick={() => handleSelectPrice(item)}
                  key={`price-${from}`}
                  className={classes.info}
                >
                  { from === 0 ? `$${to} and less` : to > 999 ? `$${from} plus` : `$${from}-${to}`}
                </span>
              );
            })
          }
        </Box>
      </Box>
    </Box>
  )
}

HeaderDialog.propTypes = {
  classes: PropTypes.object,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  isShowDialog: PropTypes.bool,
  handleClose: PropTypes.func,
  onSelectCategory: PropTypes.func,
  onSelectBrand: PropTypes.func,
  onSelectPrice: PropTypes.func
};

export default withStyles(Style)(props => (<HeaderDialog {...props} />));