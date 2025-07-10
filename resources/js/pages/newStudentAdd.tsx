// resources/js/Pages/Students/Create.tsx

import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Box, Button, TextField, MenuItem, FormControl, InputLabel, Select, Typography, Divider, Grid
} from '@mui/material';
import Modal from '@/Components/Modal';

const SEMESTERS = ['Summer 2025', 'Summer 2025 (2nd Phase)', 'Fall 2025'];
const PROGRAMS = ['B.Sc. Engineering in Computer Science and Engineering (CSE)', 'B.Sc. Engineering in Electrical and Electronic Engineering (EEE)',
    'B.Sc. Engineering in Mechanical Engineering (ME)', 'B.Sc. Engineering in Industrial and Production Engineering (IPE)',
    'B.Sc. Engineering in Civil Engineering (CE)', 'B.Sc. Engineering in Information and Communication Technology (ICT)',
    'Bachelor of Business Administration (BBA)', 'BBA in Accounting & Information Systems (AIS)', 'B.A. (Hons) in English'
];
const DEPTS = ['CSE', 'EEE', 'ME', 'IPE', 'CE', 'ICT', 'BBA', 'AIS', 'English'];
const GENDER = ['Male', 'Female'];
const M_Status = ['Married', 'Unmarried'];
const R_Status = ['Residential', 'Non-Residential'];
const S_Status = ['General', 'Children of Armed Forces', 'Children of Freedom Fighter', 'Tribal', 'Foreign'];
const C_Vaccine = ['Yes', 'No'];
const M_test = ['Yes', 'No'];

