import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function BasicModal({setIsOpen , isOpen}) {


  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth={'sm'}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Kömek"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="div-for-sircle" id="alert-dialog-description">
            <div className="green-sircle-in-modal"></div>
            Doly öwrenilen sözler
          </DialogContentText>
          <DialogContentText className="div-for-sircle" id="alert-dialog-description">
            <div className="yellow-sircle-in-modal"></div>
            Doly öwrenilmedik sözler
          </DialogContentText>
          <DialogContentText className="div-for-sircle" id="alert-dialog-description" >
           <div className="grey-sircle-in-modal"></div>
            Öwrenilmedik sözler
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Bolya</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
