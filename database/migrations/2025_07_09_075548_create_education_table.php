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
        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->string('ssc_passing_year');
            $table->string('ssc_institute');
            $table->string('ssc_roll_no');
            $table->string('ssc_registration_no');
            $table->string('ssc_board');
            $table->string('ssc_gpa');
            $table->string('hsc_passing_year');
            $table->string('hsc_institute');
            $table->string('hsc_roll_no');
            $table->string('hsc_registration_no');
            $table->string('hsc_board');
            $table->string('hsc_gpa');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('education');
    }
};
