'use client'
import { useState, useEffect } from 'react';


export interface Category {
    id?: number;
    cat_name: string;
    cat_desc: string;
    img_path: string;
}

export default function CategoryDash() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState<Category>({
        cat_name: '',
        cat_desc: '',
        img_path: '',
    });
    const [editCategory, setEditCategory] = useState<Category>({
        id: undefined,
        cat_name: '',
        cat_desc: '',
        img_path: '',
    });
    const [isEditing, setIsEditing] = useState<boolean>(false); // State pour gérer l'état de l'édition

    // Fonction pour ouvrir le formulaire d'édition
    const handleEditCategory = (catId: number | undefined) => {
        // Recherche de la catégorie sélectionnée dans la liste
        const selectedCategory = categories.find(category => category.id === catId);
        if (selectedCategory) {
            // Préremplir les champs du formulaire avec les informations de la catégorie sélectionnée
            setEditCategory(selectedCategory);
            // Activer le mode d'édition
            setIsEditing(true);
        }
    };

    // Fonction pour annuler la modification de catégorie
    const handleCancelEdit = () => {
        // Réinitialiser les champs du formulaire
        setEditCategory({
            id: undefined,
            cat_name: '',
            cat_desc: '',
            img_path: '',
        });
        // Désactiver le mode d'édition
        setIsEditing(false);
    };

    const handleDeleteCategory = async (catId: number | undefined) => {
        try {
            const response = await fetch(`/api/categories/remove-category`, { method: 'DELETE', body: JSON.stringify(catId) });

            if (response.ok) {
                fetchCategories();
            } else {
                console.error('Error deleting category');
            }
        } catch (error) {
            console.error('Error deleting category', error);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.cat_name) {
            alert('Veuillez remplir tous les champs pour ajouter une catégorie.');
            return;
        }

        try {
            const response = await fetch('/api/categories/add-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });

            if (response.ok) {
                // Réinitialiser les champs du formulaire après l'ajout de la catégorie
                setNewCategory({
                    cat_name: '',
                    cat_desc: '',
                    img_path: '',
                });

                    await fetchCategories();
            } else {
                console.error('Error adding category');
            }
        } catch (error) {
            console.error('Error adding category', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories/get-categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                console.error('Error fetching categories');
            }
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    const handleModifyCategory = async () => {
        try {
            // Vérifier si toutes les données nécessaires sont fournies
            if (!editCategory.id || !editCategory.cat_name || !editCategory.cat_desc) {
                console.error('Veuillez fournir toutes les données nécessaires pour la modification de la catégorie');
                return;
            }
            // Appeler l'API de modification de catégorie avec la méthode PUT
            const response = await fetch(`/api/categories/update-category`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editCategory),
            });

            if (response.ok) {

                await fetchCategories();
                setEditCategory({
                    cat_name: '',
                    cat_desc: '',
                    img_path: '',
                });
            } else {
                console.error('Erreur lors de la modification de la catégorie');
            }
        } catch (error) {
            console.error('Erreur lors de la modification de la catégorie', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold mb-4">Liste des Catégories</h2>
                <ul className="grid grid-cols-2 gap-4">
                    {categories && categories.map(category => (
                        <li key={category.id} className="bg-white p-4 shadow rounded-md">
                            <p className="font-bold">libelle : {category.cat_name}</p>
                            <p className="text-gray-500">description : {category.cat_desc}</p>
                            <p className="text-gray-500">src de l'image : {category.img_path} (EN DEVELOPPEMENT)</p>
                            <button
                                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                onClick={() => handleDeleteCategory(category.id)}
                            >
                                Supprimer
                            </button>
                            <button
                                className="mt-2 ml-2 bg-blue-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                onClick={() => handleEditCategory(category.id)}
                            >
                                Modifier
                            </button>
                        </li>
                    ))}
                    {!categories.length && <p className="col-span-2 text-center">Aucune catégorie trouvée</p>}
                </ul>
            </div>
            {!isEditing &&(
                <div className="container mx-auto p-8">
                    <h2 className="text-2xl font-bold mb-4">Ajouter une Catégorie</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            required
                            type="text"
                            placeholder="Nom de la catégorie"
                            className="border p-2 rounded-md col-span-2"
                            value={newCategory.cat_name}
                            onChange={(e) => setNewCategory({ ...newCategory, cat_name: e.target.value })}
                        />
                        <input
                            required
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
            )}

            {isEditing && (
                <div className="container mx-auto p-8">
                    <h2 className="text-2xl font-bold mb-4">Modifier une Catégorie</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            required
                            type="text"
                            placeholder="Nom de la catégorie"
                            className="border p-2 rounded-md col-span-2"
                            value={editCategory?.cat_name}
                            onChange={(e) => setEditCategory({ ...editCategory, cat_name: e.target.value })}
                        />
                        <input
                            required
                            type="text"
                            placeholder="Description"
                            className="border p-2 rounded-md"
                            value={editCategory.cat_desc}
                            onChange={(e) => setEditCategory({ ...editCategory, cat_desc: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Chemin de l'image"
                            className="border p-2 rounded-md"
                            value={editCategory.img_path}
                            onChange={(e) => setEditCategory({ ...editCategory, img_path: e.target.value })}
                        />
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-md"
                            onClick={handleCancelEdit} // Appel de la fonction pour annuler l'édition
                        >
                            Annuler
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                            onClick={handleModifyCategory} // Appel de la fonction pour confirmer la modification
                        >
                            Valider
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
