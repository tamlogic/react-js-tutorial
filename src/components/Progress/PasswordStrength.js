import React, { useEffect, useState } from "react";
import { Box, LinearProgress, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import AppColor from "utilities/AppColor";
import AppConfig from "config/AppConfig";
const { PATTERNS } = AppConfig;

const PasswordStrength = (props) => {
  const {
    value,
    label
  } = props;

  const [progress, setProgress] = useState(0);
  const [strength, setStrength] = useState('');
  const [color, setColor] = useState('');

  const handleStrengthColor = (percent) => {
    if (percent <= 25) {
      setStrength('weak');
      setColor(AppColor.red);
      return;
    }
    if (percent <= 50) {
      setStrength('medium');
      setColor(AppColor.orange);
      return;
    }
    if (percent <= 75) {
      setStrength('medium');
      setColor(AppColor.orange);
      return;
    }
    if (percent === 100) {
      setStrength('strong');
      setColor(AppColor.green);
      return;
    }
    setStrength('weak');
    setColor(AppColor.red);
    return AppColor.red;
  };

  const styles = makeStyles(() => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      margin: '1rem 0',
      '& .MuiLinearProgress-root': {
        width: '100%'
      },
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: color
      }
    },
    label: {
      fontSize: '2rem',
      fontWeight: 700
    },
    circleUnder: {
      position: 'absolute',
      '&.MuiLinearProgress-colorPrimary': {
        color: AppColor.greyLighten
      }
    },
    strengthLabel: {
      color: color
    }
  }));

  const classes = styles();
  const validations = [
    PATTERNS.PASSWORD_LOWER,
    PATTERNS.PASSWORD_UPPER,
    PATTERNS.PASSWORD_NUMBER,
    PATTERNS.PASSWORD_PATTERN
  ];

  const numSteps = validations.length;

  useEffect(() => {
    if (value && value !== '') {
      let validSteps = 0;
      for (const schema of validations) {
        if (schema.test(value)) {
          validSteps += 1;
        }
      }
      setProgress(validSteps / numSteps * 100);
      handleStrengthColor(validSteps / numSteps * 100);
    } else {
      setProgress(0);
      handleStrengthColor(0);
    }
  }, [value]);

  return (
    <React.Fragment>
      <Box>
        {label}
      </Box>
      <Box className={classes.container}>
        <LinearProgress
          variant="determinate"
          size={'100%'}
          value={100}
          className={classes.circleUnder}
        />
        <LinearProgress
          variant="determinate"
          size={'100%'}
          value={progress}
        />
      </Box>
      {
        progress > 0 && (
          <Box className={classes.strengthLabel}>{strength}</Box>
        )
      }
    </React.Fragment>

  );
}

PasswordStrength.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string
};

export default PasswordStrength;
