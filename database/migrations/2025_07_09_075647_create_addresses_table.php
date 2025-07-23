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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();$table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->string('perm_village');
            $table->string('perm_post_code');
            $table->string('perm_thana');
            $table->string('perm_district');
            $table->string('present_village');
            $table->string('present_post_code');
            $table->string('present_thana');
            $table->string('present_district');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
