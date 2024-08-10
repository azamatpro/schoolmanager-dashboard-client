import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Typography } from '@mui/material';
import Loader from '../../../../components/Loader';
import CustomAlert from '../../../../components/Alert';
import { getToken } from '../../../../utils/authorization';
import axios from 'axios';

interface Administrator {
    id: number;
    username: string;
    full_name: string;
    phone_number: string;
    gender: string;
    education: string;
    created_at: string;
}

const AdministratorsList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [administrators, setAdministrators] = useState<Administrator[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);

    const fetchAdministrators = useCallback(async () => {
        try {
            setLoading(true);
            const token = getToken('userToken');
            const params = new URLSearchParams({
                page: (page + 1).toString(),
                itemsPerPage: rowsPerPage.toString(),
            });

            const res = await axios.get(
                `${
                    process.env.REACT_APP_BASE_SERVER_URL
                }/owner/administrator_router/get_paginated?${params.toString()}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status !== 200) {
                setShowAlert(true);
                setLoading(false);
                setError('Something went wrong, Could not get administrators!');
                return;
            }

            const data = res.data;
            const modifiedData = data.data.map((val: Administrator) => ({
                ...val,
                created_at: new Date(val.created_at).toLocaleDateString(),
            }));
            setAdministrators(modifiedData);
            setTotalCount(data.total_count);
            setLoading(false);
        } catch (error) {
            setError('Something went wrong, Could not get administrators!');
            setShowAlert(true);
            setLoading(false);
        }
    }, [page, rowsPerPage]);

    useEffect(() => {
        fetchAdministrators();
    }, [fetchAdministrators]);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mx: 2 }}>
                <Typography variant="h6" component="h6" noWrap>
                    Administrators
                </Typography>
                <Button variant="contained" color="primary">
                    <Link to="/apps/adminstrators/add">+ Add new</Link>
                </Button>
            </Box>
            {loading && <Loader />}
            {showAlert && <CustomAlert alert="error" message={error} />}
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Education</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Joining Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {administrators.map((admin) => (
                            <TableRow
                                key={admin.id}
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                                onClick={() => navigate(`/apps/adminstrators/edit/${admin.id}`)}
                                hover
                                role="checkbox"
                                tabIndex={-1}>
                                <TableCell>{admin.full_name}</TableCell>
                                <TableCell>{admin.gender}</TableCell>
                                <TableCell>{admin.education}</TableCell>
                                <TableCell>{admin.phone_number}</TableCell>
                                <TableCell>{admin.username}</TableCell>
                                <TableCell>{admin.created_at}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(+event.target.value);
                    setPage(0); // Reset to first page
                }}
            />
        </Paper>
    );
};

export default AdministratorsList;
