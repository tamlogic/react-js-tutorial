import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslation } from "react-i18next";
import AppButton from 'components/CustomButtons/AppButton';
import AppColor from 'utils/AppColor';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        backgroundColor: AppColor.orange,
        color: AppColor.white
    },
    title: {
        textTransform: 'capitalize',
        fontWeight: '600'
    },
    whiteColor: {
        color: AppColor.white
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography className={classNames([classes.whiteColor, classes.title])} variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon className={classes.whiteColor} />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const useStyles = makeStyles(styles);

const AppConfirmDialog = (props) => {
    const {
        onClose,
        onConfirm,
        open,
        title,
        content,
        confirmLabel,
        cancelLabel
    } = props;
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            disableBackdropClick
            disableEscapeKeyDown
        >
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                {title}
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    {content}
                </Typography>
            </DialogContent>
            <DialogActions>
                <AppButton
                    rounder
                    onClick={onConfirm}
                    buttonColor={AppColor.orange}
                    label={confirmLabel ? confirmLabel : t('button.yes')}
                />
                <AppButton
                    rounder
                    onClick={onClose}
                    buttonColor={AppColor.greyDark}
                    label={cancelLabel ? cancelLabel : t('button.cancel')}
                />
            </DialogActions>
        </Dialog>
    );
}

AppConfirmDialog.propTypes = {
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string
}

export default AppConfirmDialog;
