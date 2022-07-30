import React from "react";
import Head from "next/head";
import ArrayWrapper from "@components/array/ArrayWrapper";
import { useRouter } from "next/router";
import { IoArrowBack } from "react-icons/io5";

const ArrayTypeSort: React.FC = () => {
    const router = useRouter();
    const { type } = router.query;

    return (
        <div className="flex h-full flex-col justify-between py-4">
            <Head>
                <title>Algo Visualizer - Array | By Egi Gagah Brilliant</title>
                <meta
                    name="Algo Visualizer - Array"
                    content="Algo Visualizer - Array | By Egi Gagah Brilliant"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col space-y-4">
                <div className="flex">
                    <button onClick={() => router.back()}>
                        <div className="flex flex-row justify-center content-center shadow-md border rounded-md px-4 py-2">
                            <IoArrowBack className="self-center mr-2" />
                            Back
                        </div>
                    </button>
                </div>
                <ArrayWrapper type={type} />
            </div>
            <div className="flex flex-col w-1/3 shadow-md px-4 py-2 space-y-4 text-sm">
                <div className="flex flex-col">
                    <h3>Legend</h3>
                    <div className="flex flex-row content-center items-center">
                        <div className="bg-black h-3 w-3 mr-1"></div>
                        <p>Discovered Index</p>
                    </div>
                    <div className="flex flex-row content-center items-center">
                        <div className="bg-gray-300 h-3 w-3 mr-1"></div>
                        <p>Undiscovered Index</p>
                    </div>
                    <div className="flex flex-row content-center items-center">
                        <div className="bg-blue-500 h-3 w-3 mr-1"></div>
                        <p>Left Index Value</p>
                    </div>
                    <div className="flex flex-row content-center items-center">
                        <div className="bg-green-500 h-3 w-3 mr-1"></div>
                        <p>Right Index Value</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h3>Notes</h3>
                    <div className="flex flex-row content-center items-center">
                        <p>
                            If text value are white, the index will be swaping
                            value
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArrayTypeSort;
