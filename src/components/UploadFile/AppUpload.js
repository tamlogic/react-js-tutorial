import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { showToast } from "store/slices/toast";
import { useDispatch } from 'react-redux';

const UploadButtonStyle = {
  uploadButton: {
    marginRight: '0.5rem',
    width: '100%',
    height: '114px',
    minWidth: '88px',
    minHeight: '114px',
    borderRadius: '0.25rem',
    border: '1px dashed #1F417C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    cursor: 'pointer'
  }
};
const AppUpload = props => {
  const {
    onUploadFile,
    className,
    accept,
    inputProps = {},
    style
  } = props;

  const hiddenFileInput = React.useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
    <FormGroup
      style={{ ...UploadButtonStyle.uploadButton, ...style }}
      className={className}
      onClick={handleClick}
    >
      <i className="fas fa-upload"></i>
      <Input
        style={{ display: 'none' }}
        type={'file'}
        innerRef={hiddenFileInput}
        onChange={handleChange}
        accept={accept}
        {...inputProps}
      />
    </FormGroup>
  );
};

AppUpload.propTypes = {
  label: PropTypes.string,
  onUploadFile: PropTypes.func,
  className: PropTypes.string,
  accept: PropTypes.string,
  color: PropTypes.string,
  inputProps: PropTypes.any,
  style: PropTypes.any
};

AppUpload.defaultProps = {
  label: '',
  isSubmitting: false,
  color: '',
  onUploadFile: null,
  accept: 'image/jpeg, image/png, application/pdf'
};

export default AppUpload;
