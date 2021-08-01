import React from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const ComponentLoading = ({ loadingText }) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
      <Typography variant="h5" style={{ marginLeft: "20px" }}>
        {loadingText ? loadingText : t("label.loading")}
      </Typography>
    </Box>
  );
};

ComponentLoading.propTypes = {
  loadingText: PropTypes.any,
};

export default ComponentLoading;
