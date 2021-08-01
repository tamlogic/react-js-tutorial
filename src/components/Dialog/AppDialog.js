import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AppColor from "../../utilities/AppColor";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: '0.5rem 1rem',
    backgroundColor: AppColor.orange,
    color: AppColor.white,
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    textTransform: 'capitalize',
    fontWeight: '600'
  },
  whiteColor: {
    color: AppColor.white
  },
  closeButton: {
    color: theme.palette.grey[500],
    padding: '0.5rem'
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, closeIconClass, closeTitleClass, titleComponentClass, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classNames([classes.root, titleComponentClass])} {...other}>
      <Typography className={classNames([classes.whiteColor, classes.title, closeTitleClass])} variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon className={classNames([classes.whiteColor, closeIconClass])} />
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

const AppDialog = (props) => {
  const {
    onClose,
    open,
    title,
    children,
    actions,
    noTitle,
    maxWidth = 'xs',
    closeIconClass,
    closeTitleClass,
    titleComponentClass
  } = props;
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth={maxWidth}
      fullWidth={true}
    >
      {
        !noTitle && (
          <DialogTitle
              id="customized-dialog-title"
              onClose={onClose}
              closeIconClass={closeIconClass}
              closeTitleClass={closeTitleClass}
              titleComponentClass={titleComponentClass}
        >
            {title}
          </DialogTitle>
        )
      }
      <DialogContent dividers>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions>
          {actions.map(({ label, onPress }, index) => (
            <Button key={index} autoFocus onClick={onPress} color="primary">
              {label}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
}

AppDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.any,
  noTitle: PropTypes.bool,
  maxWidth: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onPress: PropTypes.func
  })),
  closeIconClass: PropTypes.any,
  closeTitleClass: PropTypes.any,
  titleComponentClass: PropTypes.any
}

export default AppDialog;
