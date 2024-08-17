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
import { useDispatch } from 'react-redux';

export type School = {
    id: string;
    name: string;
    phone_number: string;
    address: string;
    owner_id: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};
interface SchoolsState {
    loading: boolean;
    error: string | null;
    schools: School[];
}

const SchoolsList = () => {
    const navigate = useNavigate();
    const [schools, setSchools] = useState<SchoolsState>({
        loading: false,
        error: null,
        schools: [],
    });
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [totalCount, setTotalCount] = useState<number>(0);

    const fetchSchools = useCallback(async () => {
        setSchools((prevState) => ({ ...prevState, loading: true }));
        try {
            const token = getToken('userToken');
            const params = new URLSearchParams({
                page: (page + 1).toString(),
                itemsPerPage: rowsPerPage.toString(),
            });

            const res = await axios.get(
                `${process.env.REACT_APP_BASE_SERVER_URL}/owner/school_router/get_paginated?${params.toString()}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status !== 200) {
                throw new Error('Something went wrong, Could not get schools!');
            }

            const data = res.data;
            setTotalCount(data.total_count);
            setSchools({ loading: false, error: null, schools: data.data });
        } catch (error) {
            setShowAlert(true);
            const errorMessage = 'Something went wrong, Could not get schools!';
            setShowAlert(true);
            setSchools((prevState) => ({ ...prevState, loading: false, error: errorMessage }));
        }
    }, [page, rowsPerPage]);

    useEffect(() => {
        fetchSchools();
    }, [fetchSchools]);

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
                    Schools
                </Typography>
                <Button variant="contained" color="primary">
                    <Link to="/apps/schools/add">+ Add new</Link>
                </Button>
            </Box>
            {schools.loading && <Loader />}
            {showAlert && <CustomAlert alert="error" message={schools.error} />}
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Mobile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schools.schools.map((school, id) => (
                            <TableRow
                                key={id}
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                                onClick={() => navigate(`/apps/schools/edit/${school.id}`)}
                                hover
                                role="checkbox"
                                tabIndex={-1}>
                                <TableCell>{school.name}</TableCell>
                                <TableCell>{school.address}</TableCell>
                                <TableCell>{school.phone_number}</TableCell>
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
                    setPage(0);
                }}
            />
        </Paper>
    );
};

export default SchoolsList;
