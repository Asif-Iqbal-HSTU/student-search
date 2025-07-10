import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { FormEvent, useState  } from 'react';

interface Student {
    id: number;
    student_id: string;
    full_name: string;
    father_name?: string;
    mother_name?: string;
    dob?: string;
    gender: string;
    batch: string;
    program?: string;
    adm_semester?: string;
    mobile?: string;
    father_tel?: string;
    mother_tel?: string;
    emergency_tel?: string;
    blood_group?: string;
}


interface Props extends PageProps {
    students: {
        data: Student[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: {
        search?: string;
        semester?: string;
        program?: string;
        batch?: string;
    };
    options: {
        semesters: string[];
        programs: string[];
        batches: string[];
    };
}

export default function Dashboard({ students, filters, options }: Props) {

    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (student: Student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    };

    const { data, setData, get } = useForm({
        search: filters?.search || '',
        semester: filters?.semester || '',
        program: filters?.program || '',
        batch: filters?.batch || '',
    });

    const handleFilter = (e: FormEvent) => {
        e.preventDefault();
        get(route('dashboard'));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'All Students', href: '/dashboard' }]}>
            <Head title="Dashboard" />

            {/* Filter Section */}
            <form onSubmit={handleFilter} className="flex flex-wrap gap-3 p-4 bg-white dark:bg-neutral-900">
                <input
                    type="text"
                    placeholder="Search by ID, Name, Mobile"
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                    className="border px-3 py-2 rounded w-full md:w-64"
                />
                <select
                    value={data.semester}
                    onChange={(e) => setData('semester', e.target.value)}
                    className="border px-3 py-2 rounded w-full md:w-48"
                >
                    <option value="">All Semesters</option>
                    {options.semesters.map((sem) => (
                        <option key={sem} value={sem}>{sem}</option>
                    ))}
                </select>

                <select
                    value={data.program}
                    onChange={(e) => setData('program', e.target.value)}
                    className="border px-3 py-2 rounded w-full md:w-48"
                >
                    <option value="">All Programs</option>
                    {options.programs.map((program) => (
                        <option key={program} value={program}>{program}</option>
                    ))}
                </select>

                <select
                    value={data.batch}
                    onChange={(e) => setData('batch', e.target.value)}
                    className="border px-3 py-2 rounded w-full md:w-48"
                >
                    <option value="">All Batches</option>
                    {options.batches.map((batch) => (
                        <option key={batch} value={batch}>{batch}</option>
                    ))}
                </select>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Filter
                </button>
            </form>

            {/* Table */}
            <div className="overflow-x-auto p-4">
                <table className="w-full text-sm text-left border">
                    <thead className="bg-gray-200 dark:bg-neutral-800">
                    <tr>
                        <th className="border px-4 py-2">Student ID</th>
                        <th className="border px-4 py-2">Full Name</th>
                        <th className="border px-4 py-2">Mobile</th>
                        <th className="border px-4 py-2">Program</th>
                        <th className="border px-4 py-2">Semester</th>
                        <th className="border px-4 py-2">Batch</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.data.map((student) => (
                        <tr
                            key={student.id}
                            // onClick={() => openModal(student)}
                            onClick={() => router.visit(route('students.show', student.id))}

                            className="cursor-pointer hover:bg-blue-100 dark:hover:bg-neutral-700 transition"
                        >
                            <td className="border px-4 py-2">{student.student_id.replace(/^'/, '')}</td>
                            <td className="border px-4 py-2">{student.full_name}</td>
                            <td className="border px-4 py-2">{student.mobile?.replace(/^'/, '')}</td>
                            <td className="border px-4 py-2">{student.program}</td>
                            <td className="border px-4 py-2">{student.adm_semester}</td>
                            <td className="border px-4 py-2">{student.batch}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap gap-2 p-4">
                {students.links.map((link, i) => (
                    <button
                        key={i}
                        disabled={!link.url}
                        onClick={() => get(link.url || '')}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
            {isModalOpen && selectedStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-lg font-bold px-2 py-1"
                        >
                            ×
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Student Profile</h2>
                        <div className="max-h-[70vh] overflow-y-auto">
                            <table className="w-full text-sm border border-gray-300 dark:border-neutral-700">
                                <tbody>
                                <tr><td className="font-semibold border px-3 py-2">Student ID</td><td className="border px-3 py-2">{selectedStudent.student_id.replace(/^'/, '')}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Full Name</td><td className="border px-3 py-2">{selectedStudent.full_name}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Date of Birth</td><td className="border px-3 py-2">{selectedStudent.dob || '-'}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Gender</td><td className="border px-3 py-2">{selectedStudent.gender}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Batch</td><td className="border px-3 py-2">{selectedStudent.batch}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Program</td><td className="border px-3 py-2">{selectedStudent.program}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Semester</td><td className="border px-3 py-2">{selectedStudent.adm_semester}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Mobile</td><td className="border px-3 py-2">{selectedStudent.mobile?.replace(/^'/, '')}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Father Name</td><td className="border px-3 py-2">{selectedStudent.father_name}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Father Tel</td><td className="border px-3 py-2">{selectedStudent.father_tel?.replace(/^'/, '')}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Mother Name</td><td className="border px-3 py-2">{selectedStudent.mother_name}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Mother Tel</td><td className="border px-3 py-2">{selectedStudent.mother_tel?.replace(/^'/, '')}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Emergency Tel</td><td className="border px-3 py-2">{selectedStudent.emergency_tel?.replace(/^'/, '')}</td></tr>
                                <tr><td className="font-semibold border px-3 py-2">Blood Group</td><td className="border px-3 py-2">{selectedStudent.blood_group}</td></tr>
                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
            )}

        </AppLayout>
    );
}
