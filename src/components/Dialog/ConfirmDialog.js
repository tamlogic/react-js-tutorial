import { Box, Dialog, DialogContent, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppButton from "components/CustomButtons/AppButton";
import PropTypes from "prop-types";

const Style = {
    page: {

    },
    header: {
    },
    cardImageWrap: {
        position: 'relative',
        marginRight: '0.5rem',
        marginBottom: '0.5rem',
        height: '114px',
        minWidth: '30%',
        maxHeight: '116px',
        borderRadius: '1rem',
        flex: '1 0 0'
    },
    cardImage: {
        objectFit: 'cover',
        width: '100%',
        borderRadius: '1rem',
        height: '100%'
    },
    unselected: {
        opacity: 0.5
    }
}

const ConfirmDialog = props => {
    const {
        onSubmit,
        isShowDialog,
        message,
        onOpenChange
    } = props;

    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const question = 'Are you sure you want to delete: ';

    useEffect(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        setIsOpen(isShowDialog);
    }, [isShowDialog]);

    const handleSubmit = () => {
        onOpenChange(false);
        onSubmit && onSubmit();
    }

    const handleCloseDialog = () => {
        setIsOpen(false);
        onOpenChange(false);
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => handleCloseDialog()}
            aria-labelledby="Withdraw payment method"
            PaperProps={{
                style: {
                    borderRadius: "17px",
                    margin: "10px",
                    width: '80%'
                },
            }}
            disableBackdropClick={true}
        >
            <DialogContent>
                <Box style={{
                    textAlign: 'center'
                }}>
                    <span>{question}</span>                    
                    {message && <span style={{ fontWeight: 700, wordBreak: 'break-word' }}>{message}</span>}
                    {"?"}
                </Box>
                <Box display="flex" justifyContent="flex-end" my={2}>
                    <AppButton
                        label={`${t("button.delete")}`}
                        onClick={() => handleSubmit()}
                        rounder
                        style={{ textTransform: "uppercase", marginRight: '0.5rem' }}
                        buttonColor={'red'}
                    />
                    <AppButton
                        label={`${t("button.cancel")}`}
                        onClick={() => handleCloseDialog()}
                        rounder
                        style={{ textTransform: "uppercase" }}
                        buttonColor={'grey'}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    )
}

ConfirmDialog.propTypes = {
    onSubmit: PropTypes.func,
    onOpenChange: PropTypes.func,
    classes: PropTypes.any,
    message: PropTypes.string,
    isShowDialog: PropTypes.bool
  };

export default withStyles(Style)(props => (<ConfirmDialog {...props} />));