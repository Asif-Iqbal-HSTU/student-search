<?php

use App\Http\Controllers\StudentController;
use App\Models\Student;
use App\Models\Student2;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


/*Route::get('/new-student-add', function () {
    return Inertia::render('newStudentAdd');
})->name('new-student-add');*/

/*Route::get('/new-student-add', function () {
    return Inertia::render('newStudentAdd', [
        'students' => [
            'data' => [], // optional: if you want to show student list
            'links' => [],
        ],
        'filters' => [],
        'options' => [
            'batches' => DB::table('students')->distinct()->pluck('batch')->filter()->values(),
            'programs' => DB::table('students')->distinct()->pluck('program')->filter()->values(),
            'semesters' => DB::table('students')->distinct()->pluck('adm_semester')->filter()->values(),
        ]
    ]);
})->name('new-student-add');*/

/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $students = Student::all();
        return Inertia::render('dashboard');
    })->name('dashboard');
});*/

/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function (Request $request) {
        $search = $request->input('search'); // ✅ OK
        $students = Student::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where('student_id', 'like', "%{$search}%")
                    ->orWhere('full_name', 'like', "%{$search}%")
                    ->orWhere('mobile', 'like', "%{$search}%");
            })
            ->when($request->input('semester'), fn ($q, $semester) => $q->where('adm_semester', $semester))
            ->when($request->input('program'), fn ($q, $program) => $q->where('program', $program))
            ->when($request->input('batch'), fn ($q, $batch) => $q->where('batch', $batch))
            ->orderBy('full_name')
            ->paginate(10)
            ->withQueryString();

        $filters = $request->only('search', 'semester', 'program', 'batch');

        return Inertia::render('dashboard', [
            'students' => $students,
            'filters' => $filters,
        ]);
    })->name('dashboard');
});*/

Route::get('/dashboard', function (Request $request) {
    $filters = $request->only('search', 'semester', 'program', 'batch');

    $students = \App\Models\Student::query()
        ->when($filters['search'] ?? null, fn($q, $search) =>
        $q->where('student_id', 'like', "%{$search}%")
            ->orWhere('full_name', 'like', "%{$search}%")
            ->orWhere('mobile', 'like', "%{$search}%")
        )
        ->when($filters['semester'] ?? null, fn($q, $semester) => $q->where('adm_semester', $semester))
        ->when($filters['program'] ?? null, fn($q, $program) => $q->where('program', $program))
        ->when($filters['batch'] ?? null, fn($q, $batch) => $q->where('batch', $batch))
        ->orderBy('full_name')
        ->paginate(20)
        ->withQueryString();

    // DISTINCT filter options
    $semesters = Student::select('adm_semester')->distinct()->pluck('adm_semester');
    $programs = Student::select('program')->distinct()->pluck('program');
    $batches = Student::select('batch')->distinct()->pluck('batch');

    return Inertia::render('dashboard', [
        'students' => $students,
        'filters' => $filters,
        'options' => [
            'semesters' => $semesters,
            'programs' => $programs,
            'batches' => $batches,
        ]
    ]);
})->name('dashboard');

Route::get('/new-student-add', [StudentController::class, 'create'])->name('new-student-add');
Route::get('/students/last-id', [StudentController::class, 'lastStudentId']);

Route::post('/students', [StudentController::class, 'store'])->name('students.store');


Route::get('/students/{student}', [StudentController::class, 'show'])->name('students.show');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
