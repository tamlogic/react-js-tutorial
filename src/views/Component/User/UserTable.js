import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Box, Checkbox, LinearProgress } from "@material-ui/core";
import * as _ from 'lodash';
import PropTypes from "prop-types";

import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

import AppUtil from "utilities/AppUtil";
import AppTable from "../Table/AppTable";
import TablePaginationActions from "../Table/TablePaginationActions";
import InputSearch from "components/Input/InputSearch";
import {
  fetchListUserHospital
} from "store/slices/company";
import AppConfirmDialog from "components/Dialog/AppConfirmDialog";

const headCells = [
  {
    id: "name",
    numeric: "left",
    disablePadding: false,
    label: "label.name",
    sort: true,
  },
  {
    id: "email",
    numeric: "left",
    disablePadding: false,
    label: "label.email",
    sort: true,
  },
  {
    id: "role",
    numeric: "left",
    disablePadding: false,
    label: "label.role",
    sort: true,
  }
];

const UserTable = (props) => {
  const {
    clientId
  } = props
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [queries, setQueries] = useState({
    asc_sort: true,
    page: 1,
    size: 10,
    search_key: "",
    sort_field: "mailAddress",
  });

  const loadUserList = async() => {
    dispatch(fetchListUserHospital);
  }
  // const clientList = useSelector(getUserHospitalList);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientList, setClientList] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  const emptyRows = data.length === 0;

  const _handleDeleteClients = () => {

    setShowDeleteModal(false);
  }

  const _handleSelect = (id) => {
    if (!selected.includes(id)) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter(item => item !== id))
    }
  }

  const _handleSelectAll = () => {
    if (data.length === selected.length) {
      setSelected([]);
    } else {
      setSelected(_.union(selected, data.map(item => item.id)));
    }
  }

  const handleChangePage = (event, newPage) => {
    _loadData({ ...queries, page: newPage + 1 });
    AppUtil.scrollToTopById("main-panel");
  };

  const handleChangeRowsPerPage = (event) => {
    _loadData({
      ...queries,
      page: 1,
      size: parseInt(event.target.value),
    });
    AppUtil.scrollToTopById("main-panel");
  };

  const onRequestSort = (event, property) => {
    _loadData({
      ...queries,
      sort_field: property,
      asc_sort:
        property === queries.sort_field ? queries.asc_sort !== true : true,
    });
  };

  const onSearch = (value) => {
    setSearchKey(value);
    _loadData({
      ...queries,
      search_key: value,
      page: 1,
    });
  };

  const _loadData = async ({ page, size, search_key, asc_sort, sort_field } = {}) => {
    const newQueries = {
      ...queries,
    };
    if (page) {
      newQueries.page = page;
    }
    if (size) {
      newQueries.size = size;
    }
    if (sort_field) {
      newQueries.sort_field = sort_field;
    }
    newQueries.search_key = search_key || "";
    newQueries.asc_sort = !(!asc_sort || false);
    setLoading(true);
    dispatch(fetchListUserHospital({ ...newQueries, clientId }))
      .then(({ payload }) => {
        console.log('length ', payload.totalElements);
        console.log('payload ', payload);
        setQueries(newQueries);
        setClientList(payload.content);
        setLoading(false);
        if (payload) {
          setTotalElements(payload.totalElements);
        }
      });
  };

  useEffect(() => {
    _loadData({
      page: 1,
      size: 10,
      sort_field: "createdDate",
      asc_sort: false,
    });
  }, []);

  useEffect(() => {
    if (clientList)
      setData(clientList);
  }, [clientList]);

  return (
    <div>
      <Box mb={3}>
        <strong>
          {t("title.hospitalUserList")}
        </strong>
      </Box>
      <Box my={3}>
        <InputSearch
          onSearch={onSearch}
          searchText={searchKey}
        />
      </Box>
      <AppTable
        onRequestSort={onRequestSort}
        order={queries.asc_sort === true ? "asc" : "desc"}
        orderBy={queries.sort_field}
        rowCount={data.length}
        headCells={headCells}
        numSelected={selected.length}
        onSelectAllClick={_handleSelectAll}
      >
        <TableBody>
          {loading && (<TableRow>
            <TableCell colSpan={7} padding="none">
              <LinearProgress />
            </TableCell>
          </TableRow>)}
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.indexOf(row.id) !== -1}
                  inputProps={{ 'aria-labelledby': row.id }}
                  onClick={() => _handleSelect(row.id)}
                  color="primary"
                />
              </TableCell>
              <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
              <TableCell>{row.mailAddress}</TableCell>
              <TableCell>
                label.admin
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 }}>
              <TableCell colSpan={headCells.length} className="text-center">
                {t("label.no_data")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={headCells.length}
              count={totalElements}
              rowsPerPage={queries.size}
              page={queries.page - 1}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              labelRowsPerPage={`${t("label.rows_per_page")}:`}
              labelDisplayedRows={({ from, to, count }) =>
                t("label.from_to", {
                  from,
                  to,
                  count:
                    count !== -1 ? count : `${t("text.more_than")} ${to}`,
                })
              }
            />
          </TableRow>
        </TableFooter>
      </AppTable>
      <AppConfirmDialog
        open={showDeleteModal}
        onConfirm={() => _handleDeleteClients()}
        onClose={() => setShowDeleteModal(false)}
        title={t('title.delete_clients')}
        content={t('text.delete_clients')}
      />
    </div>
  );
};

UserTable.propTypes = {
  clientId: PropTypes.any
};

export default UserTable;
