import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDispatch } from 'react-redux';
import { setAgree } from '../../redux/popup/popupSlice';
interface DialogProps {
    open: boolean;
    message: string;
    persona: string;
}
interface CustomPopupProps {
    dialog: DialogProps;
    setDialog: React.Dispatch<React.SetStateAction<DialogProps>>;
}

export default function CustomPopup({ dialog, setDialog }: CustomPopupProps) {
    const { open, message, persona } = dialog;
    const dispatch = useDispatch();

    const handleAgree = async () => {
        dispatch(setAgree(true));
        setDialog({ ...dialog, open: false });
    };
    const handleDisagree = () => {
        dispatch(setAgree(false));
        setDialog({ ...dialog, open: false });
    };
    const handleClose = () => {
        setDialog({ ...dialog, open: false });
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{`Do you want to delete ${persona}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree}>No</Button>
                    <Button onClick={handleAgree} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
