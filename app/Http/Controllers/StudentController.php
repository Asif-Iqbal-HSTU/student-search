<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Student2;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Information;
use App\Models\Address;
use App\Models\Education;

class StudentController extends Controller
{
    public function create0()
    {
        return Inertia::render('newStudentAdd_newPage');
    }

    public function create()
    {
        // Fetch the last student ID from the database
        $lastStudent = Student::orderBy('id', 'desc')->first();
        $lastStudentId = $lastStudent ? $lastStudent->student_id : null;

        // Pass it to the Inertia page
        return Inertia::render('newStudentAdd_newPage', [
            'lastStudentId' => $lastStudentId
        ]);
    }


    public function store0(Request $request)
    {
        $request->validate([
            // Basic Info
            'student_id' => 'required|string|max:20|unique:students,student_id',
            'ugc_id' => 'required|string|max:20|unique:students,ugc_id',
            'full_name' => 'required|string|max:255',
            'registration_no' => 'nullable|string|max:50',
            'dob' => 'required|date',
            'gender' => 'required|in:Male,Female',
            'student_status' => 'required|string|max:50',
            'nid_no' => 'nullable|string|max:30',
            'birth_cert_no' => 'nullable|string|max:30',

            // Academic Info
            'department' => 'required|string|max:50',
            'program' => 'required|string|max:255',
            'adm_semester' => 'required|string|max:50',
            'batch' => 'required|string|max:10',
            'admission_date' => 'required|date',
            'session' => 'nullable|string|max:30',

            // Personal Info
            'religion' => 'nullable|string|max:50',
            'nationality' => 'nullable|string|max:50',
            'marital_status' => 'nullable|string|max:20',
            'blood_group' => 'nullable|string|max:10',
            'residential_status' => 'nullable|string|max:20',
            'covid_vaccine' => 'nullable|in:Yes,No',
            'medical_test' => 'nullable|in:Yes,No',

            // Contact
            'mobile' => 'required|string|max:20',
            'emergency_tel' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',

            // Guardian
            'father_name' => 'required|string|max:100',
            'mother_name' => 'required|string|max:100',
            'father_tel' => 'nullable|string|max:20',
            'mother_tel' => 'nullable|string|max:20',
            'father_occupation' => 'nullable|string|max:100',
            'mother_occupation' => 'nullable|string|max:100',

            // Legal Guardian
            'legal_guardian_name' => 'nullable|string|max:100',
            'legal_guardian_relation' => 'nullable|string|max:50',
            'legal_guardian_contact' => 'nullable|string|max:20',

            // Address
            'village' => 'nullable|string|max:100',
            'post_code' => 'nullable|string|max:10',
            'thana' => 'nullable|string|max:100',
            'district' => 'nullable|string|max:100',

            // SSC
            'ssc_passing_year' => 'nullable|string|max:10',
            'ssc_institute' => 'nullable|string|max:255',
            'ssc_roll_no' => 'nullable|string|max:20',
            'ssc_registration_no' => 'nullable|string|max:30',
            'ssc_board' => 'nullable|string|max:50',
            'ssc_gpa' => 'nullable|numeric|between:1,5',

            // HSC
            'hsc_passing_year' => 'nullable|string|max:10',
            'hsc_institute' => 'nullable|string|max:255',
            'hsc_roll_no' => 'nullable|string|max:20',
            'hsc_registration_no' => 'nullable|string|max:30',
            'hsc_board' => 'nullable|string|max:50',
            'hsc_gpa' => 'nullable|numeric|between:1,5',

            // Files
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'ssc_certificate' => 'nullable|mimes:pdf,jpg,jpeg,png|max:5120',
            'hsc_certificate' => 'nullable|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        $student = Student::create($request->only([
            'student_id', 'ugc_id', 'full_name', 'father_name', 'mother_name', 'dob', 'gender',
            'batch', 'program', 'adm_semester', 'mobile',
            'father_tel', 'mother_tel', 'emergency_tel', 'blood_group',
        ]));

        $submitted_email = $request->email;
        if(!$submitted_email){
            $submitted_email = "Email Not Added";
        }

        $student->information()->create([
            'department' => $request->department,
            'religion' => $request->religion,
            'nationality' => $request->nationality,
            'marital_status' => $request->marital_status,
            'father_occupation' => $request->father_occupation,
            'mother_occupation' => $request->mother_occupation,
            'dob' => $request->info_dob,
            'student_status' => $request->student_status,
            'residential_status' => $request->residential_status,
            'email' => $submitted_email,
            'nid_no' => $request->nid_no,
            'birth_cert_no' => $request->birth_cert_no,
            'admission_date' => $request->admission_date,
            'session' => $request->session,
            'covid_vaccine' => $request->covid_vaccine,
            'registration_no' => $request->registration_no,
            'medical_test' => $request->medical_test,
            'legal_guardian_name' => $request->legal_guardian_name,
            'legal_guardian_relation' => $request->legal_guardian_relation,
            'legal_guardian_contact' => $request->legal_guardian_contact,
        ]);

