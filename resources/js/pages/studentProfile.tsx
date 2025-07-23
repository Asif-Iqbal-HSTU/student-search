import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function StudentProfile() {
    const { student } = usePage().props as any;

    const fileUrl = (path: string | null) => path ? `/storage/${path}` : null;

    return (
        <AppLayout breadcrumbs={[{ title: 'Student Profile', href: '/dashboard' }]}>
            <Head title="Student Profile" />

            <div className="p-6 bg-gray-50 dark:bg-neutral-900 min-h-screen">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Profile Card */}
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
                        <div className="flex flex-col items-center">
                            <img
                                src={fileUrl(student.file?.image) || '/default-avatar.png'}
                                alt="Student"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <h2 className="mt-4 text-xl font-bold">{student.full_name}</h2>
                            <p className="text-sm text-gray-500">{student.program}</p>
                            <p className="text-sm text-gray-500">{student.student_id}</p>
                        </div>
                        {fileUrl(student.file?.image) && (
                            <a href={fileUrl(student.file?.image)} download className="mt-4 inline-block text-center w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Download Image
                            </a>
                        )}
                    </div>

                    {/* Academic Info */}
                    <div className="md:col-span-2 bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Academic & Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <Detail label="Batch" value={student.batch} />
                            <Detail label="Program" value={student.program} />
                            <Detail label="Semester" value={student.adm_semester} />
                            <Detail label="Mobile" value={student.mobile?.replace(/^'/, '')} />
                            <Detail label="Email" value={student.information?.email} />
                            <Detail label="DOB" value={student.dob} />
                            <Detail label="Gender" value={student.gender} />
                            <Detail label="Nationality" value={student.information?.nationality} />
                            <Detail label="Religion" value={student.information?.religion} />
                            <Detail label="Marital Status" value={student.information?.marital_status} />
                            <Detail label="Student Status" value={student.information?.student_status} />
                            <Detail label="Residential Status" value={student.information?.residential_status} />
                        </div>
                    </div>

                    {/* Guardian */}
                    <div className="md:col-span-2 bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Guardian</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <Detail label="Father Name" value={student.father_name} />
                            <Detail label="Father Tel" value={student.father_tel?.replace(/^'/, '')} />
                            <Detail label="Mother Name" value={student.mother_name} />
                            <Detail label="Mother Tel" value={student.mother_tel?.replace(/^'/, '')} />
                            <Detail label="Emergency Tel" value={student.emergency_tel?.replace(/^'/, '')} />
                            <Detail label="Legal Guardian Name" value={student.information?.legal_guardian_name} />
                            <Detail label="Legal Guardian Contact" value={student.information?.legal_guardian_contact} />

                        </div>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2 bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <Detail label="Permanent Address" value={student.full_permanent_address} />
                            <Detail label="Present Address" value={student.full_present_address} />
                        </div>
                    </div>

                    {/* SSC/HSC Info */}
                    <div className="md:col-span-2 bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Education</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <Detail label="SSC Institute" value={student.education?.ssc_institute} />
                            <Detail label="SSC GPA" value={student.education?.ssc_gpa} />
                            <Detail label="HSC Institute" value={student.education?.hsc_institute} />
                            <Detail label="HSC GPA" value={student.education?.hsc_gpa} />
                        </div>
                        <div className="flex gap-4 mt-4">
                            {fileUrl(student.file?.ssc_certificate) && (
                                <a
                                    href={fileUrl(student.file?.ssc_certificate)}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    download
                                >
                                    Download SSC Certificate
                                </a>
                            )}
                            {fileUrl(student.file?.hsc_certificate) && (
                                <a
                                    href={fileUrl(student.file?.hsc_certificate)}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    download
                                >
                                    Download HSC Certificate
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function Detail({ label, value }: { label: string; value?: string | null }) {
    return (
        <div>
            <p className="text-gray-500 dark:text-gray-400">{label}</p>
            <p className="font-medium">{value || '-'}</p>
        </div>
    );
}
