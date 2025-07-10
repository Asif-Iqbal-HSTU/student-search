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
        Schema::create('information', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->string('department');
            $table->string('religion');
            $table->string('nationality');
            $table->string('marital_status');
            $table->string('father_occupation');
            $table->string('mother_occupation');
            $table->string('student_status');
            $table->string('residential_status');
            $table->string('email');
            $table->string('nid_no');
            $table->string('birth_cert_no');
            $table->string('admission_date');
            $table->string('session');
            $table->string('covid_vaccine');
            $table->string('registration_no');
            $table->string('medical_test');
            $table->string('legal_guardian_name')->nullable();
            $table->string('legal_guardian_relation')->nullable();
            $table->string('legal_guardian_contact')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('information');
    }
};
