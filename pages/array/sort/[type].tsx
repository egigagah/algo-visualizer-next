import React from "react";
import Head from "next/head";
import ArrayWrapper from "@components/array/ArrayWrapper";
import { useRouter } from "next/router";

const ArrayTypeSort: React.FC = () => {
    const router = useRouter();
    const { type } = router.query;

    console.log(type);

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
                <button onClick={() => router.back()}>Back</button>
                <ArrayWrapper type={type} />
            </main>
        </div>
    );
};

export default ArrayTypeSort;
