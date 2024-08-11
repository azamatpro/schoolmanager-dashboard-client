import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Box,
    FormControl,
    FormLabel,
    SelectChangeEvent,
    Paper,
} from '@mui/material';
import { getToken } from '../../../../utils/authorization';
import Loader from '../../../../components/Loader';
import CustomAlert from '../../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

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

function AddAdminstrator() {
    const navigate = useNavigate();
    const [schoolDetails, setSchoolDetails] = useState<SchoolDetails>(formData);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const { currentUser } = useSelector((state: RootState) => state.user);

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
            const token = getToken('userToken');
            const res = await axios.post(
                `${process.env.REACT_APP_BASE_SERVER_URL}/owner/school_router/create`,
                {
                    name: schoolDetails.name,
                    address: schoolDetails.address,
                    owner_id: currentUser?.id,
                    phone_number: schoolDetails.phoneNumber,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = res.data;

            console.log(res);
            console.log(data);
            if (res.status !== 200) {
                setLoading(false);

                setError(data.detail);
                setShowAlert(true);
                return;
            }
            setLoading(false);
            setSchoolDetails(formData);
            navigate('/apps/schools');
        } catch (error: any) {
            console.log(error);
            setLoading(false);
            setError('Please, try with correct credentials again!');
            setShowAlert(true);
        }
    };

    const handleCancel = () => {
        setSchoolDetails(formData);
    };

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
                setError('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <Paper sx={{ width: '100%' }}>
            <Box sx={{ mt: 4, borderRadius: 1.5, bgcolor: '#ffffff' }}>
                <Box sx={{ p: 2.5, borderBottom: '1px solid lightgray' }}>
                    <Typography sx={{ fontSize: '1rem' }} variant="h6">
                        Basic Info
                    </Typography>
                </Box>
                {loading && <Loader />}
                {showAlert && <CustomAlert alert="error" message={error} />}
                <form onSubmit={handleSubmit}>
                    <Grid sx={{ p: 2.5 }} container rowSpacing={1.5} columnSpacing={4}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>Name</FormLabel>
                                <TextField
                                    name="name"
                                    fullWidth
                                    value={schoolDetails.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Name"
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
                                    placeholder="Enter Phone Number"
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
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>Address</FormLabel>
                                <TextField
                                    name="address"
                                    fullWidth
                                    value={schoolDetails.address}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Address"
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

                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                            <Button sx={{ mr: 2, width: '7rem' }} type="submit" variant="outlined" color="primary">
                                Submit
                            </Button>
                            <Button
                                onClick={handleCancel}
                                sx={{ width: '7rem' }}
                                type="button"
                                variant="outlined"
                                color="error">
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Paper>
    );
}

export default AddAdminstrator;
