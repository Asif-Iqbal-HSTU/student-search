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
        Schema::create('all_data', function (Blueprint $table) {
            $table->id();
            $table->string('student_id')->nullable();
            $table->string('student_name')->nullable();
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('school_name')->nullable();
            $table->string('college_name')->nullable();
            $table->string('ssc_passing_year')->nullable();
            $table->string('hsc_passing_year')->nullable();
            $table->string('ssc_board')->nullable();
            $table->string('hsc_board')->nullable();
            $table->string('ssc_roll_no')->nullable();
            $table->string('hsc_roll_no')->nullable();
            $table->string('registration_no')->nullable();
            $table->string('ssc_gpa')->nullable();
            $table->string('hsc_gpa')->nullable();
            $table->string('date_of_birth')->nullable();
            $table->string('sex')->nullable();
            $table->string('department')->nullable();
            $table->string('district')->nullable();
            $table->string('student_mobile')->nullable();
            $table->string('father_mobile')->nullable();
            $table->string('mother_mobile')->nullable();
            $table->string('emergency_mobile')->nullable();
            $table->string('admission_date')->nullable();
            $table->string('hall_status')->nullable();
            $table->string('hall_admission_date')->nullable();
            $table->string('hall_admission_fee')->nullable();
            $table->string('admission_payment')->nullable();
            $table->string('scholership_waiver')->nullable();
            $table->string('second_installment')->nullable();
            $table->string('blood_group')->nullable();
            $table->string('father_occupation')->nullable();
            $table->string('religion')->nullable();
            $table->string('remarks')->nullable();
            $table->string('migration')->nullable();
            $table->string('present_address')->nullable();
            $table->string('permanent_address')->nullable();
            $table->string('admission_semester')->nullable();
            $table->string('income_range')->nullable();
            $table->string('total_gpa')->nullable();
            $table->string('category')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('drop_out')->nullable();
            $table->string('hall_cancel')->nullable();
            $table->string('thana')->nullable();
            $table->string('signature')->nullable();
            $table->string('ssc_original_papers')->nullable();
            $table->string('hsc_original_papers')->nullable();
            $table->string('mother_occupation')->nullable();
            $table->string('national_id')->nullable();
            $table->string('course_registration')->nullable();
            $table->string('birth_certificate_no')->nullable();
            $table->string('baust_registration_no')->nullable();
            $table->string('batch')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('all_data');
    }
};
