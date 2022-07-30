import React from "react";
import { AppProps } from "next/app";
// import "tailwindcss/tailwind.css";
import "@styles/global.css";
import { PlayerProvider } from "@components/player/PlayerContext";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <PlayerProvider>
            <div className="flex flex-row justify-center w-screen h-screen">
                <div className="flex-1 flex-row max-w-7xl px-4 lg:px-8">
                    <Component {...pageProps} />
                </div>
            </div>
        </PlayerProvider>
    );
}

export default MyApp;
