import React, { ChangeEvent, useState } from 'react';
import { Box, FormControl, FormLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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

const formData: SchoolDetails = {
    id: '',
    name: '',
    phone_number: '',
    address: '',
    owner_id: '',
    isDeleted: false,
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
};

function SchoolDropdown() {
    const { schools } = useSelector((state: RootState) => state.schools);
    const [schoolDetails, setSchoolDetails] = useState<SchoolDetails>(formData);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setSchoolDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <Box sx={{}}>
            <FormControl>
                <Select
                    name="school"
                    value={schoolDetails.id}
                    onChange={(event: SelectChangeEvent) => handleChange(event)}
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
                        <MenuItem key={id} value={school.id}>
                            {school.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default SchoolDropdown;
