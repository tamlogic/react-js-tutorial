import React from "react";
import { Box, CircularProgress, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import AppColor from "utilities/AppColor";


const styles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '& .MuiCircularProgress-colorPrimary': {
      color: AppColor.violet
    }
  },
  label: {
    fontSize: '2rem',
    fontWeight: 700
  },
  circleUnder: {
    position: 'absolute',
    '&.MuiCircularProgress-colorPrimary': {
      color: AppColor.wine
    }
  }
}));

const AppCircularProgress = (props) => {
  const {
    value
  } = props;

  const classes = styles();

  return (
    <Box className={classes.container}>
      <CircularProgress
        variant="determinate"
        thickness={8}
        size={'100%'}
        value={100}
        className={classes.circleUnder}
      />
      <CircularProgress
        variant="static"
        thickness={8}
        size={'100%'}
        value={value}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" className={classes.label}>{`${Math.round(
          value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

AppCircularProgress.propTypes = {
  value: PropTypes.any
};

export default AppCircularProgress;
