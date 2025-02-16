import Image from "next/image";
import {Product} from "@/components/DashBoard/products/add-product";
import TolesBardage from "@/public/images/bardage.png";
import {useEffect} from "react";

interface ProductDetailProps {
    product: Product; // Assurez-vous que Product est correctement importé depuis votre application
}
export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {

    return(
        <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <Image alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={TolesBardage} width={"500"} height={"300"}/>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.product_name}</h1>
                            <div className="flex mb-4">

                                {product.product_price}
                            </div>
                            <p className="leading-relaxed">{product.product_desc}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Couleur</span>

                                    {product.colors && product.colors.map((color, index) => (
                                        <div key={index}>
                                            <span className="border-2">{color}{product.colorsHex?.length}+1</span>
                                            {/*{product.colorsHex[index] && (
                                                <button
                                                    className={`border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none`}
                                                    style={{ backgroundColor: product.colorsHex[index] }}
                                                ></button>
                                            )}*/}
                                        </div>
                                    ))}
                                </div>
                                {/*<div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                            <option>SM</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
                                    </div>
                                </div>*/}
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">{product.product_price}/m²</span><span className="ml-2 text-base font-medium">Hors taxe</span>
                                {/*  <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Button</button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>*/}
                            </div>
                        </div>
                </div>
            </div>
        </section>
    );
}