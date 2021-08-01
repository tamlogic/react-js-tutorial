import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { showToast } from "store/slices/toast";
import { useDispatch } from 'react-redux';

const UploadButtonStyle = {
    uploadButton: {
        marginRight: '0.5rem',
        width: '88px',
        height: '114px',
        minWidth: '88px',
        minHeight: '114px',
        borderRadius: '1rem',
        border: '1px solid #1F417C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};
const ProductImageUpload = props => {
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

        for(let image of event.target.files) {
            if(!accept.includes(image.type)) {
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
            <Add />
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

ProductImageUpload.propTypes = {
    label: PropTypes.string,
    onUploadFile: PropTypes.func,
    className: PropTypes.string,
    accept: PropTypes.string,
    color: PropTypes.string,
    inputProps: PropTypes.any,
    style: PropTypes.any
};

ProductImageUpload.defaultProps = {
    label: '',
    isSubmitting: false,
    color: '',
    onUploadFile: null,
    accept: ''
};

export default ProductImageUpload;
