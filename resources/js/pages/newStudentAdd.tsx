import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import Modal from '@/Components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import Select from 'react-select';

const SEMESTERS = ['Admission Summer 2025 (UGC Prefix: 080252)', 'Admission Winter 2025 (UGC Prefix: 080251)',
    'Admission Summer 2024 (UGC Prefix: 080242)', 'Admission Winter 2024 (UGC Prefix: 080241)',
    'Admission Summer 2023 (UGC Prefix: 080232)', 'Admission Summer 2023 (UGC Prefix: 080231)',
    'Admission Summer 2022 (UGC Prefix: 080222)', 'Admission Summer 2022 (UGC Prefix: 080221)',
    'Admission Summer 2022 (UGC Prefix: 080212)', 'Admission Summer 2022 (UGC Prefix: 080211)',
];
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
const Religion = ['Islam', 'Hinduism', 'Buddhism', 'Christianism'];

const BANGLADESH_DISTRICTS = [
    "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogura", "Brahmanbaria",
    "Chandpur", "Chapai Nawabganj", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla",
    "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj",
    "Habiganj", "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari",
    "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur",
    "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon",
    "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali",
    "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati",
    "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet",
    "Tangail", "Thakurgaon"
];


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

    const [permThanaOptions, setPermThanaOptions] = useState<string[]>([]);
    const [presentThanaOptions, setPresentThanaOptions] = useState<string[]>([]);

    useEffect(() => {
        if (data.perm_district && districtThanaMap[data.perm_district]) {
            setPermThanaOptions(districtThanaMap[data.perm_district]);
            // Optional: reset thana if district changes
            setData('perm_thana', '');
        } else {
            setPermThanaOptions([]);
            setData('perm_thana', '');
        }
    }, [data.perm_district]);

    useEffect(() => {
        if (data.present_district && districtThanaMap[data.present_district]) {
            setPresentThanaOptions(districtThanaMap[data.present_district]);
            setData('present_thana', '');
        } else {
            setPresentThanaOptions([]);
            setData('present_thana', '');
        }
    }, [data.present_district]);


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

    const renderSearchableSelect = (
        label: string,
        field: keyof typeof data,
        options: string[]
    ) => {
        const selectOptions = options.map((d) => ({ label: d, value: d }));

        // Detect dark mode using the `dark` class from Tailwind
        const isDarkMode = document.documentElement.classList.contains('dark');

        const customStyles = {
            control: (base: any, state: any) => ({
                ...base,
                backgroundColor: isDarkMode ? 'rgb(23, 23, 23)' : 'white',
                borderColor: state.isFocused ? '#4ade80' : '#4b5563',
                boxShadow: state.isFocused ? '0 0 0 1px #4ade80' : undefined,
                '&:hover': {
                    borderColor: '#4ade80',
                },
                color: isDarkMode ? 'white' : 'black',
            }),
            singleValue: (base: any) => ({
                ...base,
                color: isDarkMode ? 'white' : 'black',
            }),
            menu: (base: any) => ({
                ...base,
                backgroundColor: isDarkMode ? 'rgb(38, 38, 38)' : 'white',
                color: isDarkMode ? 'white' : 'black',
                zIndex: 50,
            }),
            option: (base: any, state: any) => ({
                ...base,
                backgroundColor: state.isFocused
                    ? '#4ade80'
                    : isDarkMode
                        ? 'rgb(38, 38, 38)'
                        : 'white',
                color: state.isFocused ? 'black' : isDarkMode ? 'white' : 'black',
                cursor: 'pointer',
            }),
            input: (base: any) => ({
                ...base,
                color: isDarkMode ? 'white' : 'black',
            }),
            placeholder: (base: any) => ({
                ...base,
                color: isDarkMode ? '#9ca3af' : '#6b7280', // gray-400 / gray-600
            }),
        };

        return (
            <div className="grid w-full gap-2">
                <Label htmlFor={field}>{label}</Label>
                <Select
                    inputId={field}
                    options={selectOptions}
                    value={selectOptions.find(opt => opt.value === data[field]) || null}
                    onChange={(selected) => setData(field, selected?.value || '')}
                    isClearable
                    styles={customStyles}
                    classNamePrefix="react-select"
                />
                <InputError message={errors[field]} />
            </div>
        );
    };

    const districtThanaMap: Record<string, string[]> = {
        "Bagerhat": ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
        "Bandarban": ["Bandarban Sadar", "Thanchi", "Ruma", "Lama", "Naikhongchhari", "Rowangchhari", "Alikadam"],
        "Barguna": ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata", "Taltali"],
        "Barisal": ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gournadi", "Hizla", "Barisal Sadar", "Mehendiganj", "Muladi", "Wazirpur"],
        "Bhola": ["Bhola Sadar", "Borhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
        "Bogura": ["Adamdighi", "Bogura Sadar", "Dhunat", "Dupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Sonatala"],
        "Brahmanbaria": ["Ashuganj", "Banchharampur", "Brahmanbaria Sadar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail", "Bijoynagar"],
        "Chandpur": ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Dakshin", "Matlab Uttar", "Shahrasti"],
        "Chattogram": ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Lohagara", "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda", "Chattogram Sadar"],
        "Chuadanga": ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
        "Comilla": ["Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Comilla Adarsha Sadar", "Comilla Sadar Dakshin", "Daudkandi", "Debidwar", "Homna", "Laksam", "Meghna", "Monohorgonj", "Muradnagar", "Nangalkot", "Titas"],
        "Cox's Bazar": ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"],
        "Dhaka": ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"],
        "Dinajpur": ["Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Dinajpur Sadar", "Fulbari", "Ghoraghat", "Hakimpur", "Khansama", "Nawabganj", "Parbatipur"],
        "Faridpur": ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"],
        "Feni": ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Parshuram", "Fulgazi", "Sonagazi"],
        "Gaibandha": ["Fulchhari", "Gaibandha Sadar", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"],
        "Gazipur": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
        "Gopalganj": ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
        "Habiganj": ["Ajmiriganj", "Bahubal", "Baniachong", "Chunarughat", "Habiganj Sadar", "Lakhai", "Madhabpur", "Nabiganj"],
        "Jamalpur": ["Bakshiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"],
        "Jashore": ["Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur", "Jashore Sadar", "Manirampur", "Sharsha"],
        "Jhalokati": ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
        "Jhenaidah": ["Harinakunda", "Jhenaidah Sadar", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
        "Joypurhat": ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
        "Khagrachari": ["Dighinala", "Khagrachari Sadar", "Lakshmichhari", "Mahalchhari", "Manikchari", "Matiranga", "Panchhari", "Ramgarh"],
        "Khulna": ["Batiaghata", "Dacope", "Dighalia", "Dumuria", "Koyra", "Paikgachha", "Phultala", "Rupsha", "Terokhada", "Khulna Sadar"],
        "Kishoreganj": ["Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Kishoreganj Sadar", "Kuliarchar", "Mithamain", "Nikli", "Pakundia", "Tarail"],
        "Kurigram": ["Bhurungamari", "Char Rajibpur", "Chilmari", "Kurigram Sadar", "Nageshwari", "Phulbari", "Rajarhat", "Raomari", "Ulipur"],
        "Kushtia": ["Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Kushtia Sadar", "Mirpur"],
        "Lakshmipur": ["Lakshmipur Sadar", "Ramganj", "Ramgati", "Raipur", "Kamalnagar"],
        "Lalmonirhat": ["Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"],
        "Madaripur": ["Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar"],
        "Magura": ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
        "Manikganj": ["Daulatpur", "Ghior", "Harirampur", "Manikganj Sadar", "Saturia", "Shibalaya", "Singair"],
        "Meherpur": ["Gangni", "Meherpur Sadar", "Mujibnagar"],
        "Moulvibazar": ["Barlekha", "Juri", "Kamalganj", "Kulaura", "Moulvibazar Sadar", "Rajnagar", "Sreemangal"],
        "Munshiganj": ["Gazaria", "Lohajang", "Munshiganj Sadar", "Sirajdikhan", "Sreenagar", "Tongibari"],
        "Mymensingh": ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Mymensingh Sadar", "Nandail", "Phulpur", "Trishal"],
        "Naogaon": ["Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mohadevpur", "Naogaon Sadar", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
        "Narail": ["Kalia", "Lohagara", "Narail Sadar"],
        "Narayanganj": ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon"],
        "Narsingdi": ["Belabo", "Manohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"],
        "Natore": ["Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Naldanga", "Natore Sadar", "Singra"],
        "Netrokona": ["Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua", "Madan", "Mohanganj", "Netrokona Sadar", "Purbadhala"],
        "Nilphamari": ["Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar", "Saidpur"],
        "Noakhali": ["Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Kabirhat", "Noakhali Sadar", "Senbagh", "Subarnachar"],
        "Pabna": ["Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Pabna Sadar", "Santhia", "Sujanagar"],
        "Panchagarh": ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],
        "Patuakhali": ["Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"],
        "Pirojpur": ["Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Pirojpur Sadar", "Zianagar"],
        "Rajbari": ["Baliakandi", "Goalanda", "Kalukhali", "Pangsha", "Rajbari Sadar"],
        "Rajshahi": ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Rajshahi Sadar", "Tanore"],
        "Rangamati": ["Baghaichhari", "Barkal", "Belaichhari", "Juraichhari", "Kaptai", "Langadu", "Naniarchar", "Rajasthali", "Rangamati Sadar"],
        "Rangpur": ["Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Rangpur Sadar", "Taraganj"],
        "Satkhira": ["Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Satkhira Sadar", "Shyamnagar", "Tala"],
        "Shariatpur": ["Bhedarganj", "Damudya", "Gosairhat", "Naria", "Shariatpur Sadar", "Zajira"],
        "Sherpur": ["Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"],
        "Sirajganj": ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullapara"],
        "Sunamganj": ["Bishwamvarpur", "Chhatak", "Dakshin Sunamganj", "Derai", "Dharampasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Sunamganj Sadar", "Tahirpur"],
        "Sylhet": ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Sylhet Sadar", "Zakiganj"],
        "Tangail": ["Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"],
        "Thakurgaon": ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"]
    };


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
                    {/*{renderInput('Religion', 'religion')}*/}
                    {renderSelect('Religion', 'religion', Religion)}
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
                    {/*{renderInput('Thana (Permanent)', 'perm_thana')}*/}
                    {/*{renderInput('District (Permanent)', 'perm_district')}*/}
                    {renderSearchableSelect('District (Permanent)', 'perm_district', BANGLADESH_DISTRICTS)}
                    {renderSearchableSelect('Thana / Upazilla (Permanent)', 'perm_thana', permThanaOptions)}
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
                    {/*{renderInput('Thana (Present)', 'present_thana')}*/}
                    {/*{renderInput('District (Present)', 'present_district')}*/}
                    {renderSearchableSelect('District (Present)', 'present_district', BANGLADESH_DISTRICTS)}
                    {renderSearchableSelect('Thana / Upazilla (Present)', 'present_thana', presentThanaOptions)}
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
