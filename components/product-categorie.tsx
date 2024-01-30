import Image from "next/image";

export interface ProductCategory{
    src: string;
    width: number;
    height: number;
    libelle: string;
    category: string;
}
export default function ProductCategory({ src, width, height, libelle, category }: ProductCategory) {
    return(
        <div className="relative group justify-center items-center h-full w-full  lg:flex">
            <Image className="md:max-w-none mx-auto rounded" src={src} width={width} height={height} alt={libelle} />
            <a
                className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4  py-3 w-36 bottom-4 z-10 absolute text-base font-medium leading-none" href={category}>{libelle}
            </a>
        </div>
    );
}