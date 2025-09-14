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
            <form onSubmit={handleFilter} className="bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <div className="space-y-1">
                        <label htmlFor="search" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Search by ID, Name, Mobile
                        </label>
                        <input
                            id="search"
                            type="text"
                            placeholder="Search..."
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-gray-400"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="semester" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Semester
                        </label>
                        <select
                            id="semester"
                            value={data.semester}
                            onChange={(e) => setData('semester', e.target.value)}
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                        >
                            <option value="">All Semesters</option>
                            {options.semesters.map((sem) => (
                                <option key={sem} value={sem}>
                                    {sem}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="program" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Program
                        </label>
                        <select
                            id="program"
                            value={data.program}
                            onChange={(e) => setData('program', e.target.value)}
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                        >
                            <option value="">All Programs</option>
                            {options.programs.map((program) => (
                                <option key={program} value={program}>
                                    {program}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="batch" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Batch
                        </label>
                        <select
                            id="batch"
                            value={data.batch}
                            onChange={(e) => setData('batch', e.target.value)}
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                        >
                            <option value="">All Batches</option>
                            {options.batches.map((batch) => (
                                <option key={batch} value={batch}>
                                    {batch}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end pt-1">
                        <button
                            type="submit"
                            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-neutral-900"
                        >
                            Filter
                        </button>
                    </div>
                </div>
            </form>

            <div className="px-4 pt-4 text-sm text-gray-700 dark:text-gray-300">
                Total Students: <span className="font-semibold">{students.total} </span>(Click a student to view details)
            </div>

            {/* Table */}
            <div className="overflow-x-auto p-4">
                <table className="w-full border text-left text-sm">
                    <thead className="bg-gray-200 dark:bg-neutral-800">
                        <tr>
                            <th className="border px-4 py-2">SL</th>
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
                                className="cursor-pointer transition hover:bg-blue-100 dark:hover:bg-neutral-700"
                            >
                                <td className="border px-4 py-2">{student.id}</td>
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
                        className={`rounded px-3 py-1 ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
            {isModalOpen && selectedStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-900">
                        <button onClick={closeModal} className="absolute top-2 right-2 px-2 py-1 text-lg font-bold">
                            ×
                        </button>

                        <h2 className="mb-4 text-xl font-semibold">Student Profile</h2>
                        <div className="max-h-[70vh] overflow-y-auto">
                            <table className="w-full border border-gray-300 text-sm dark:border-neutral-700">
                                <tbody>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Student ID</td>
                                        <td className="border px-3 py-2">{selectedStudent.student_id.replace(/^'/, '')}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Full Name</td>
                                        <td className="border px-3 py-2">{selectedStudent.full_name}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Date of Birth</td>
                                        <td className="border px-3 py-2">{selectedStudent.dob || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Gender</td>
                                        <td className="border px-3 py-2">{selectedStudent.gender}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Batch</td>
                                        <td className="border px-3 py-2">{selectedStudent.batch}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Program</td>
                                        <td className="border px-3 py-2">{selectedStudent.program}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Semester</td>
                                        <td className="border px-3 py-2">{selectedStudent.adm_semester}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Mobile</td>
                                        <td className="border px-3 py-2">{selectedStudent.mobile?.replace(/^'/, '')}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Father Name</td>
                                        <td className="border px-3 py-2">{selectedStudent.father_name}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Father Tel</td>
                                        <td className="border px-3 py-2">{selectedStudent.father_tel?.replace(/^'/, '')}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Mother Name</td>
                                        <td className="border px-3 py-2">{selectedStudent.mother_name}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Mother Tel</td>
                                        <td className="border px-3 py-2">{selectedStudent.mother_tel?.replace(/^'/, '')}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Emergency Tel</td>
                                        <td className="border px-3 py-2">{selectedStudent.emergency_tel?.replace(/^'/, '')}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-3 py-2 font-semibold">Blood Group</td>
                                        <td className="border px-3 py-2">{selectedStudent.blood_group}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
