'use client'
import { useState, useEffect } from 'react';
import * as ralColors from '../../../app/ral-colors.json';

export interface Color {
    id?: number;
    color: string;
    hexa_color: string;
}

export default function ColorDash() {
    const [colors, setColors] = useState<Color[]>([]);
    const [newColor, setNewColor] = useState<Color>({
        color: '',
        hexa_color: '',
    });
    const [editColor, setEditColor] = useState<Color>({
        id: undefined,
        color: '',
        hexa_color: '',
    });
    const [isEditing, setIsEditing] = useState<boolean>(false); // State pour gérer l'état de l'édition

    // Fonction pour ouvrir le formulaire d'édition
    const handleEditColor = (colorId: number | undefined) => {
        // Recherche de la couleur sélectionnée dans la liste
        const selectedColor = colors.find(color => color.id === colorId);
        if (selectedColor) {
            // Préremplir les champs du formulaire avec les informations de la couleur sélectionnée
            setEditColor(selectedColor);
            // Activer le mode d'édition
            setIsEditing(true);
        }
    };

    // Fonction pour annuler la modification de couleur
    const handleCancelEdit = () => {
        // Réinitialiser les champs du formulaire
        setEditColor({
            id: undefined,
            color: '',
            hexa_color: '',
        });
        // Désactiver le mode d'édition
        setIsEditing(false);
    };

    const handleDeleteColor = async (colorId: number | undefined) => {
        try {
            const response = await fetch(`/api/colors/remove-color`, { method: 'DELETE', body: JSON.stringify(colorId) });

            if (response.ok) {
                fetchColors();
            } else {
                console.error('Error deleting color');
            }
        } catch (error) {
            console.error('Error deleting color', error);
        }
    };

    const handleAddColor = async () => {
        if (!newColor.color || !/^RAL\s\d{1,4}$/.test(newColor.color)) {
            alert('Veuillez saisir une couleur au format RAL suivi d\'un espace et d\'un nombre entre 1 et 9999.');
            return;
        }

        newColor.hexa_color = ralToHex(newColor.color);

        try {
            const response = await fetch('/api/colors/add-color', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newColor),
            });

            if (response.ok) {
                // Réinitialiser les champs du formulaire après l'ajout de la couleur
                setNewColor({
                    color: '',
                    hexa_color: '',
                });

                await fetchColors();
            } else {
                console.error('Error adding color');
            }
        } catch (error) {
            console.error('Error adding color', error);
        }
    };

    const fetchColors = async () => {

        try {
            const response = await fetch('/api/colors/get-colors');
            if (response.ok) {
                const data = await response.json();
                setColors(data);

            } else {
                console.error('Error fetching colors');
            }
        } catch (error) {
            console.error('Error fetching colors', error);
        }
    };

    const handleModifyColor = async () => {
        if (!editColor.color || !/^RAL\s\d{1,4}$/.test(editColor.color)) {
            alert('Veuillez saisir une couleur au format RAL suivi d\'un espace et d\'un nombre entre 1 et 9999.');
            return;
        }
        try {
            // Vérifier si toutes les données nécessaires sont fournies
            if (!editColor.id || !editColor.color) {
                console.error('Veuillez fournir toutes les données nécessaires pour la modification de la couleur');
                return;
            }
            // Appeler l'API de modification de couleur avec la méthode PUT
            const response = await fetch(`/api/colors/update-color`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editColor),
            });

            if (response.ok) {

                await fetchColors();
                setEditColor({
                    color: '',
                    hexa_color: '',
                });
            } else {
                console.error('Erreur lors de la modification de la couleur');
            }
        } catch (error) {
            console.error('Erreur lors de la modification de la couleur', error);
        }
    };

    const ralToHex = (ralCode: string): string => {
        const ralHexColors: { [key: string]: string } = ralColors;

        ralCode = ralCode.replace(/\s/g, '');
        if (ralCode in ralHexColors) {
            return ralHexColors[ralCode];
        } else {
            return "FFFFF"; // RAL non trouvé, renvoie du blanc
        }
    };


    useEffect(() => {
        fetchColors();
    }, []);

    return (
        <>
            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold mb-4">Liste des Couleurs</h2>
                <ul className="grid grid-cols-2 gap-4">
                    {colors && colors.map(color => (
                        <li key={color.id} className="bg-white p-4 shadow rounded-md">
                            <p className="font-bold">Couleur : {color.color}</p>
                            <div
                                className="w-12 h-12"
                                style={{ backgroundColor: color.hexa_color }}
                            ></div>
                            <button
                                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                onClick={() => handleDeleteColor(color.id)}
                            >
                                Supprimer
                            </button>
                            <button
                                className="mt-2 ml-2 bg-blue-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                onClick={() => handleEditColor(color.id)}
                            >
                                Modifier
                            </button>
                        </li>
                    ))}
                    {!colors.length && <p className="col-span-2 text-center">Aucune couleur trouvée</p>}
                </ul>
            </div>
            {!isEditing && (
                <div className="container mx-auto p-8">
                    <h2 className="text-2xl font-bold mb-4">Ajouter une Couleur</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            required
                            type="text"
                            placeholder="RAL de la couleur"
                            className="border p-2 rounded-md col-span-2"
                            value={newColor.color}
                            onChange={(e) => setNewColor({ ...newColor, color: e.target.value })}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                            onClick={handleAddColor}
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            )}

            {isEditing && (
                <div className="container mx-auto p-8">
                    <h2 className="text-2xl font-bold mb-4">Modifier une Couleur</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            required
                            type="text"
                            placeholder="Nom de la couleur"
                            className="border p-2 rounded-md col-span-2"
                            value={editColor?.color}
                            onChange={(e) => setEditColor({ ...editColor, color: e.target.value })}
                        />
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-md"
                            onClick={handleCancelEdit} // Appel de la fonction pour annuler l'édition
                        >
                            Annuler
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                            onClick={handleModifyColor} // Appel de la fonction pour confirmer la modification
                        >
                            Valider
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
