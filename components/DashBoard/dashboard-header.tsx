'use client'
import { useState } from 'react';

const DashboardHeader = () => {
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    return (
        <header className="bg-gray-800 text-white p-4 z-100">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo ou nom de votre entreprise */}
                <div className="text-xl font-bold">BGDEMOL</div>

                {/* Menu de navigation */}
                <nav className="hidden md:flex space-x-4">
                    <a href="/dashboard/products" className="hover:text-gray-300">Produits</a>

                    {/* Ajoutez un élément de liste déroulante pour "Config" */}
                    <div className="relative group">
                        <a
                            href="#"
                            className="hover:text-gray-300 cursor-pointer"
                            onClick={() => setIsConfigOpen(!isConfigOpen)}
                        >
                            Config
                        </a>

                        {/* Liste déroulante pour "Config" */}
                        {isConfigOpen && (
                            <ul className="absolute top-8 right-0 bg-gray-800 text-white p-2 space-y-2 rounded-md">
                                <li><a href="/dashboard/categories">Catégories</a></li>
                                <li><a href="/dashboard/lengths">Longueurs de Stock</a></li>
                                <li><a href="/dashboard/colors">Couleurs</a></li>
                            </ul>
                        )}
                    </div>
                </nav>

                {/* Menu de navigation pour les écrans plus petits */}
                <div className="md:hidden">
                    {/* Ajoutez un bouton ou un élément pour activer/désactiver le menu sur les écrans plus petits */}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