export default function CreateStudent() {
    const page = usePage().props as any;
    const flashSuccess = !!page.flash?.success;
    const [showModal, setShowModal] = useState(flashSuccess);

    const { data, setData, post, processing, errors, reset } = useForm({
        student_id: '', full_name: '', father_name: '', mother_name: '', dob: '', gender: '',
        batch: '', program: '', adm_semester: '', mobile: '', father_tel: '', mother_tel: '',
        emergency_tel: '', blood_group: '', department: '', religion: '', nationality: '',
        marital_status: '', father_occupation: '', mother_occupation: '', student_status: '',
        residential_status: '', email: '', nid_no: '', birth_cert_no: '', admission_date: '',
        session: '', covid_vaccine: '', registration_no: '', medical_test: '',
        legal_guardian_name: '', legal_guardian_relation: '', legal_guardian_contact: '',
        village: '', post_code: '', thana: '', district: '',
        ssc_passing_year: '', ssc_institute: '', ssc_roll_no: '', ssc_registration_no: '',
        ssc_board: '', ssc_gpa: '',
        hsc_passing_year: '', hsc_institute: '', hsc_roll_no: '', hsc_registration_no: '',
        hsc_board: '', hsc_gpa: '',
        image: null, ssc_certificate: null, hsc_certificate: null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('students.store'), {
            onSuccess: () => {
                setShowModal(true);
                reset();
            },
        });
    }

    const renderField = (label: string, field: keyof typeof data, type: string = 'text') => (
        <Grid item size={{ xs: 12, sm: 6, md: 6 }} key={field}>
            <TextField
                label={label}
                type={type}
                fullWidth
                size="medium"
                variant="outlined"
                InputLabelProps={type === 'date' ? { shrink: true } : undefined}
                value={data[field]}
                onChange={(e) => setData(field, e.target.value)}
                error={!!errors[field]}
                helperText={errors[field]}
            />
        </Grid>
    );



    const renderFileField = (label: string, field: keyof typeof data) => (
        <Grid item size={{ xs: 12, sm: 6, md: 6 }} key={field}>
            <Button variant="outlined" component="label" fullWidth>
                {label}
                <input
                    type="file"
                    hidden
                    onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setData(field, file);
                    }}
                />
            </Button>
            {data[field] && typeof data[field] !== 'string' && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {(data[field] as File).name}
                </Typography>
            )}
            {errors[field] && <Typography color="error" variant="body2">{errors[field]}</Typography>}
        </Grid>
    );


    const renderSelect = (label: string, field: keyof typeof data, options: string[]) => (
        <Grid item size={{ xs: 12, sm: 6, md: 6 }} key={field}>
            <FormControl fullWidth variant="outlined" size="medium" error={!!errors[field]}>
                <InputLabel>{label}</InputLabel>
                <Select
                    label={label}
                    value={data[field]}
                    onChange={(e) => setData(field, e.target.value)}
                >
                    {options.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );


    const renderSection = (title: string) => (
        <Grid item size={{ xs: 12 }} sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Divider sx={{ mb: 2 }} />
        </Grid>
    );

    return (
        <AppLayout breadcrumbs={[{ title: 'Add Student', href: '/students/create' }]}>
            <Head title="Create Student" />

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6 text-center">
                    <h2 className="text-xl font-semibold text-green-700">Student Successfully Added</h2>
                </div>
            </Modal>

            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
                <Grid container spacing={3}>

                    {renderSection('Academic Info')}
                    {renderSelect('Department', 'department', DEPTS)}
                    {renderSelect('Program', 'program', PROGRAMS)}
                    {renderSelect('Semester', 'adm_semester', SEMESTERS)}
                    {renderField('Batch', 'batch')}
                    {renderField('Admission Date', 'admission_date', 'date')}
                    {renderField('Session', 'session')}

                    {renderSection('Basic Info')}
                    {renderField('Student ID', 'student_id')}
                    {renderField('Registration No', 'registration_no')}
                    {renderField('Full Name', 'full_name')}
                    {renderSelect('Gender', 'gender', GENDER)}
                    {renderField('Date of Birth', 'dob', 'date')}
                    {renderSelect('Student Status', 'student_status', S_Status)}
                    {renderField('NID No', 'nid_no')}
                    {renderField('Birth Cert No', 'birth_cert_no')}

                    {renderSection('Personal Information')}
                    {renderField('Religion', 'religion')}
                    {renderField('Nationality', 'nationality')}
                    {renderSelect('Marital Status', 'marital_status', M_Status)}
                    {renderField('Blood Group', 'blood_group')}
                    {renderSelect('Residential Status', 'residential_status', R_Status)}
                    {renderSelect('Covid Vaccine', 'covid_vaccine', C_Vaccine)}
                    {renderSelect('Medical Test', 'medical_test', M_test)}

                    {renderSection('Guardian Info')}
                    {renderField('Father Name', 'father_name')}
                    {renderField('Mother Name', 'mother_name')}
                    {renderField('Father Phone', 'father_tel')}
                    {renderField('Mother Phone', 'mother_tel')}
                    {renderField('Father Occupation', 'father_occupation')}
                    {renderField('Mother Occupation', 'mother_occupation')}

                    {renderSection('Legal Guardian Info (if applicable)')}
                    {renderField('Legal Guardian Name', 'legal_guardian_name')}
                    {renderField('Legal Guardian Relation', 'legal_guardian_relation')}
                    {renderField('Legal Guardian Contact', 'legal_guardian_contact')}

                    {renderSection('Contact Info')}
                    {renderField('Mobile', 'mobile')}
                    {renderField('Emergency Phone', 'emergency_tel')}
                    {renderField('Email', 'email')}
                    {renderSection('Address')}
                    {renderField('Village', 'village')}
                    {renderField('Post Code', 'post_code')}
                    {renderField('Thana', 'thana')}
                    {renderField('District', 'district')}

                    {renderSection('Education Info (SSC)')}
                    {renderField('Passing Year', 'ssc_passing_year')}
                    {renderField('Institute', 'ssc_institute')}
                    {renderField('Roll No', 'ssc_roll_no')}
                    {renderField('Registration No', 'ssc_registration_no')}
                    {renderField('Board', 'ssc_board')}
                    {renderField('GPA', 'ssc_gpa')}

                    {renderSection('Education Info (HSC)')}
                    {renderField('Passing Year', 'hsc_passing_year')}
                    {renderField('Institute', 'hsc_institute')}
                    {renderField('Roll No', 'hsc_roll_no')}
                    {renderField('Registration No', 'hsc_registration_no')}
                    {renderField('Board', 'hsc_board')}
                    {renderField('GPA', 'hsc_gpa')}

                    {renderSection('File Uploads')}
                    {renderFileField('Student Image', 'image')}
                    {renderFileField('SSC Certificate', 'ssc_certificate')}
                    {renderFileField('HSC Certificate', 'hsc_certificate')}

                    <Grid item size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 4 }}>
                        <Button variant="contained" type="submit" disabled={processing}>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </AppLayout>
    );
}
