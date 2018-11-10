// import React from "react";
// import classNames from "classnames";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";

// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import DeleteIcon from "@material-ui/icons/Delete";
// import FilterListIcon from "@material-ui/icons/FilterList";
// import { lighten } from "@material-ui/core/styles/colorManipulator";
// import { connect } from "react-redux";
// import {
//   fetchVolunteers,
//   NewVolunteer
// } from "/Users/alxmrd/projects/heartbit/src/store/actions/actions";

// const rows = [
//   {
//     id: "id",
//     disablePadding: true,
//     label: "id"
//   },
//   {
//     id: "username",
//     disablePadding: false,
//     label: "Username"
//   },
//   { id: "password", disablePadding: false, label: "Password" },
//   { id: "tel1", disablePadding: false, label: "Tel1" },
//   { id: "tel2", disablePadding: false, label: "Tel2" },
//   { id: "name", disablePadding: false, label: "Name" },
//   { id: "surname", disablePadding: false, label: "Surname" },
//   { id: "email", disablePadding: false, label: "Email" },
//   { id: "notes", disablePadding: false, label: "Notes" },
//   {
//     id: "latesttraining",
//     disablePadding: false,
//     label: "Latest Training"
//   },
//   {
//     id: "dateofbirth",
//     disablePadding: false,
//     label: "Date of Birth"
//   },
//   { id: "address", disablePadding: false, label: "Address" }
// ];

// class EnhancedTableHead extends React.Component {
//   render() {
//     return (
//       <TableHead>
//         <TableRow>
//           <TableCell padding="checkbox" />
//           {rows.map(row => {
//             return (
//               <TableCell
//                 key={row.id}
//                 padding={row.disablePadding ? "none" : "default"}
//               >
//                 {row.label}
//               </TableCell>
//             );
//           }, this)}
//         </TableRow>
//       </TableHead>
//     );
//   }
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,

//   rowCount: PropTypes.number.isRequired
// };

// const toolbarStyles = theme => ({
//   root: {
//     paddingRight: theme.spacing.unit
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85)
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark
//         },
//   spacer: {
//     flex: "1 1 100%"
//   },
//   actions: {
//     color: theme.palette.text.secondary
//   },
//   title: {
//     flex: "0 0 auto"
//   }
// });

// let EnhancedTableToolbar = props => {
//   const { numSelected, classes } = props;

//   return (
//     <Toolbar
//       className={classNames(classes.root, {
//         [classes.highlight]: numSelected > 0
//       })}
//     >
//       <div className={classes.title}>
//         {numSelected > 0 ? (
//           <Typography color="inherit" variant="subtitle1">
//             {numSelected} selected
//           </Typography>
//         ) : (
//           <Typography variant="h6" id="tableTitle">
//             Volunteer
//           </Typography>
//         )}
//       </div>
//       <div className={classes.spacer} />
//       <div className={classes.actions}>
//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton aria-label="Delete">
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Filter list">
//             <IconButton aria-label="Filter list">
//               <FilterListIcon />
//             </IconButton>
//           </Tooltip>
//         )}
//       </div>
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired
// };

// EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

// const styles = theme => ({
//   root: {
//     width: "100%",
//     marginTop: theme.spacing.unit * 3
//   },
//   table: {
//     minWidth: 1020
//   },
//   tableWrapper: {
//     overflowX: "auto"
//   }
// });

// class EnhancedTable extends React.Component {
//   state = {
//     selected: [],
//     data: [],
//     page: 0,
//     rowsPerPage: 5
//   };
//   componentWillMount() {
//     this.props.fetchVolunteers();
//   }

//   handleClick = (event, id) => {
//     const { selected } = this.state;
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];
//     console.log(selected, "selected");
//     console.log(selectedIndex, "selectedIndex");

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     this.setState({ selected: newSelected });
//   };

//   handleChangePage = (event, page) => {
//     this.setState({ page });
//   };

//   handleChangeRowsPerPage = event => {
//     this.setState({ rowsPerPage: event.target.value });
//   };

//   isSelected = id => this.state.selected.indexOf(id) !== -1;

//   render() {
//     const { classes, data } = this.props;
//     const { selected, rowsPerPage, page } = this.state;
//     const emptyRows =
//       rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

//     return (
//       <Paper className={classes.root}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <div className={classes.tableWrapper}>
//           <Table className={classes.table} aria-labelledby="tableTitle">
//             <EnhancedTableHead
//               numSelected={selected.length}
//               onRequestSort={this.handleRequestSort}
//               rowCount={data.length}
//             />
//             <TableBody>
//               {data
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map(n => {
//                   const isSelected = this.isSelected(n.id);
//                   return (
//                     <TableRow
//                       hover
//                       onClick={event => this.handleClick(event, n.id)}
//                       role="checkbox"
//                       aria-checked={isSelected}
//                       tabIndex={-1}
//                       key={n.id}
//                       selected={isSelected}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox checked={isSelected} />
//                       </TableCell>
//                       <TableCell component="th" scope="row" padding="none">
//                         {n.id}
//                       </TableCell>
//                       <TableCell>{n.username}</TableCell>
//                       <TableCell>{n.password}</TableCell>
//                       <TableCell>{n.tel1}</TableCell>
//                       <TableCell>{n.tel2}</TableCell>
//                       <TableCell>{n.name}</TableCell>
//                       <TableCell>{n.surname}</TableCell>
//                       <TableCell>{n.email}</TableCell>
//                       <TableCell>{n.notes}</TableCell>
//                       <TableCell>{n.latesttraining}</TableCell>
//                       <TableCell>{n.dateofbirth}</TableCell>
//                       <TableCell>{n.address}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: 49 * emptyRows }}>
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//         <TablePagination
//           component="div"
//           count={data.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           backIconButtonProps={{
//             "aria-label": "Previous Page"
//           }}
//           nextIconButtonProps={{
//             "aria-label": "Next Page"
//           }}
//           onChangePage={this.handleChangePage}
//           onChangeRowsPerPage={this.handleChangeRowsPerPage}
//         />
//       </Paper>
//     );
//   }
// }

// EnhancedTable.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// const EnhancedTableWithStyles = withStyles(styles)(EnhancedTable);

// // Container !!
// const mapStateToProps = state => ({
//   data: state.volunteers
// });

// const mapDispatchToProps = dispatch => ({
//   fetchVolunteers: () => fetchVolunteers(dispatch),
//   NewVolunteer: dataPouStelnw => NewVolunteer(dispatch, dataPouStelnw)
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(EnhancedTableWithStyles);
