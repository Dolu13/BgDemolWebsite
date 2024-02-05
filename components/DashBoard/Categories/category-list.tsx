'use client'
import { useState, useEffect } from 'react';

interface Category {
    id: number;
    name: string;
    description: string;
}

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Fetch categories data from your API endpoint
        // Replace the URL with your actual API endpoint
        fetch('/api/categories/get-categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories', error));
    }, []);

    const handleDeleteCategory = async (catId: number) => {
        try {
            // Call your DELETE API endpoint for deleting a category
            // Replace the URL with your actual API endpoint
            const response = await fetch(`/api/categories/${catId}`, { method: 'DELETE' });

            if (response.ok) {
                setCategories(categories.filter(category => category.id !== catId));
            } else {
                console.error('Error deleting category');
            }
        } catch (error) {
            console.error('Error deleting category', error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Liste des Catégories</h2>
            <ul className="grid grid-cols-2 gap-4">
                {categories && categories.map(category => (
                    <li key={category.id} className="bg-white p-4 shadow rounded-md">
                        <p className="font-bold">{category.name}</p>
                        <p className="text-gray-500">{category.description}</p>
                        <button
                            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                            onClick={() => handleDeleteCategory(category.id)}
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
                {!categories.length && <p className="col-span-2 text-center">Aucune catégorie trouvée</p>}
            </ul>
        </div>
    );
};

