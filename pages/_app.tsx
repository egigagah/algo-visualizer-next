import React, { useEffect } from "react";
import { AppProps } from "next/app";
// import "tailwindcss/tailwind.css";
import "@styles/global.css";
import { PlayerProvider } from "@components/player/PlayerContext";
import Link from "next/link";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const route = useRouter();
    return (
        <PlayerProvider>
            <div className="flex flex-row justify-center w-screen h-screen">
                <div className="flex-1 flex-col max-w-[100rem] ">
                    <div className="w-full flex flex-row items-center p-4 shadow-lg bg-sky-600">
                        <div className="flex flex-row items-center space-x-4">
                            <h2 className="text-white font-bold text-xl">
                                Sort Type:
                            </h2>
                            <div className="flex flex-row space-x-4">
                                <button
                                    className={`shadow-lg text-sm px-2 py-2 border rounded-lg  ${
                                        route.query.type === "bubble"
                                            ? "bg-slate-400 border-slate-400 text-white"
                                            : "bg-slate-200 border-slate-200 text-black"
                                    }`}
                                >
                                    <Link href="/array/sort/bubble">
                                        Bubble Sort
                                    </Link>
                                </button>
                                <button
                                    className={`shadow-lg text-sm px-2 py-2 border rounded-lg  ${
                                        route.query.type === "insertion"
                                            ? "bg-slate-400 border-slate-400 text-white"
                                            : "bg-slate-200 border-slate-200 text-black"
                                    }`}
                                >
                                    <Link href="/array/sort/insertion">
                                        Insertion Sort
                                    </Link>
                                </button>
                                <button
                                    className={`shadow-lg text-sm px-2 py-2 border rounded-lg  ${
                                        route.query.type === "quick"
                                            ? "bg-slate-400 border-slate-400 text-white"
                                            : "bg-slate-200 border-slate-200 text-black"
                                    }`}
                                >
                                    <Link href="/array/sort/quick">
                                        Quick Sort
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col px-4 lg:px-8">
                        <Component {...pageProps} />
                    </div>
                </div>
            </div>
        </PlayerProvider>
    );
}

export default MyApp;
