<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student2s', function (Blueprint $table) {
            $table->id();
            $table->string('student_id')->unique();
            $table->string('ugc_id')->nullable();
            $table->string('full_name');
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('dob')->nullable();
            $table->string('gender')->nullable();
            $table->string('batch')->nullable();
            $table->string('program')->nullable();
            $table->string('adm_semester')->nullable();
            $table->string('mobile')->nullable();
            $table->string('father_tel')->nullable();
            $table->string('mother_tel')->nullable();
            $table->string('emergency_tel')->nullable();
            $table->string('blood_group')->nullable();
            $table->string('department')->nullable();
            $table->string('religion')->nullable();
            $table->string('nationality')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('father_occupation')->nullable();
            $table->string('mother_occupation')->nullable();
            $table->string('student_status')->nullable();
            $table->string('residential_status')->nullable();
            $table->string('email')->nullable();
            $table->string('nid_no')->nullable();
            $table->string('birth_cert_no')->nullable();
            $table->string('admission_date')->nullable();
            $table->string('academic_session')->nullable();
            $table->string('covid_vaccine')->nullable();
            $table->string('registration_no')->nullable();
            $table->string('medical_test')->nullable();
            $table->string('legal_guardian_name')->nullable();
            $table->string('legal_guardian_relation')->nullable();
            $table->string('legal_guardian_contact')->nullable();

            // Permanent address
            $table->string('perm_village')->nullable();
            $table->string('perm_post_code')->nullable();
            $table->string('perm_thana')->nullable();
            $table->string('perm_district')->nullable();
            $table->string('full_permanent_address')->nullable();

            // Present address
            $table->string('present_village')->nullable();
            $table->string('present_post_code')->nullable();
            $table->string('present_thana')->nullable();
            $table->string('present_district')->nullable();
            $table->string('full_present_address')->nullable();

            // SSC info
            $table->string('ssc_passing_year')->nullable();
            $table->string('ssc_institute')->nullable();
            $table->string('ssc_roll_no')->nullable();
            $table->string('ssc_registration_no')->nullable();
            $table->string('ssc_board')->nullable();
            $table->string('ssc_gpa')->nullable();

            // HSC info
            $table->string('hsc_passing_year')->nullable();
            $table->string('hsc_institute')->nullable();
            $table->string('hsc_roll_no')->nullable();
            $table->string('hsc_registration_no')->nullable();
            $table->string('hsc_board')->nullable();
            $table->string('hsc_gpa')->nullable();

            // Others
            $table->string('fee_code')->nullable();
            $table->string('enrollment_type')->nullable();
            $table->string('hall')->nullable();
            $table->text('remark')->nullable();

            // File uploads
            $table->string('image')->nullable();
            $table->string('ssc_certificate')->nullable();
            $table->string('hsc_certificate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student2s');
    }
};
