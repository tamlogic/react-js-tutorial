import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { showToast } from "store/slices/toast";
import { useDispatch } from 'react-redux';
import { Box, makeStyles } from '@material-ui/core';
import AppColor from 'utilities/AppColor';

const styles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    marginRight: '0.5rem',
    width: '120px',
    height: '120px',
    fontSize: '8rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: '3px solid #0000003d',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  },
  coverHover: {
    borderRadius: '50%',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    color: '#0000008d',
    '& .upload-icon': {
      display: 'none',
      position: 'absolute',
      fontSize: '2rem',
      color: AppColor.white,
      zIndex: 1
    },
    '& .frost': {
      display: 'none',
      position: 'absolute',
      background: '#00000091',
      height: '100%',
      width: '100%',
    },
    '&:hover': {
      opacity: '0.5',
      '& .upload-icon': {
        display: 'block'
      },
      '& .frost': {
        display: 'block'
      }
    },
    '&.disabled': {
      '& .frost': {
        display: 'block'
      }
    }
  }
}));
const AvatarUpload = props => {
  const {
    onUploadFile,
    accept,
    inputProps = {},
    preview,
    disabled
  } = props;

  const hiddenFileInput = React.useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    let fileUploaded;
    let localImageUrl;
    let isValidFiles = true;

    for (let image of event.target.files) {
      if (!accept.includes(image.type)) {
        isValidFiles = false
      }
    }
    if (!isValidFiles) {
      dispatch(
        showToast({
          type: "danger",
          message: t("validation.invalidFileImage"),
        })
      );
      return;
    }

    if (inputProps.multiple) {
      let urls = [];
      fileUploaded = event.target.files;
      for (let item of fileUploaded) {
        let localUrl = URL.createObjectURL(item);
        let params = {
          file: item,
          url: localUrl
        }
        urls = [...urls, params];
      }

      onUploadFile(urls);
    } else {
      fileUploaded = event.target.files[0];
      localImageUrl = URL.createObjectURL(fileUploaded);

      onUploadFile(fileUploaded, localImageUrl);
    }

    event.target.value = null;
  };

  return (
    <Box className={classes.wrapper}>
      <FormGroup
        className={classes.uploadButton}
        onClick={handleClick}
      >
        <div className={`${classes.coverHover} ${disabled ? 'disabled' : ''}`}>
          <i className="fas fa-camera upload-icon"></i>
          <div className='frost'></div>
          {
            preview
              ? (
                <img src={preview} alt="avatar" />
              )
              : (
                <React.Fragment>
                  <i className="far fa-user-circle"></i>
                </React.Fragment>
              )
          }
          <Input
            style={{ display: 'none' }}
            type={'file'}
            innerRef={hiddenFileInput}
            onChange={handleChange}
            accept={accept}
            disabled={disabled}
            {...inputProps}
          />
        </div>
      </FormGroup >
    </Box>
  );
};

AvatarUpload.propTypes = {
  label: PropTypes.string,
  onUploadFile: PropTypes.func,
  accept: PropTypes.string,
  color: PropTypes.string,
  inputProps: PropTypes.any,
  preview: PropTypes.any,
  disabled: PropTypes.bool
};

AvatarUpload.defaultProps = {
  label: '',
  isSubmitting: false,
  color: '',
  onUploadFile: null,
  accept: 'image/jpeg, image/png, image/svg+xml, image/x-icon'
};

export default AvatarUpload;
