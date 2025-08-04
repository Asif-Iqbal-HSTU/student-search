import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import Modal from '@/Components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

const SEMESTERS = ['Admission Winter 2025 (UGC Prefix: 080251)', 'Admission Summer 2024 (UGC Prefix: 080242)',
    'Admission Winter 2024 (UGC Prefix: 080241)', 'Admission Summer 2023 (UGC Prefix: 080241)', ];
const PROGRAMS = ['B.Sc. Engineering in Computer Science and Engineering (CSE)', 'B.Sc. Engineering in Electrical and Electronic Engineering (EEE)',
    'B.Sc. Engineering in Mechanical Engineering (ME)', 'B.Sc. Engineering in Industrial and Production Engineering (IPE)',
    'B.Sc. Engineering in Civil Engineering (CE)', 'B.Sc. Engineering in Information and Communication Technology (ICT)',
    'Bachelor of Business Administration (BBA)', 'BBA in Accounting & Information Systems (AIS)', 'B.A. (Hons) in English'];
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
        student_id: '', ugc_id: '', full_name: '', father_name: '', mother_name: '', dob: '', gender: '',
        batch: '', program: '', adm_semester: '', mobile: '', father_tel: '', mother_tel: '',
        emergency_tel: '', blood_group: '', department: '', religion: '', nationality: '',
        marital_status: '', father_occupation: '', mother_occupation: '', student_status: '',
        residential_status: '', email: '', nid_no: '', birth_cert_no: '', admission_date: '',
        session: '', covid_vaccine: '', registration_no: '', medical_test: '',
        legal_guardian_name: '', legal_guardian_relation: '', legal_guardian_contact: '',
        perm_village: '', perm_post_code: '', perm_thana: '', perm_district: '',
        present_village: '', present_post_code: '', present_thana: '', present_district: '',
        ssc_passing_year: '', ssc_institute: '', ssc_roll_no: '', ssc_registration_no: '',
        ssc_board: '', ssc_gpa: '', hsc_passing_year: '', hsc_institute: '', hsc_roll_no: '',
        hsc_registration_no: '', hsc_board: '', hsc_gpa: '',
    });


    const [sameAsPermanent, setSameAsPermanent] = useState(false);

    useEffect(() => {
        if (sameAsPermanent) {
            setData('present_village', data.perm_village);
            setData('present_post_code', data.perm_post_code);
            setData('present_thana', data.perm_thana);
            setData('present_district', data.perm_district);
        }
    }, [sameAsPermanent, data.perm_village, data.perm_post_code, data.perm_thana, data.perm_district, setData]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('students.store'), {
            onSuccess: () => {
                setShowModal(true);
                reset();
            },
        });
    };

    const renderInput = (label: string, field: keyof typeof data, type = 'text') => (
        <div className="grid w-full gap-2">
            <Label htmlFor={field}>{label}</Label>
            <Input
                id={field}
                type={type}
                value={data[field] as string}
                onChange={(e) => setData(field, e.target.value)}
            />
            <InputError message={errors[field]} />
        </div>
    );

    const renderSelect = (label: string, field: keyof typeof data, options: string[]) => (
        <div className="grid w-full gap-2">
            <Label htmlFor={field}>{label}</Label>
            <select
                id={field}
                value={data[field] as string}
                onChange={(e) => setData(field, e.target.value)}
                className="border rounded-md p-2 bg-background text-foreground"
            >
                <option value="">Select</option>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <InputError message={errors[field]} />
        </div>
    );

    const renderFileField = (label: string, field: keyof typeof data) => (
        <div className="grid w-full gap-2">
            <Label htmlFor={field}>{label}</Label>
            <input
                id={field}
                type="file"
                onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setData(field, file);
                }}
                className="border rounded-md p-2 bg-white text-foreground dark:bg-neutral-800 dark:text-white"
            />
            {data[field] && typeof data[field] !== 'string' && (
                <div className="text-sm text-gray-600 dark:text-gray-300">Selected: {(data[field] as File).name}</div>
            )}
            <InputError message={errors[field]} />
        </div>
    );

    return (
        <AppLayout breadcrumbs={[{ title: 'Add Student', href: '/students/create' }]}>
            <Head title="Create Student" />

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6 text-center">
                    <h2 className="text-xl font-semibold text-green-700">Student Successfully Added</h2>
                </div>
            </Modal>

            <form onSubmit={handleSubmit} className="space-y-8 px-4 py-6">
                <h2 className="text-xl font-bold">Academic Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderSelect('Department', 'department', DEPTS)}
                    {renderSelect('Program', 'program', PROGRAMS)}
                    {renderSelect('Semester', 'adm_semester', SEMESTERS)}
                    {renderInput('Batch', 'batch')}
                    {renderInput('Admission Date', 'admission_date', 'date')}
                    {renderInput('Session', 'session')}
                </div>
{/**/}
                <h2 className="text-xl font-bold">Basic Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Student ID', 'student_id')}
                    {renderInput('UGC ID', 'ugc_id')}
                    {renderInput('Registration No', 'registration_no')}
                    {renderInput('Full Name', 'full_name')}
                    {renderSelect('Gender', 'gender', GENDER)}
                    {renderInput('Date of Birth', 'dob', 'date')}
                    {renderSelect('Student Status', 'student_status', S_Status)}
                    {renderInput('NID No', 'nid_no')}
                    {renderInput('Birth Certificate No', 'birth_cert_no')}
                </div>

                <h2 className="text-xl font-bold">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Religion', 'religion')}
                    {renderInput('Nationality', 'nationality')}
                    {renderSelect('Marital Status', 'marital_status', M_Status)}
                    {renderInput('Blood Group', 'blood_group')}
                    {renderSelect('Residential Status', 'residential_status', R_Status)}
                    {renderSelect('Covid Vaccine', 'covid_vaccine', C_Vaccine)}
                    {renderSelect('Medical Test', 'medical_test', M_test)}
                </div>

                <h2 className="text-xl font-bold">Guardian Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Father Name', 'father_name')}
                    {renderInput('Mother Name', 'mother_name')}
                    {renderInput('Father Phone', 'father_tel')}
                    {renderInput('Mother Phone', 'mother_tel')}
                    {renderInput('Father Occupation', 'father_occupation')}
                    {renderInput('Mother Occupation', 'mother_occupation')}
                </div>

                <h2 className="text-xl font-bold">Legal Guardian Info (if applicable)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Legal Guardian Name', 'legal_guardian_name')}
                    {renderInput('Legal Guardian Relation', 'legal_guardian_relation')}
                    {renderInput('Legal Guardian Contact', 'legal_guardian_contact')}
                </div>

                <h2 className="text-xl font-bold">Contact Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Mobile', 'mobile')}
                    {renderInput('Emergency Phone', 'emergency_tel')}
                    {renderInput('Email', 'email')}
                </div>

                {/*<h2 className="text-xl font-bold">Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Village', 'village')}
                    {renderInput('Post Code', 'post_code')}
                    {renderInput('Thana', 'thana')}
                    {renderInput('District', 'district')}
                </div>*/}

                <h2 className="text-xl font-bold">Permanent Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Village (Permanent)', 'perm_village')}
                    {renderInput('Post Code (Permanent)', 'perm_post_code')}
                    {renderInput('Thana (Permanent)', 'perm_thana')}
                    {renderInput('District (Permanent)', 'perm_district')}
                </div>

                <h2 className="text-xl font-bold mt-4">Present Address</h2>


                <div className="flex items-center gap-1 mt-2">
                    <input
                        id="sameAsPermanent"
                        type="checkbox"
                        checked={sameAsPermanent}
                        onChange={(e) => setSameAsPermanent(e.target.checked)}
                    />
                    <Label htmlFor="sameAsPermanent" className="text-sm">
                        Same as Permanent Address
                    </Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Village (Present)', 'present_village')}
                    {renderInput('Post Code (Present)', 'present_post_code')}
                    {renderInput('Thana (Present)', 'present_thana')}
                    {renderInput('District (Present)', 'present_district')}
                </div>

                <div className="mt-4">
                    <Label htmlFor="full_address">Full Address (Present)</Label>
                    <Input
                        id="full_address"
                        type="text"
                        value={`${data.present_village || ''}, ${data.present_post_code || ''}, ${data.present_thana || ''}, ${data.present_district || ''}`}
                        disabled
                        // className="bg-gray-100 text-black-900 dark:bg-neutral-800 dark:text-white"
                    />
                </div>


                <h2 className="text-xl font-bold">Education Info (SSC)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Passing Year', 'ssc_passing_year')}
                    {renderInput('Institute', 'ssc_institute')}
                    {renderInput('Roll No', 'ssc_roll_no')}
                    {renderInput('Registration No', 'ssc_registration_no')}
                    {renderInput('Board', 'ssc_board')}
                    {renderInput('GPA', 'ssc_gpa')}
                </div>

                <h2 className="text-xl font-bold">Education Info (HSC)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Passing Year', 'hsc_passing_year')}
                    {renderInput('Institute', 'hsc_institute')}
                    {renderInput('Roll No', 'hsc_roll_no')}
                    {renderInput('Registration No', 'hsc_registration_no')}
                    {renderInput('Board', 'hsc_board')}
                    {renderInput('GPA', 'hsc_gpa')}
                </div>


                <h2 className="text-xl font-bold">File Uploads</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderFileField('Student Image', 'image')}
                    {renderFileField('SSC Certificate', 'ssc_certificate')}
                    {renderFileField('HSC Certificate', 'hsc_certificate')}
                </div>

                <div className="pt-6">
                    <Button type="submit" className="w-full md:w-auto" disabled={processing}>
                        Submit
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
