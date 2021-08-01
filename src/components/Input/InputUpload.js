import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { showToast } from "store/slices/toast";
import { useDispatch } from 'react-redux';
import { IMAGE_ACCEPT } from 'config/AppConfig';
import { Box, makeStyles } from '@material-ui/core';
import AppColor from 'utilities/AppColor';

const styles = makeStyles(() => ({
  uploadButton: {
    marginRight: '0.5rem',
    width: '100%',
    height: '114px',
    minWidth: '88px',
    minHeight: '114px',
    borderRadius: '0.25rem',
    border: '1px dashed #1F417C',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    cursor: 'pointer'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  fileName: {
    wordBreak: 'break-word',
    padding: '1rem',
    display: 'flex',
    fontSize: '0.8rem',
    '& .icon': {
      fontSize: '1.5rem'
    }
  },
  warning: {
    fontSize: '0.6rem',
    color: AppColor.red
  }
}));

const InputUpload = props => {
  const {
    onUploadFile,
    accept,
    inputProps = {},
    field,
    form,
    className,
    disabled
  } = props;

  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const classes = styles();

  const hiddenFileInput = React.useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    let fileUploaded;
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
          message: t("validation.invalidFile", {data: generateFileType()}),
        })
      );
      return;
    }

    let newValue;

    if (inputProps.multiple) {
      newValue = [];
      fileUploaded = event.target.files;
      for (let item of fileUploaded) {
        let localUrl = URL.createObjectURL(item);
        let params = {
          file: item,
          url: localUrl
        }
        newValue = [...newValue, params];
      }
    } else {
      fileUploaded = event.target.files[0];
      newValue = fileUploaded;
    }

    const changeEvent = {
      target: {
        name: name,
        value: newValue
      }
    };
    field.onChange(changeEvent);
    onUploadFile && onUploadFile(newValue);
  };

  const renderValue = (value) => {
    if (!value) {
      return;
    }
    if (value.name && value.type) {
      if (IMAGE_ACCEPT.includes(value.type)) {
        return (
          <img src={URL.createObjectURL(value)} alt="avatar" className={classes.image} />
        )
      }
      return (
        <div className={classes.fileName}>
          <i className="far fa-file-pdf mr-2 icon" style={{ color: AppColor.red }}></i>
          <span>{value.name}</span>
        </div>
      )
    }
    if (value.includes('.pdf')) {
      return (
        <div className={classes.fileName}>
          <i className="far fa-file-pdf mr-2 icon" style={{ color: AppColor.red }}></i>
          <span>{value}</span>
        </div>
      )
    }
    return (
      <img src={`${process.env.REACT_APP_UPLOAD_IMAGE}${process.env.REACT_APP_VERIFICATION_PATH}${value}`} alt="verification" className={classes.image} />
    )
  }

  const generateFileType = () => {
    let str = '';
    const accepts = accept.split(', ');
    accepts.map((item, index) => {
      const type = ` ${item.split('/')[1]}${index + 1 < accept.split(',').length ? ', ' : ''}`;
      str += type;
      return type;
    });
    return str;
  }

  return (
    <FormGroup
      onClick={handleClick}
    >
      <Box className={`${className} ${classes.uploadButton} ${disabled ? 'disabled' : ''}`}>
        {
          value
            ? renderValue(value)
            : (
              <React.Fragment>
                <i className="fas fa-upload"></i>
                <Box className={classes.warning}>
                  {t('text.onlyAllowUpload')}
                  {
                    accept.split(', ').map((item, index) => (
                      <span key={`accept-${index}`}>{` ${item.split('/')[1]}${index + 1 < accept.split(',').length ? ', ' : ''}`}</span>
                    ))
                  }
                  {` ${t('text.file')}`}
                </Box>
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
      </Box>
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
};

InputUpload.propTypes = {
  label: PropTypes.string,
  onUploadFile: PropTypes.func,
  className: PropTypes.string,
  accept: PropTypes.string,
  color: PropTypes.string,
  inputProps: PropTypes.any,
  field: PropTypes.object,
  form: PropTypes.object,
  disabled: PropTypes.bool
};

InputUpload.defaultProps = {
  label: '',
  isSubmitting: false,
  color: '',
  onUploadFile: null,
  accept: 'image/jpeg, image/png, application/pdf'
};

export default InputUpload;
