import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const ArrayTypeSort: React.FC = () => {
    const router = useRouter();
    const { type } = router.query;

    console.log(type);

    return (
        <div className="flex-1">
            <Head>
                <title>
                    Algo Visualizer - Recursive | By Egi Gagah Brilliant
                </title>
                <meta
                    name="Algo Visualizer - Recursive"
                    content="Algo Visualizer - Recursive | By Egi Gagah Brilliant"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="">
                <button onClick={() => router.back()}>Back</button>
            </main>
        </div>
    );
};

export default ArrayTypeSort;
