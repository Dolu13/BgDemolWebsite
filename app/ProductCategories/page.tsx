import TolesBardage from "@/public/images/bardage.png";
import Image from "next/image";

export default function Page() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <div className="text-center pb-12 md:pb-16">
                <h1 className="text-2xl md:text-4xl font-extrabold leading-tighter tracking-tighter mb-4"> Nos Produits</h1>
                </div>
        <div className="flex justify-center items-center">
            <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
                <div className="flex flex-col jusitfy-center items-center space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-x-8 w-full">
                        <div className="relative group flex justify-center items-center h-full w-full">
                            <Image className="md:max-w-none mx-auto rounded" src={TolesBardage} width={370} height="462" alt="Features bg" />
                            <a
                                className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4  py-3 w-36 bottom-4 z-10 absolute text-base font-medium leading-none" href="/">Tôles Imitation Tuiles
                            </a>
                        </div>

                        <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">
                            <div className="relative group flex justify-center items-center h-full w-full">
                                <Image className="md:max-w-none mx-auto rounded" src={TolesBardage} width={370} height="462" alt="Features bg" />
                                <a
                                    className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4  py-3 w-36 bottom-4 z-10 absolute text-base font-medium leading-none" href="/">Accesoires
                                </a>
                            </div>
                            <div className="relative group flex justify-center items-center h-full w-full">
                                <Image className="md:max-w-none mx-auto rounded" src={TolesBardage} width={370} height="462" alt="Features bg" />
                                <a
                                    className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4  py-3 w-36 bottom-4 z-10 absolute text-base font-medium leading-none" href="/">Profils spécifiques
                                </a>
                            </div>
                        </div>

                        <div className="relative group justify-center items-center h-full w-full hidden lg:flex">
                            <Image className="md:max-w-none mx-auto rounded" src={TolesBardage} width={370} height="462" alt="Features bg" />
                            <a
                                className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4  py-3 w-36 bottom-4 z-10 absolute text-base font-medium leading-none" href="/">Tôles Bac Acier
                            </a>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        </div>
            </div>
    );
}