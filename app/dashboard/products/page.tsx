'use client'
import AddProduct, {Product} from "@/components/DashBoard/products/add-product";
import {useEffect, useState} from "react";
import AllProducts from "@/components/DashBoard/products/all-products";

export default function Page() {
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [lengths, setLengths] = useState([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);

    const handleToggleFormVisibility = () => {
        setIsAddFormVisible(!isAddFormVisible);
    };
    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/product/get-products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Error fetching products');
            }
        } catch (error) {
            console.error('Error fetching products', error);
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

    useEffect(() => {
        // Utilisez fetch ou une autre méthode pour récupérer les catégories, les couleurs et les longueurs depuis votre API


        fetchCategories();
        fetchColors();
        fetchLengths();
    }, []);

    // Fonction de rappel pour gérer l'ajout de produits


    return <>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <AddProduct fetchProducts={fetchProducts} categories={categories} colors={colors} lengths={lengths} />
                    <AllProducts fetchProducts={fetchProducts} products={products} categories={categories} colors={colors} lengths={lengths}/>
        </div>

    </>;

}