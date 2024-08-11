import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Container,
    Typography,
    Box,
    FormControl,
    FormLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../../../../utils/authorization';
import Loader from '../../../../components/Loader';
import CustomAlert from '../../../../components/Alert';
import axios from 'axios';
import CustomPopup from '../../../../components/popup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useDispatch } from 'react-redux';
import { setAgree } from '../../../../redux/popup/popupSlice';

interface SchoolDetails {
    name: string;
    phoneNumber: string;
    address: string;
    ownerId: string;
}

const formData = {
    name: '',
    phoneNumber: '',
    address: '',
    ownerId: '',
};

interface AlertState {
    type: 'error' | 'warning' | 'info' | 'success';
    message: string;
    show: boolean;
}
interface DialogState {
    open: boolean;
    message: string;
    persona: string;
}

function EditAdminstrator() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [schoolDetails, setSchoolDetails] = useState<SchoolDetails>(formData);
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<AlertState>({ type: 'success', message: '', show: false });
    const [dialog, setDialog] = useState<DialogState>({ open: false, message: '', persona: '' });
    const { agree } = useSelector((state: RootState) => state.popup);
    const dispatch = useDispatch();

    const token = getToken('userToken');

    const fetchschoolDetails = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/owner/school_router/get/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (!res.ok) {
                setLoading(false);
                setAlert({ type: 'error', message: data.detail, show: true });
                return;
            }

            // Map server response to formData
            setSchoolDetails({
                name: data.name || '',
                address: data.address || '',
                ownerId: data.owner_id || '',
                phoneNumber: data.phone_number || '',
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setAlert({ type: 'error', message: 'Could not fetch school details, Please try again!', show: true });
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setSchoolDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/owner/school_router/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: schoolDetails.name,
                    address: schoolDetails.address,
                    phone_number: schoolDetails.phoneNumber,
                    owner_id: schoolDetails.ownerId,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                setLoading(false);
                setAlert({ type: 'error', message: data.detail, show: true });
                return;
            }

            setLoading(false);
            setSchoolDetails(formData);
            navigate('/apps/schools');
        } catch (error) {
            setLoading(false);
            setAlert({
                type: 'error',
                message: 'Could not update admin, Please try with correct details!',
                show: true,
            });
        }
    };

    const handleDelete = async () => {
        setDialog({
            open: true,
            message: `Are you sure to delete the ${schoolDetails.name}?`,
            persona: 'administrator',
        });
    };

    const handleBack = () => {
        navigate('/apps/schools');
    };

    useEffect(() => {
        if (id) {
            fetchschoolDetails();
        }
    }, [id]);

    useEffect(() => {
        if (agree) {
            const deletePersona = async () => {
                try {
                    setLoading(true);
                    const res = await axios.delete(
                        `${process.env.REACT_APP_BASE_SERVER_URL}/owner/school_router/delete/${id}`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (res.status === 200) {
                        setAlert({ type: 'success', message: 'School deleted successfully!', show: true });
                        navigate('/apps/schools');
                    } else {
                        setAlert({ type: 'error', message: 'Could not delete!', show: true });
                    }
                } catch (error) {
                    setAlert({ type: 'error', message: 'Error occurred during deletion!', show: true });
                } finally {
                    setLoading(false);
                    dispatch(setAgree(false));
                }
            };

            deletePersona();
        }
    }, [agree, dispatch, id, navigate, token]);

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert((prevAlert) => ({ ...prevAlert, show: false }));
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alert.show]);

    return (
        <Paper sx={{ width: '100%' }}>
            <Box sx={{ mt: 4, borderRadius: 1.5, bgcolor: '#ffffff' }}>
                <Box sx={{ p: 2.5, borderBottom: '1px solid lightgray' }}>
                    <Typography sx={{ fontSize: '1rem' }} variant="h6">
                        Basic Info
                    </Typography>
                </Box>
                {loading && <Loader />}
                {alert.show && <CustomAlert alert={alert.type} message={alert.message} />}
                {dialog.open && <CustomPopup dialog={dialog} setDialog={setDialog} />}
                <form onSubmit={handleSubmit}>
                    <Grid sx={{ p: 2.5 }} container rowSpacing={1.5} columnSpacing={4}>
                        {/* Render form fields with values from schoolDetails */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>Name</FormLabel>
                                <TextField
                                    name="name"
                                    fullWidth
                                    value={schoolDetails.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Update Name"
                                    InputProps={{
                                        sx: {
                                            height: '40px',
                                            padding: 0,
                                            boxSizing: 'border-box',
                                        },
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        {/* Add other form fields similarly */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>Address</FormLabel>
                                <TextField
                                    name="address"
                                    fullWidth
                                    value={schoolDetails.address}
                                    onChange={handleChange}
                                    required
                                    placeholder="Update Address"
                                    InputProps={{
                                        sx: {
                                            height: '40px',
                                            padding: 0,
                                            boxSizing: 'border-box',
                                        },
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    Phone Number
                                </FormLabel>
                                <TextField
                                    name="phoneNumber"
                                    fullWidth
                                    value={schoolDetails.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="Update Phone Number"
                                    InputProps={{
                                        sx: {
                                            height: '40px',
                                            padding: 0,
                                            boxSizing: 'border-box',
                                        },
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        {/* Actions */}
                        <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                            <Button onClick={handleBack} sx={{ width: '7rem' }} variant="outlined" color="secondary">
                                Back
                            </Button>

                            <Button type="submit" variant="outlined" sx={{ mx: 2, width: '7rem' }}>
                                Update
                            </Button>

                            <Button
                                onClick={handleDelete}
                                sx={{ width: '7rem' }}
                                color="error"
                                variant="outlined"
                                startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Paper>
    );
}

export default EditAdminstrator;
