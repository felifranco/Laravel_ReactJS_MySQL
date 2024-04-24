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
        Schema::create('forms', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('email', 100);
            $table->date('birth');
            $table->longText('message');
            $table->binary('image')->nullable();
            $table->timestamps();
        });

        // UPDATE FOR LARGE IMAGES
        DB::statement("ALTER TABLE basic_info.forms MODIFY COLUMN image LONGBLOB NULL;");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forms');
    }
};