        $address = $student->address()->create([
            'perm_village' => $request->perm_village,
            'perm_post_code' => $request->perm_post_code,
            'perm_thana' => $request->perm_thana,
            'perm_district' => $request->perm_district,

            'present_village' => $request->present_village,
            'present_post_code' => $request->present_post_code,
            'present_thana' => $request->present_thana,
            'present_district' => $request->present_district,
        ]);

        $fullPermanentAddress = "{$request->perm_village}, {$request->perm_post_code}, {$request->perm_thana}, {$request->perm_district}";
        $fullPresentAddress = "{$request->present_village}, {$request->present_post_code}, {$request->present_thana}, {$request->present_district}";

        $student->update([
            'full_permanent_address' => $fullPermanentAddress,
            'full_present_address' => $fullPresentAddress,
        ]);

        $student->education()->create([
            'ssc_passing_year' => $request->ssc_passing_year,
            'ssc_institute' => $request->ssc_institute,
            'ssc_roll_no' => $request->ssc_roll_no,
            'ssc_registration_no' => $request->ssc_registration_no,
            'ssc_board' => $request->ssc_board,
            'ssc_gpa' => $request->ssc_gpa,
            'hsc_passing_year' => $request->hsc_passing_year,
            'hsc_institute' => $request->hsc_institute,
            'hsc_roll_no' => $request->hsc_roll_no,
            'hsc_registration_no' => $request->hsc_registration_no,
            'hsc_board' => $request->hsc_board,
            'hsc_gpa' => $request->hsc_gpa,
        ]);



        // 🟢 File Upload Handling
        $imagePath = $request->file('image')?->store('students/images', 'public');
        $sscCertPath = $request->file('ssc_certificate')?->store('students/certificates/ssc', 'public');
        $hscCertPath = $request->file('hsc_certificate')?->store('students/certificates/hsc', 'public');

        $student->file()->create([
            'image' => $imagePath,
            'ssc_certificate' => $sscCertPath,
            'hsc_certificate' => $hscCertPath,
        ]);


