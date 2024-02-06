'use client'
import { useState, useEffect } from 'react';

export interface Length {
    id?: number;
    length: string;
}

export default function LengthDash() {
    const [lengths, setLengths] = useState<Length[]>([]);
    const [newLength, setNewLength] = useState<Length>({
        length: '',
    });
    const [editLength, setEditLength] = useState<Length>({
        id: undefined,
        length: '',
    });
    const [isEditing, setIsEditing] = useState<boolean>(false); // State pour gérer l'état de l'édition

    // Fonction pour ouvrir le formulaire d'édition
    const handleEditLength = (lengthId: number | undefined) => {
        // Recherche de la longueur sélectionnée dans la liste
        const selectedLength = lengths.find(length => length.id === lengthId);
        if (selectedLength) {
            // Préremplir les champs du formulaire avec les informations de la longueur sélectionnée
            setEditLength(selectedLength);
            // Activer le mode d'édition
            setIsEditing(true);
        }
    };

    // Fonction pour annuler la modification de longueur
    const handleCancelEdit = () => {
        // Réinitialiser les champs du formulaire
        setEditLength({
            id: undefined,
            length: '',
        });
        // Désactiver le mode d'édition
        setIsEditing(false);
    };

    const handleDeleteLength = async (lengthId: number | undefined) => {
        try {
            const response = await fetch(`/api/lengths/remove-length`, { method: 'DELETE', body: JSON.stringify(lengthId) });

            if (response.ok) {
                fetchLengths();
            } else {
                console.error('Error deleting length');
            }
        } catch (error) {
            console.error('Error deleting length', error);
        }
    };

    const handleAddLength = async () => {
        if (!newLength.length) {
            alert('Veuillez saisir une longueur.');
            return;
        }
        const lengthRegex = /^\d{1,8}(\.\d{1,2})?$/;
        if (!lengthRegex.test(newLength.length)) {
            alert("Veuillez saisir une longueur valide au format numérique (maximum 8 chiffres avant la virgule et 2 chiffres après la virgule).");
            return;
        }

        try {
            const response = await fetch('/api/lengths/add-length', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newLength),
            });

            if (response.ok) {
                // Réinitialiser les champs du formulaire après l'ajout de la longueur
                setNewLength({
                    length: '',
                });

                await fetchLengths();
            } else {
                console.error('Error adding length');
            }
        } catch (error) {
            console.error('Error adding length', error);
        }
    };

    const fetchLengths = async () => {
        try {
            const response = await fetch('/api/lengths/get-lengths');
            if (response.ok) {
                const data = await response.json();
                setLengths(data);
            } else {
                console.error('Error fetching lengths');
            }
        } catch (error) {
            console.error('Error fetching lengths', error);
        }
    };

    const handleModifyLength = async () => {
        try {
            // Vérifier si toutes les données nécessaires sont fournies
            if (!editLength.id || !editLength.length) {
                console.error('Veuillez fournir toutes les données nécessaires pour la modification de la longueur');
                return;
            }
            // Appeler l'API de modification de longueur avec la méthode PUT
            const response = await fetch(`/api/lengths/update-length`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editLength),
            });

            if (response.ok) {
                await fetchLengths();
                setEditLength({
                    length: '',
                });
            } else {
                console.error('Erreur lors de la modification de la longueur');
            }
        } catch (error) {
            console.error('Erreur lors de la modification de la longueur', error);
        }
    };

    useEffect(() => {
        fetchLengths();
    }, []);

    return (
        <>
            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold mb-4">Liste des Longueurs</h2>
                <ul className="grid grid-cols-2 gap-4">
                    {lengths && lengths.map(length => (
                        <li key={length.id} className="bg-white p-4 shadow rounded-md">
                            <p className="font-bold">Longueur : {length.length}</p>
                            <button
                                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                onClick={() => handleDeleteLength(length.id)}
                            >
                                Supprimer
                            </button>
                            <button
                                className="mt-2 ml-2 bg-blue-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                onClick={() => handleEditLength(length.id)}
                            >
                                Modifier
                            </button>
                        </li>
                    ))}
                    {!lengths.length && <p className="col-span-2 text-center">Aucune longueur trouvée</p>}
                </ul>
            </div>
            {!isEditing && (
                <div className="container mx-auto p-8">
                    <h2 className="text-2xl font-bold mb-4">Ajouter une Longueur</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            required
                            type="text"
                            placeholder="Longueur"
                            className="border p-2 rounded-md col-span-2"
                            value={newLength.length}
                            onChange={(e) => setNewLength({ ...newLength, length: e.target.value })}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                            onClick={handleAddLength}
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            )}

            {isEditing && (
                <div className="container mx-auto p-8">
                    <h2 className="text-2xl font-bold mb-4">Modifier une Longueur</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            required
                            type="text"
                            placeholder="Nom de la longueur"
                            className="border p-2 rounded-md col-span-2"
                            value={editLength?.length}
                            onChange={(e) => setEditLength({ ...editLength, length: e.target.value })}
                        />
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-md"
                            onClick={handleCancelEdit} // Appel de la fonction pour annuler l'édition
                        >
                            Annuler
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                            onClick={handleModifyLength} // Appel de la fonction pour confirmer la modification
                        >
                            Valider
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
