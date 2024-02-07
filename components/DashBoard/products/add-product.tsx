import { useState } from 'react';
import { Category } from "@/components/DashBoard/categories/category-dash";
import { Length } from "@/components/DashBoard/lengths/length-dash";
import { Color } from "@/components/DashBoard/colors/colors-dash";
import MultiSelectDropdown, {DropDownOption} from "@/components/DashBoard/products/MultiSelectDropDown";


export interface Product {
    product_id?: number;
    product_name: string;
    product_desc: string;
    product_price: number;
    category_id: number;
    category?: string;
    length_ids: number[];
    lengths?: string[];
    color_ids: number[];
    colors?: string[];
    colorsHex?: string[];
    img_path: string;
}

interface AddProductProps {
    categories: Category[];
    lengths: Length[];
    colors: Color[];
    fetchProducts: () => Promise<void>;
}

const AddProduct: React.FC<AddProductProps> = ({ categories, lengths, colors , fetchProducts}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [lengthIds, setLengthIds] = useState<number[]>([]); // Utilisez un tableau pour stocker plusieurs longueurs sélectionnées
    const [colorIds, setColorIds] = useState<number[]>([]); // Utilisez un tableau pour stocker plusieurs couleurs sélectionnées
    const [imgPath, setImgPath] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !price || !categoryId || colorIds.length === 0) return; // Vérifiez la sélection d'au moins une couleur

        const product: Product = {
            product_name: name,
            product_desc: description,
            product_price: parseFloat(price),
            category_id: parseInt(categoryId),
            length_ids: lengthIds, // Utilisez le tableau de longueurs sélectionnées
            color_ids: colorIds, // Utilisez le tableau de couleurs sélectionnées
            img_path: imgPath
        };

        handleAddProduct(product);

        // Reset form fields
        setName('');
        setDescription('');
        setPrice('');
        setCategoryId('');
        setLengthIds([]);
        setColorIds([]);
        setImgPath('');
    };

    const handleAddProduct = async (productData: Product) => {
        try {
            // Utilisez fetch ou une autre méthode pour envoyer les données du produit à votre API pour l'ajout
            const response = await fetch('/api/product/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                fetchProducts();
            } else {
                // Gérer les erreurs lors de l'ajout de produit
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product', error);
        }
    };

    const handleLengthsChange = (selectedOptions: number[]) => {
        setLengthIds(selectedOptions);
    };

    // Fonction de mise à jour pour les couleurs sélectionnées
    const handleColorsChange = (selectedOptions: number[]) => {
        setColorIds(selectedOptions);
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Ajouter un produit</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea maxLength={255} value={description} onChange={e => setDescription(e.target.value)} className="resize rounded-md mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price:</label>
                <input required type="number" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category:</label>
                <select required value={categoryId} onChange={e => setCategoryId(e.target.value)} className="mt-1 block w-full p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.cat_id} value={category.cat_id}>{category.cat_name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Longueur en stock:</label>
                    <MultiSelectDropdown
                        options={lengths.map(length => ({ id: length.id, label: length.length }  as DropDownOption))}
                        onChange={handleLengthsChange}
                    />

            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Couleur : (obligatoire)</label>
                <MultiSelectDropdown
                    options={colors.map(color => ({ id: color.id, label: color.color } as DropDownOption))}
                    onChange={handleColorsChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image:</label>
                <input type="text" value={imgPath} onChange={e => setImgPath(e.target.value)} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Ajouter un Produit</button>
        </form>
        </div>
    );
};

export default AddProduct;
