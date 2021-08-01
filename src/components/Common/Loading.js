import React from "react";
import { Box, CircularProgress, Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const Loading = (props) => {
  const { t } = useTranslation();
  return (
    <Box
      style={{ height: "100vh" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper style={{ padding: "20px" }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
          <Typography variant="h5" style={{ marginLeft: "20px" }}>
            {t("label.loading")}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Loading;
