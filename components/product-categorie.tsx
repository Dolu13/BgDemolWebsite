import Image from "next/image";
import Link from "next/link";

export interface ProductCategory{
    id: number;
    src: string;
    width: number;
    height: number;
    libelle: string;
    category: string;
}
export default function ProductCategory({ src, width, height, libelle, category , id}: ProductCategory) {
    return(
        <div className="relative shadow-md rounded-3xl border transition duration-300 ease-in-out group justify-center items-center h-full w-full  lg:flex">
            <Image className="md:max-w-none mx-auto rounded" src={src} width={width} height={height} alt={libelle} />
            <Link
                className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4  py-3 w-36 bottom-4 z-10 absolute text-base font-medium leading-none" href={"Categories/"+id.toString()}>{libelle}
            </Link>
        </div>
    );
}