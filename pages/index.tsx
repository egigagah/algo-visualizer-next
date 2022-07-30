import React, { useEffect, useLayoutEffect } from "react";
import Head from "next/head";
import Router from "next/router";

const Home: React.FC = () => {
    useLayoutEffect(() => {
        Router.replace("array/sort/quick");
    }, []);

    return (
        <div className="flex flex-col">
            <Head>
                <title>Algo Visualizer | By Egi Gagah Brilliant</title>
                <meta
                    name="algo visualizer By Egi Gagah Brilliant"
                    content="Algo Visualization By Egi Gagah Brilliant"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="">
                {/* <div className="flex flex-col">
                    <h2>Sort Array</h2>
                    <div className="flex flex-row space-x-4">
                        <button className="shadow-lg px-4 py-2 border rounded-lg bg-green-200">
                            <Link href="array/sort/bubble">Bubble Sort</Link>
                        </button>
                        <button className="shadow-lg px-4 py-2 border rounded-lg bg-green-200">
                            <Link href="array/sort/insertion">
                                Insertion Sort
                            </Link>
                        </button>
                        <button className="shadow-lg px-4 py-2 border rounded-lg bg-green-200">
                            <Link href="array/sort/quick">Quick Sort</Link>
                        </button>
                    </div>
                </div> */}
            </main>
        </div>
    );
};

export default Home;
