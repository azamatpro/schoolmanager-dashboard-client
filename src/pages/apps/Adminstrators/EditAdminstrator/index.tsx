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

interface AdminDetails {
    username: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    passportNumber: string;
    dateOfBirth: string;
    gender: string;
    education: string;
    schoolId: string;
}

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

const formData = {
    fullName: '',
    username: '',
    phoneNumber: '',
    passportNumber: '',
    dateOfBirth: '',
    gender: '',
    education: '',
    schoolId: '',
    password: '',
};

function EditAdminstrator() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [adminDetails, setAdminDetails] = useState<AdminDetails>(formData);
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<AlertState>({ type: 'success', message: '', show: false });
    const [dialog, setDialog] = useState<DialogState>({ open: false, message: '', persona: '' });
    const { agree } = useSelector((state: RootState) => state.popup);
    const dispatch = useDispatch();

    const token = getToken('userToken');

    const fetchAdminDetails = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/owner/administrator_router/get/${id}`, {
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
            setAdminDetails({
                fullName: data.full_name || '',
                username: data.username || '',
                password: data.password || '',
                phoneNumber: data.phone_number || '',
                passportNumber: data.passport_number || '',
                dateOfBirth: data.date_of_birth || '',
                gender: data.gender || '',
                education: data.education || '',
                schoolId: data.school_id ? data.school_id.toString() : '',
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setAlert({ type: 'error', message: 'Could not fetch admin details, Please try again!', show: true });
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setAdminDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(
                `${process.env.REACT_APP_BASE_SERVER_URL}/owner/administrator_router/update/${id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        full_name: adminDetails.fullName,
                        username: adminDetails.username,
                        password: adminDetails.password,
                        phone_number: adminDetails.phoneNumber,
                        passport_number: adminDetails.passportNumber,
                        date_of_birth: adminDetails.dateOfBirth,
                        gender: adminDetails.gender,
                        education: adminDetails.education,
                        school_id: adminDetails.schoolId,
                    }),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                setLoading(false);
                setAlert({ type: 'error', message: data.detail, show: true });
                return;
            }

            setLoading(false);
            setAdminDetails(formData);
            navigate('/apps/adminstrators');
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
            message: `Are you sure to delete the ${adminDetails.fullName}?`,
            persona: 'administrator',
        });
    };

    const handleBack = () => {
        navigate('/apps/adminstrators');
    };

    useEffect(() => {
        if (id) {
            fetchAdminDetails();
        }
    }, [id]);

    useEffect(() => {
        if (agree) {
            const deletePersona = async () => {
                try {
                    setLoading(true);
                    const res = await axios.delete(
                        `${process.env.REACT_APP_BASE_SERVER_URL}/owner/administrator_router/delete/${id}`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (res.status === 200) {
                        setAlert({ type: 'success', message: 'Admin deleted successfully!', show: true });
                        navigate('/apps/adminstrators');
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
        <Container maxWidth={'xl'}>
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
                        {/* Render form fields with values from adminDetails */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    Full Name
                                </FormLabel>
                                <TextField
                                    name="fullName"
                                    fullWidth
                                    value={adminDetails.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Update Full Name"
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
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>Username</FormLabel>
                                <TextField
                                    name="username"
                                    fullWidth
                                    value={adminDetails.username}
                                    onChange={handleChange}
                                    required
                                    placeholder="Update Username"
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
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>Password</FormLabel>
                                <TextField
                                    name="password"
                                    type="password"
                                    fullWidth
                                    value={adminDetails.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Update Password"
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
                                    value={adminDetails.phoneNumber}
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

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    Passport Number
                                </FormLabel>
                                <TextField
                                    name="passportNumber"
                                    fullWidth
                                    value={adminDetails.passportNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="Update Passport Number"
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

                        {/* Gender */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>Gender</FormLabel>
                                <Select
                                    name="gender"
                                    value={adminDetails.gender}
                                    onChange={handleChange}
                                    displayEmpty
                                    required
                                    sx={{
                                        height: '40px',
                                        boxSizing: 'border-box',
                                    }}>
                                    <MenuItem value="" disabled>
                                        Select Gender
                                    </MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Date of Birth */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    Date of Birth
                                </FormLabel>
                                <TextField
                                    name="dateOfBirth"
                                    fullWidth
                                    type="date"
                                    value={adminDetails.dateOfBirth}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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

                        {/* Education */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    Education
                                </FormLabel>
                                <TextField
                                    name="education"
                                    fullWidth
                                    value={adminDetails.education}
                                    onChange={handleChange}
                                    required
                                    placeholder="Update Education"
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

                        {/* School ID */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    School ID
                                </FormLabel>
                                <TextField
                                    name="schoolId"
                                    fullWidth
                                    value={adminDetails.schoolId}
                                    onChange={handleChange}
                                    required
                                    placeholder="Update School ID"
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
        </Container>
    );
}

export default EditAdminstrator;
