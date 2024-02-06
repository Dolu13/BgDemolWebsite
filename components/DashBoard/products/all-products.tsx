import {ChangeEvent, useEffect, useState} from 'react';
import { Product } from "@/components/DashBoard/products/add-product";
import {Category} from "@/components/DashBoard/categories/category-dash";
import {Length} from "@/components/DashBoard/lengths/length-dash";
import {Color} from "@/components/DashBoard/colors/colors-dash";
import MultiSelectDropdown, {DropDownOption} from "@/components/DashBoard/products/MultiSelectDropDown";

interface AllProductsProps {
    fetchProducts: () => Promise<void>;
    products: Product[];
    categories: Category[];
    lengths: Length[];
    colors: Color[];
}

export default function AllProducts({ fetchProducts, products, categories, lengths, colors }: AllProductsProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product>({
        category: "",
        category_id: 0,
        color_ids: [],
        colors: [],
        img_path: "",
        length_ids: [],
        lengths: [],
        product_desc: "",
        product_id: 0,
        product_name: "",
        product_price: 0});
    const [selectedLengths, setSelectedLengths] = useState<number[]>([]);
    const [selectedColors, setSelectedColors] = useState<number[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedProduct.product_id !== 0) {
            setSelectedLengths(selectedProduct.length_ids);
            setSelectedColors(selectedProduct.color_ids);
        }
    }, [selectedProduct]);
    const handleDeleteProduct = async (productId: number | undefined) => {
        try {
            const response = await fetch(`/api/product/remove-product/`, {
                method: 'DELETE',
                body: JSON.stringify(productId),
            });
            if (response.ok) {
                // Rafraîchir la liste des produits après la suppression
                fetchProducts();
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    const handleEditProduct = (id: number | undefined) => {
        const selectedProduct = products.find(product => product.product_id === id);
        if (selectedProduct) {
            setSelectedProduct(selectedProduct);
            setSelectedColors(selectedProduct.color_ids);
            setSelectedLengths(selectedProduct.length_ids);
        }
    };

    const handleCancelEdit = () => {
        setSelectedProduct({
            category: "",
            category_id: 0,
            color_ids: [],
            colors: [],
            img_path: "",
            length_ids: [],
            lengths: [],
            product_desc: "",
            product_id: 0,
            product_name: "",
            product_price: 0});
    };

    const handleUpdateProduct = async () => {
        try {
            // Vérifier si toutes les données nécessaires sont fournies
            if (!selectedProduct) {
                console.error('Veuillez fournir toutes les données nécessaires pour la modification de la longueur');
                return;
            }
            // Appeler l'API de modification de longueur avec la méthode PUT
            const response = await fetch(`/api/product/update-product`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedProduct),
            });

            if (response.ok) {
                await fetchProducts();
                setSelectedProduct({
                    category: "",
                    category_id: 0,
                    color_ids: [],
                    colors: [],
                    img_path: "",
                    length_ids: [],
                    lengths: [],
                    product_desc: "",
                    product_id: 0,
                    product_name: "",
                    product_price: 0});
            } else {
                console.error('Erreur lors de la modification du produit');
            }
        } catch (error) {
            console.error('Erreur lors de la modification du produit', error);
        }
    };

    const handleColorsChange = (selectedOptions: number[]) => {
        setSelectedColors(selectedOptions);
    };

    const handleLengthChange = (selectedOptions: number[]) => {
        setSelectedLengths(selectedOptions);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            {selectedProduct.product_id !== 0 && (
                <div className="container mx-auto p-8">
                    <h2 className="text-2xl font-bold mb-4">Modifier une Longueur</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            required
                            type="text"
                            placeholder="Nom du produit"
                            className="border p-2 rounded-md col-span-2"
                            value={selectedProduct?.product_name}
                            onChange={(e) => setSelectedProduct({ ...selectedProduct, product_name: e.target.value })}
                        />

                        <textarea
                            required
                            placeholder="Description du produit"
                            className="border p-2 rounded-md col-span-2"
                            value={selectedProduct?.product_desc}
                            onChange={(e) => setSelectedProduct({ ...selectedProduct, product_desc: e.target.value })}
                        />

                        <input
                            required
                            type="number"
                            placeholder="Prix du produit"
                            className="border p-2 rounded-md col-span-2"
                            value={selectedProduct?.product_price}
                            onChange={(e) => setSelectedProduct({ ...selectedProduct, product_price: parseFloat(e.target.value) })}
                        />

                        <input
                            required
                            type="text"
                            placeholder="Chemin de l'image"
                            className="border p-2 rounded-md col-span-2"
                            value={selectedProduct?.img_path}
                            onChange={(e) => setSelectedProduct({ ...selectedProduct, img_path: e.target.value })}
                        />
                        <div className="col-span-2">
                            <label className=" text-sm font-medium text-gray-700">Longueur en stock:</label>
                            <p>{selectedProduct.lengths?.join(', ')}</p>
                            <MultiSelectDropdown
                                options={lengths.map(length => ({ id: length.id, label: length.length }  as DropDownOption))}
                                onChange={handleLengthChange}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className=" text-sm font-medium text-gray-700">Couleur :</label>
                            <p>{selectedProduct.colors?.join(', ')}</p>
                            <MultiSelectDropdown
                                options={colors.map(color => ({ id: color.id, label: color.color }  as DropDownOption))}
                                onChange={handleColorsChange}
                            />
                        </div>
                        <div className="col-span-2">
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-md mr-2"
                            onClick={handleCancelEdit} // Appel de la fonction pour annuler l'édition
                        >
                            Annuler
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                            onClick={handleUpdateProduct} // Appel de la fonction pour confirmer la modification
                        >
                            Valider
                        </button>
                        </div>
                    </div>
                </div>
            )}
                <div className="text-center pb-12 md:pb-16">
                    <h1 className="text-2xl md:text-4xl font-extrabold leading-tighter tracking-tighter mb-4">Liste des produits</h1>
                </div>
            <ul>
                {products && products.map(product => (
                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-3">
                    <li key={product.product_id} className="bg-white p-4 shadow rounded-md mb-4">
                        <p className="font-bold">Name: {product.product_name}</p>
                        <p className="mb-2">Description: {product.product_desc}</p>
                        <p>Price: {product.product_price}</p>
                        <p>Image Path: {product.img_path}</p>
                        <p>Categorie: {product.category}</p>
                        <p>Longueur en stock disponible: {product.lengths?.join(', ')}</p>
                        <p>Couleur: {product.colors?.join(', ')}</p>
                        <div className="mt-4">
                            <button onClick={() => handleDeleteProduct(product.product_id)} className="mr-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Supprimer</button>
                            <button onClick={() => handleEditProduct(product.product_id)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Modifier</button>
                        </div>
                    </li>
                    </div>
                ))}
                {!products || products.length == 0 && <p>Aucun produit</p>}
            </ul>

            </div>
        </div>
    );
}
