const TableUtil = {
  descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] === null || a[orderBy] === null || b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  },

  getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => TableUtil.descendingComparator(a, b, orderBy)
      : (a, b) => -TableUtil.descendingComparator(a, b, orderBy);
  },

  stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  },
};

export default TableUtil;
