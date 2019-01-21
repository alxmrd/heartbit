import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Activity from "./Activity";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import {
  SearchOnVolunteers,
  fetchVolunteers,
  errorMessageCleaner
} from "../../store/actions/actions";
import MySnackbarContentWrapper from "../MySnackbarContentWrapper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    float: "right"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  search: {
    padding: "2px 4px",
    display: "flex",
    grow: 1,
    alignItems: "center",
    width: 400,
    marginRight: 20,
    marginTop: 20,
    float: "right"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});
const actionsStyles = theme => ({
  footer: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.footer}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);
class VolunteerTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    searched: "",
    reload: true
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSearch = event => {
    event.preventDefault();

    const SearchedInput = { searched: this.state.searched };

    this.props.onSearch(SearchedInput);
    this.setState({
      reload: false
    });
  };
  handleSearchClear = event => {
    event.preventDefault();
    this.setState({
      searched: ""
    });
    this.props.fetchVolunteers();
  };
  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      const SearchedInput = { searched: this.state.searched };

      this.props.onSearch(SearchedInput);
      this.setState({
        reload: false
      });
    }
  }

  render() {
    const {
      tabledata,
      classes,
      onEditClick,
      onRowClick,
      errormessage
    } = this.props;
    const { rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <Paper className={classes.search} elevation={1}>
          <InputBase
            className={classes.input}
            placeholder="Αναζήτηση"
            name="searched"
            value={this.state.searched}
            onChange={this.handleChange}
            onKeyPress={this.enterPressed.bind(this)}
          />
          {this.state.searched.length > 0 && (
            <IconButton
              color="inherit"
              className={classes.iconButton}
              aria-label="Directions"
            >
              <CloseIcon
                // className={classes.searchIcon}
                aria-label="Αναζήτηση"
                onClick={this.handleSearchClear}
              />
            </IconButton>
          )}
          <Divider className={classes.divider} />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="Directions"
          >
            <SearchIcon
              // className={classes.searchIcon}
              aria-label="Αναζήτηση"
              onClick={this.handleSearch}
            />
          </IconButton>
          <Divider className={classes.divider} />
          <IconButton
            color="primary"
            disabled={this.state.reload}
            className={classes.iconButton}
            aria-label="Directions"
            onClick={this.handleSearchClear}
          >
            <i className="material-icons">history</i>
          </IconButton>
        </Paper>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Όνομα</TableCell>
              <TableCell>Επώνυμο</TableCell>
              <TableCell>Εmail</TableCell>
              <TableCell>Ημερομηνία Γέννησης</TableCell>
              <TableCell>Περιφέρεια</TableCell>

              <TableCell>Κατάσταση Δραστηριότητας</TableCell>
              <TableCell>Επεξεργασία</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabledata
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    key={row.id}
                    onClick={() => onRowClick(row.id)}
                    className={classes.row}
                    hover
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.surname}</TableCell>
                    <TableCell>{row.email}</TableCell>

                    <TableCell>{row.dateofbirth}</TableCell>
                    <TableCell>{row.location}</TableCell>

                    <Activity volunteerid={row.id} volstatus={row.status} />

                    <TableCell>
                      <IconButton
                        onClick={e => onEditClick(e, row.id)}
                        color="inherit"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>

          <TableFooter className={classes.tableWrapper}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={tabledata.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: false
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={errormessage ? true : false}
          autoHideDuration={6000}
          onClose={errormessage =>
            this.props.onErrorMessageCleaner(errormessage)
          }
        >
          <MySnackbarContentWrapper
            onClose={errormessage =>
              this.props.onErrorMessageCleaner(errormessage)
            }
            variant="error"
            className={classes.margin}
            message={errormessage}
          />
        </Snackbar>
      </Paper>
    );
  }
}

VolunteerTable.propTypes = {
  tabledata: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  fetchVolunteers: PropTypes.func.isRequired,
  errormessage: PropTypes.string,
  onErrorMessageCleaner: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  id: state.id,
  errormessage: state.error.message,
  errorcode: state.error.httpstatus,
  data: state.volunteers,
  volunteerData:
    state.volunteers.filter(volunteer => volunteer.id === state.id)[0] || {}
});

const mapDispatchToProps = dispatch => ({
  onSearch: SearchedInput => dispatch(SearchOnVolunteers(SearchedInput)),
  fetchVolunteers: () => fetchVolunteers(dispatch),
  onErrorMessageCleaner: errormessage =>
    dispatch(errorMessageCleaner(errormessage))
});

const VolunteerTableWithStyles = withStyles(styles)(VolunteerTable);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolunteerTableWithStyles);
