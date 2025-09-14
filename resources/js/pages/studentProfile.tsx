import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

export default function StudentProfile() {
    const { student } = usePage().props as any;
    console.log("The stupid's id is:" + student.student_id);

    return (
        <AppLayout breadcrumbs={[{ title: 'Student Profile', href: '/dashboard' }]}>
            <Head title="Student Profile" />

            <div className="min-h-screen bg-gray-50 p-6 dark:bg-neutral-900">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Profile Card */}
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-neutral-800">
                        <div className="flex flex-col items-center">
                            <img
                                src={`/storage/${student.image ?? 'default-avatar.png'}`}
                                alt="Student"
                                className="h-24 w-24 rounded-full object-cover"
                            />
                            <h2 className="mt-4 text-xl font-bold">{student.full_name}</h2>
                            <p className="text-sm text-gray-500">{student.program}</p>
                            <p className="text-sm text-gray-500">{student.student_id}</p>
                        </div>

                    </div>

                    {/* Academic Info */}
                    <div className="rounded-lg bg-white p-6 shadow md:col-span-2 dark:bg-neutral-800">
                        <h3 className="mb-4 text-lg font-semibold">Academic & Personal Details</h3>
                        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                            <Detail label="Batch" value={student.batch} />
                            <Detail label="Program" value={student.program} />
                            <Detail label="Semester" value={student.adm_semester} />
                            <Detail label="Mobile" value={student.mobile?.replace(/^'/, '')} />
                            <Detail label="Email" value={student.email} />
                            <Detail label="DOB" value={student.dob} />
                            <Detail label="Gender" value={student.gender} />
                            <Detail label="Nationality" value={student.nationality} />
                            <Detail label="Religion" value={student.religion} />
                            <Detail label="Marital Status" value={student.marital_status} />
                            <Detail label="Student Status" value={student.student_status} />
                            <Detail label="Residential Status" value={student.residential_status} />
                        </div>
                    </div>

                    {/* Guardian */}
                    <div className="rounded-lg bg-white p-6 shadow md:col-span-2 dark:bg-neutral-800">
                        <h3 className="mb-4 text-lg font-semibold">Guardian</h3>
                        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                            <Detail label="Father Name" value={student.father_name} />
                            <Detail label="Father Tel" value={student.father_tel?.replace(/^'/, '')} />
                            <Detail label="Mother Name" value={student.mother_name} />
                            <Detail label="Mother Tel" value={student.mother_tel?.replace(/^'/, '')} />
                            <Detail label="Emergency Tel" value={student.emergency_tel?.replace(/^'/, '')} />
                            <Detail label="Legal Guardian Name" value={student.legal_guardian_name} />
                            <Detail label="Legal Guardian Contact" value={student.legal_guardian_contact} />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="rounded-lg bg-white p-6 shadow md:col-span-2 dark:bg-neutral-800">
                        <h3 className="mb-4 text-lg font-semibold">Address</h3>
                        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                            <Detail label="Permanent Address" value={student.full_permanent_address} />
                            <Detail label="Present Address" value={student.full_present_address} />
                        </div>
                    </div>

                    {/* SSC/HSC Info */}
                    <div className="rounded-lg bg-white p-6 shadow md:col-span-2 dark:bg-neutral-800">
                        <h3 className="mb-4 text-lg font-semibold">Education</h3>
                        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                            <Detail label="SSC Institute" value={student.ssc_institute} />
                            <Detail label="SSC GPA" value={student.ssc_gpa} />
                            <Detail label="HSC Institute" value={student.hsc_institute} />
                            <Detail label="HSC GPA" value={student.hsc_gpa} />
                        </div>
                        <div className="mt-4 flex gap-4">
                            <a
                                href={`/storage/${student.ssc_certificate ?? 'default-avatar.png'}`}
                                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                download
                            >
                                Download SSC Certificate
                            </a>
                            <a
                                href={`/storage/${student.hsc_certificate ?? 'default-avatar.png'}`}
                                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                download
                            >
                                Download HSC Certificate
                            </a>
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
