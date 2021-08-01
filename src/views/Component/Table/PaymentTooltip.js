import React from "react";
import PropTypes from "prop-types";
import ComponentLoading from "../../../../components/Common/ComponentLoading";
import { Box, Divider, IconButton, Typography } from "@material-ui/core";
import AppUtil from "../../../../utilities/AppUtil";
import HtmlTooltip from "../../../../components/Tooltip/HtmlTooltip";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getSellerDetail } from "../../../../store/slices/seller";
import { Close } from "@material-ui/icons";

const PaymentTooltip = (props) => {
  const {
    onOpen,
    tooltipLoading,
    classes,
    children,
    open,
    onClose,
    PopperProps,
    showCloseButton,
    ...rest
  } = props;
  const { t } = useTranslation();
  const sellerDetail = useSelector(getSellerDetail);
  return (
    <HtmlTooltip
      onOpen={onOpen}
      onClose={onClose}
      open={open}
      PopperProps={PopperProps}
      title={
        tooltipLoading ? (
          <ComponentLoading />
        ) : (
          <Box pt={2} pb={1} px={1}>
            {showCloseButton && (
              <IconButton
                onClick={onClose}
                style={{ position: "absolute", right: -7, top: 5 }}
              >
                <Close />
              </IconButton>
            )}
            <Typography variant="h6">
              <strong>{t("label.payment_account")}</strong>
            </Typography>
            <Typography variant="body1">
              <strong>{`${t("label.available_balance")} : `}</strong>
              {`${t("label.s$")}${AppUtil.formatMoney(
                sellerDetail.availableBalance
              )}`}
            </Typography>
            {sellerDetail.withdrawType && sellerDetail.withdrawType === 1 && (
              <div>
                <Divider className={classes.divider} />
                <Typography variant="h6" className="mb-2">
                  <strong>{t("label.pay_now")}</strong>
                </Typography>
                <Typography variant="body1">
                  <strong>{`${t("label.mobile_no")} : `}</strong>
                  {`${sellerDetail.payNowPhoneNumber || "N/A"}`}
                </Typography>
                <Typography variant="body1">
                  <strong>{`${t("label.uen_no")} : `}</strong>
                  {`${sellerDetail.payNowUenNumber || "N/A"}`}
                </Typography>
              </div>
            )}
            {sellerDetail.withdrawType && sellerDetail.withdrawType === 2 && (
              <div>
                <Divider className={classes.divider} />
                <Typography variant="h6" className="mb-2">
                  <strong>{t("label.bank_account_detail")}</strong>
                </Typography>
                <Typography variant="body1">
                  <strong>{`${t("label.account_holder_name")} : `}</strong>
                  {`${sellerDetail.bankHolderName || "N/A"}`}
                </Typography>
                <Typography variant="body1">
                  <strong>{`${t("label.bank_name")} : `}</strong>
                  {`${sellerDetail.bankName || "N/A"}`}
                </Typography>
                <Typography variant="body1">
                  <strong>{`${t("label.account_number")} : `}</strong>
                  {`${sellerDetail.bankAccountNumber || "N/A"}`}
                </Typography>
              </div>
            )}
          </Box>
        )
      }
      {...rest}
    >
      {children}
    </HtmlTooltip>
  );
};

PaymentTooltip.propTypes = {
  classes: PropTypes.object,
  style: PropTypes.object,
  onOpen: PropTypes.func,
  tooltipLoading: PropTypes.bool,
  children: PropTypes.any,
  open: PropTypes.bool,
  PopperProps: PropTypes.object,
  onClose: PropTypes.func,
  showCloseButton: PropTypes.bool,
};

export default PaymentTooltip;
