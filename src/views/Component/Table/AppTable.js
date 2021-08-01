import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import AppTableHead from "./AppTableHead";

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const AppTable = (props) => {
  const classes = useStyles2();
  const {
      onRequestSort,
      order,
      orderBy,
      rowCount,
      headCells,
      numSelected,
      onSelectAllClick,
      checkboxIndeterminate,
      checkboxChecked
  } = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="pagination table">
          <AppTableHead
              onRequestSort={onRequestSort}
              order={order}
              orderBy={orderBy}
              rowCount={rowCount}
              headCells={headCells}
              numSelected={numSelected}
              onSelectAllClick={onSelectAllClick}
              checkboxIndeterminate={checkboxIndeterminate}
              checkboxChecked={checkboxChecked}
          />
        {props.children}
      </Table>
    </TableContainer>
  );
};

AppTable.propTypes = {
    children: PropTypes.any,
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCells: PropTypes.array.isRequired,
    checkboxIndeterminate: PropTypes.bool,
    checkboxChecked: PropTypes.bool,
};

export default AppTable;
