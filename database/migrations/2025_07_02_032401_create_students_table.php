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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_id', 20);
            $table->string('ugc_id', 20);
            $table->string('full_name');
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('dob')->nullable();
            $table->string('gender', 10);
            $table->string('batch', 10);
            $table->string('program')->nullable();
            $table->string('adm_semester')->nullable();
            $table->string('mobile', 20)->nullable();
            $table->string('father_tel', 20)->nullable();
            $table->string('mother_tel', 20)->nullable();
            $table->string('emergency_tel', 20)->nullable();
            $table->string('full_permanent_address', 200)->nullable();
            $table->string('full_present_address', 200)->nullable();
            $table->string('blood_group', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
