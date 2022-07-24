import React from "react";
import Head from "next/head";
import ArrayWrapper from "@components/array/ArrayWrapper";
import Link from "next/link";

const Home: React.FC = () => {
    return (
        <div className="flex-1 h-screen">
            <Head>
                <title>Next.js</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="">
                <div className="flex flex-col">
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
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
