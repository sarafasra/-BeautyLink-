<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Coiffeure',
            'description' => 'Services de coiffure',
        ]);

        Category::create([
            'name' => 'Maquillage',
            'description' => 'Services de Maquillage',
        ]);

        Category::create([
            'name' => 'Onglerie',
            'description' => 'Services pour les ongles',
        ]);
    }
}
