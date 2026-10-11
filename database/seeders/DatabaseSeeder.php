<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Safe to run on every deploy: firstOrCreate won't duplicate.
        $user = User::firstOrCreate(
            ['email' => 'demo@example.com'],
            ['name' => 'Demo User', 'password' => Hash::make('password')]
        );

        if ($user->tickets()->count() === 0) {
            $samples = [
                ['Printer not working', 'The office printer shows a paper jam error but there is no paper stuck.', 'High', 'Open', 'Hardware'],
                ['Cannot access shared drive', 'Getting access denied when opening the shared folder since Monday.', 'Medium', 'In Progress', 'Network'],
                ['Install design software', 'Need the latest design suite installed on my workstation.', 'Low', 'Open', 'Software'],
                ['Password reset request', 'Locked out of my account after too many failed attempts.', 'Urgent', 'Resolved', 'Account'],
            ];
            foreach ($samples as [$title, $description, $priority, $status, $category]) {
                $user->tickets()->create(compact('title', 'description', 'priority', 'status', 'category'));
            }
        }
    }
}
