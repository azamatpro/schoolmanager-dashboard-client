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
import { getToken } from '../../../../utils/authorization';
import Loader from '../../../../components/Loader';
import CustomAlert from '../../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SchoolDetails {
    id: string;
    name: string;
    phone_number: string;
    address: string;
    owner_id: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface AdminDetails {
    username: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    passportNumber: string;
    dateOfBirth: string;
    gender: string;
    schoolId: string;
    education: string;
}

const formData = {
    fullName: '',
    username: '',
    phoneNumber: '',
    passportNumber: '',
    dateOfBirth: '',
    gender: '',
    schoolId: '',
    education: '',
    password: '',
};

function AddAdminstrator() {
    const navigate = useNavigate();
    const [adminDetails, setAdminDetails] = useState<AdminDetails>(formData);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [schools, setSchools] = useState<SchoolDetails[]>([]);

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
            const token = getToken('userToken');
            const res = await axios.post(
                `${process.env.REACT_APP_BASE_SERVER_URL}/owner/administrator_router/create`,
                {
                    full_name: adminDetails.fullName,
                    username: adminDetails.username,
                    password: adminDetails.password,
                    phone_number: adminDetails.phoneNumber,
                    passport_number: adminDetails.passportNumber,
                    date_of_birth: adminDetails.dateOfBirth,
                    gender: adminDetails.gender,
                    school_id: adminDetails.schoolId,
                    education: adminDetails.education,
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
            setAdminDetails(formData);
            navigate('/apps/adminstrators');
        } catch (error: any) {
            console.log(error);
            setLoading(false);
            setError('Please, try with correct credentials again!');
            setShowAlert(true);
        }
    };

    const handleCancel = () => {
        setAdminDetails(formData);
    };

    const fetchSchools = async () => {
        try {
            const token = getToken('userToken');
            const res = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}/owner/school_router/get_multi`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status !== 200) {
                console.log('Error fetching schools');
                return;
            }
            setSchools([...res.data.data]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchSchools();
    }, []);

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
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    Full Name
                                </FormLabel>
                                <TextField
                                    name="fullName"
                                    fullWidth
                                    value={adminDetails.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Full Name"
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
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>Username</FormLabel>
                                <TextField
                                    name="username"
                                    fullWidth
                                    value={adminDetails.username}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Username"
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
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    Passport Number
                                </FormLabel>
                                <TextField
                                    name="passportNumber"
                                    fullWidth
                                    value={adminDetails.passportNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Passport Number"
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
                                    Date Of Birth
                                </FormLabel>
                                <TextField
                                    name="dateOfBirth"
                                    type="date"
                                    fullWidth
                                    value={adminDetails.dateOfBirth}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Date Of Birth"
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
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>Gender</FormLabel>
                                <Select
                                    name="gender"
                                    value={adminDetails.gender}
                                    onChange={handleChange}
                                    required
                                    sx={{ height: '40px' }}
                                    displayEmpty
                                    inputProps={{
                                        sx: {
                                            height: '100%',
                                            padding: '0 15px',
                                            boxSizing: 'border-box',
                                        },
                                    }}>
                                    <MenuItem value="" disabled>
                                        Select Gender
                                    </MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>Schools</FormLabel>
                                <Select
                                    name="school"
                                    value={adminDetails.schoolId} // Assuming adminDetails.school holds the selected school
                                    onChange={handleChange}
                                    required
                                    sx={{ height: '40px' }}
                                    displayEmpty
                                    inputProps={{
                                        sx: {
                                            height: '100%',
                                            padding: '0 15px',
                                            boxSizing: 'border-box',
                                        },
                                    }}>
                                    <MenuItem value="" disabled>
                                        Select School
                                    </MenuItem>

                                    {schools.map((school, id) => (
                                        <MenuItem key={id} value={school.name}>
                                            {school.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

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
                                    placeholder="Enter Education"
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
