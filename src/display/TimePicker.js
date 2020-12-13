import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {addCalendarEvent} from '../pages/calendar/Calendar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';




function TimePicker({rowData }) {
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);
const classes = useStyles();
  const [state, setState] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    return function cleanup() {
      setState("");
    };
  }, [rowData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state)
    addCalendarEvent(state,address, rowData.name)
    setState('');
    setAddress('');
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

        <Button onClick={handleClickOpen} color="primary" variant="outlined">
         Add Event
        </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add Event To Google Calendar
        </DialogTitle>
        <DialogContent>
          <div className="container">
          <form className={classes.container} noValidate>
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            defaultValue={new Date()}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>{setState(event.target.value)}}
          />
        </form>
       
          </div>
          <TextField
          margin="dense"
          name="address"
          label="Where?"
          type="text"
          value={address}
          onChange={(event)=>{setAddress(event.target.value)}}
          fullWidth
          className="field"
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="outlined">
          Add Event
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TimePicker;
