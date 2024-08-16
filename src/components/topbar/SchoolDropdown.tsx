import React, { ChangeEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { SelectChangeEvent } from '@mui/material';
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
        <div style={{ width: '10rem', marginTop: '1rem', marginLeft: '0' }}>
            <Form.Select>
                <option>Schools</option>
                {schools.map((school, i) => (
                    <option key={i}>{school.name}</option>
                ))}
            </Form.Select>
        </div>
    );
}

export default SchoolDropdown;
