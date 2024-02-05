'use client'
import { useState } from 'react';

interface NewCategory {
    cat_name: string;
    cat_desc: string;
    img_path: string;
}

export default function NewCategory() {
    const [newCategory, setNewCategory] = useState<NewCategory>({
        cat_name: '',
        cat_desc: '',
        img_path: '',
    });

    const handleAddCategory = async () => {
        try {
            // Call your POST API endpoint for adding a category
            // Replace the URL with your actual API endpoint
            const response = await fetch('/api/categories/add-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });

            if (response.ok) {
                // Refresh the categories list after successful addition
                setNewCategory({
                    cat_name: '',
                    cat_desc: '',
                    img_path: '',
                });
            } else {
                console.error('Error adding category');
            }
        } catch (error) {
            console.error('Error adding category', error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Ajouter une Catégorie</h2>
            <div className="grid grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="Nom de la catégorie"
                    className="border p-2 rounded-md col-span-2"
                    value={newCategory.cat_name}
                    onChange={(e) => setNewCategory({ ...newCategory, cat_name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="border p-2 rounded-md"
                    value={newCategory.cat_desc}
                    onChange={(e) => setNewCategory({ ...newCategory, cat_desc: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Chemin de l'image"
                    className="border p-2 rounded-md"
                    value={newCategory.img_path}
                    onChange={(e) => setNewCategory({ ...newCategory, img_path: e.target.value })}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                    onClick={handleAddCategory}
                >
                    Ajouter
                </button>
            </div>
        </div>
    );
};

