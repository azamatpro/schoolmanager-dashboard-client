import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Define the types for the props
interface CustomAlertProps {
    alert: 'error' | 'warning' | 'info' | 'success';
    message: string | null;
}

export default function CustomAlert({ alert, message }: CustomAlertProps) {
    return (
        <Stack
            sx={{
                width: window.innerWidth <= 600 ? '80%' : '45%',
                position: 'absolute',
                left: '50%',
                top: '1%',
                transform: 'translateX(-50%)',
                zIndex: 9999,
            }}
            spacing={2}>
            <Alert severity={alert}>{message}</Alert>
        </Stack>
    );
}
