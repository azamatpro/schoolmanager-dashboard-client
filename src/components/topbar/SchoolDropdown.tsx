import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { getToken } from '../../utils/authorization';
import { useDispatch, useSelector } from 'react-redux';
import { setSchool } from '../../redux/school/SchoolSlice';
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

const allSchools: SchoolDetails = {
    id: '0',
    name: 'All Schools',
    phone_number: '',
    address: '',
    owner_id: '',
    isDeleted: false,
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
};

function SchoolDropdown() {
    const dispatch = useDispatch();
    const [schools, setSchools] = useState<SchoolDetails[]>([]);
    const { school } = useSelector((state: RootState) => state.school);
    const [selectedSchool, setSelectedSchool] = useState<SchoolDetails>(school || allSchools);

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
            setSchools([allSchools, ...res.data.data]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchSchools();
    }, []);

    const handleSelect = (school: SchoolDetails) => {
        setSelectedSchool(school);
        dispatch(setSchool(school));
    };

    return (
        <Dropdown>
            <Dropdown.Toggle
                id="dropdown-basic"
                style={{
                    backgroundColor: '#e2e6ea',
                    border: 'none',
                    color: '#323a46',
                    outline: 'none',
                    marginTop: '1rem',
                    width: '10rem',
                    textAlign: 'start',
                    marginRight: '2rem',
                }}>
                {selectedSchool.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {schools.map((school) => (
                    <Dropdown.Item key={school.id} onClick={() => handleSelect(school)}>
                        {school.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default SchoolDropdown;