        return redirect()->route('new-student-add')->with('success', 'Student created successfully');
    }

    public function store(Request $request)
    {
        $request->validate([
            // Basic Info
            'student_id' => 'required|string|max:20|unique:students,student_id',
            'ugc_id' => 'required|string|max:20|unique:students,ugc_id',
            'full_name' => 'required|string|max:255',
            'registration_no' => 'nullable|string|max:50',
            'dob' => 'required|date',
            'gender' => 'required|in:Male,Female',
            'student_status' => 'required|string|max:50',
            'nid_no' => 'nullable|string|max:30',
            'birth_cert_no' => 'nullable|string|max:30',
            'hall' => 'nullable|string|max:50',

            // Academic Info
            'department' => 'required|string|max:50',
            'program' => 'required|string|max:255',
            'adm_semester' => 'required|string|max:50',
            'batch' => 'required|string|max:10',
            'admission_date' => 'required|date',
            'academic_session' => 'nullable|string|max:30',

            // Personal Info
            'religion' => 'nullable|string|max:50',
            'nationality' => 'nullable|string|max:50',
            'marital_status' => 'nullable|string|max:20',
            'blood_group' => 'nullable|string|max:10',
            'residential_status' => 'nullable|string|max:20',
            'covid_vaccine' => 'nullable|in:Yes,No',
            'medical_test' => 'nullable|in:Yes,No',

            // Contact
            'mobile' => 'required|string|max:20',
            'emergency_tel' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',

            // Guardian
            'father_name' => 'required|string|max:100',
            'mother_name' => 'required|string|max:100',
            'father_tel' => 'nullable|string|max:20',
            'mother_tel' => 'nullable|string|max:20',
            'father_occupation' => 'nullable|string|max:100',
            'mother_occupation' => 'nullable|string|max:100',

            // Legal Guardian
            'legal_guardian_name' => 'nullable|string|max:100',
            'legal_guardian_relation' => 'nullable|string|max:50',
            'legal_guardian_contact' => 'nullable|string|max:20',

            // Address
            'perm_village' => 'nullable|string|max:100',
            'perm_post_code' => 'nullable|string|max:10',
            'perm_thana' => 'nullable|string|max:100',
            'perm_district' => 'nullable|string|max:100',
            'present_village' => 'nullable|string|max:100',
            'present_post_code' => 'nullable|string|max:10',
            'present_thana' => 'nullable|string|max:100',
            'present_district' => 'nullable|string|max:100',

            // SSC
            'ssc_passing_year' => 'nullable|string|max:10',
            'ssc_institute' => 'nullable|string|max:255',
            'ssc_roll_no' => 'nullable|string|max:20',
            'ssc_registration_no' => 'nullable|string|max:30',
            'ssc_board' => 'nullable|string|max:50',
            'ssc_gpa' => 'nullable|numeric|between:1,5',

            // HSC
            'hsc_passing_year' => 'nullable|string|max:10',
            'hsc_institute' => 'nullable|string|max:255',
            'hsc_roll_no' => 'nullable|string|max:20',
            'hsc_registration_no' => 'nullable|string|max:30',
            'hsc_board' => 'nullable|string|max:50',
            'hsc_gpa' => 'nullable|numeric|between:1,5',

            // Files
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'ssc_certificate' => 'nullable|mimes:pdf,jpg,jpeg,png|max:5120',
            'hsc_certificate' => 'nullable|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        // 🟢 File Uploads
        $imagePath = $request->file('image')?->store('students/images', 'public');
        $sscCertPath = $request->file('ssc_certificate')?->store('students/certificates/ssc', 'public');
        $hscCertPath = $request->file('hsc_certificate')?->store('students/certificates/hsc', 'public');

        // 🟢 Build full addresses
        $fullPermanentAddress = "{$request->perm_village}, {$request->perm_post_code}, {$request->perm_thana}, {$request->perm_district}";
        $fullPresentAddress = "{$request->present_village}, {$request->present_post_code}, {$request->present_thana}, {$request->present_district}";

        // 🟢 Insert Student
        $student = Student2::create([
            'student_id' => $request->student_id,
            'ugc_id' => $request->ugc_id,
            'full_name' => $request->full_name,
            'registration_no' => $request->registration_no,
            'dob' => $request->dob,
            'gender' => $request->gender,
            'student_status' => $request->student_status,
            'nid_no' => $request->nid_no,
            'birth_cert_no' => $request->birth_cert_no,
            'hall' => $request->hall,

            'department' => $request->department,
            'program' => $request->program,
            'adm_semester' => $request->adm_semester,
            'batch' => $request->batch,
            'admission_date' => $request->admission_date,
            'academic_session' => $request->academic_session,

            'religion' => $request->religion,
            'nationality' => $request->nationality,
            'marital_status' => $request->marital_status,
            'blood_group' => $request->blood_group,
            'residential_status' => $request->residential_status,
            'covid_vaccine' => $request->covid_vaccine,
            'medical_test' => $request->medical_test,

            'mobile' => $request->mobile,
            'emergency_tel' => $request->emergency_tel,
            'email' => $request->email ?? "Email Not Added",

            'father_name' => $request->father_name,
            'mother_name' => $request->mother_name,
            'father_tel' => $request->father_tel,
            'mother_tel' => $request->mother_tel,
            'father_occupation' => $request->father_occupation,
            'mother_occupation' => $request->mother_occupation,

            'legal_guardian_name' => $request->legal_guardian_name,
            'legal_guardian_relation' => $request->legal_guardian_relation,
            'legal_guardian_contact' => $request->legal_guardian_contact,

            'perm_village' => $request->perm_village,
            'perm_post_code' => $request->perm_post_code,
            'perm_thana' => $request->perm_thana,
            'perm_district' => $request->perm_district,
            'present_village' => $request->present_village,
            'present_post_code' => $request->present_post_code,
            'present_thana' => $request->present_thana,
            'present_district' => $request->present_district,

            'full_permanent_address' => $fullPermanentAddress,
            'full_present_address' => $fullPresentAddress,

            'ssc_passing_year' => $request->ssc_passing_year,
            'ssc_institute' => $request->ssc_institute,
            'ssc_roll_no' => $request->ssc_roll_no,
            'ssc_registration_no' => $request->ssc_registration_no,
            'ssc_board' => $request->ssc_board,
            'ssc_gpa' => $request->ssc_gpa,

            'hsc_passing_year' => $request->hsc_passing_year,
            'hsc_institute' => $request->hsc_institute,
            'hsc_roll_no' => $request->hsc_roll_no,
            'hsc_registration_no' => $request->hsc_registration_no,
            'hsc_board' => $request->hsc_board,
            'hsc_gpa' => $request->hsc_gpa,

            'image' => $imagePath,
            'ssc_certificate' => $sscCertPath,
            'hsc_certificate' => $hscCertPath,
        ]);

        return redirect()->route('new-student-add')->with('success', 'Student created successfully');
    }

    // StudentController.php
    public function lastStudentId()
    {
        $lastStudent = Student2::orderBy('id', 'desc')->first();

        return response()->json([
            'last_student_id' => $lastStudent ? $lastStudent->student_id : null
        ]);
    }



    public function show(Student $student)
    {
//        $student->load(['information', 'address', 'education', 'file']);
        return Inertia::render('studentProfile', [
            'student' => $student,
        ]);
    }

    /*public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|string|max:20',
            'full_name' => 'required|string|max:255',
            'father_name' => 'nullable|string|max:255',
            'mother_name' => 'nullable|string|max:255',
            'dob' => 'nullable|date',
            'gender' => 'required|string|max:10',
            'batch' => 'required|string|max:10',
            'program' => 'nullable|string|max:255',
            'adm_semester' => 'nullable|string|max:255',
            'mobile' => 'nullable|string|max:20',
            'father_tel' => 'nullable|string|max:20',
            'mother_tel' => 'nullable|string|max:20',
            'emergency_tel' => 'nullable|string|max:20',
            'blood_group' => 'nullable|string|max:20',
        ]);

        Student::create($validated);

        return redirect()->back()->with('success', 'Student added successfully.');
    }*/

}
