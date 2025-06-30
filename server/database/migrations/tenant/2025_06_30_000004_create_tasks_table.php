<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('assignee_id')->nullable();
            $table->string('title');
            $table->enum('status', ['todo', 'in_progress', 'done'])->default('todo');
            $table->integer('time_spent')->default(0); // in minutes
            $table->timestamps();

            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreign('assignee_id')->references('id')->on('users')->onDelete('set null');
            $table->index(['project_id', 'assignee_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}; 