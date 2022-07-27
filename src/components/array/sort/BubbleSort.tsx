import PlayerContext from "@components/player/PlayerContext";
import React, { useContext, useEffect, useState } from "react";
import { swap } from "src/utils/algo/array";
import useInterval from "src/utils/hooks/useInterval";

export default function BubbleSortComponent(): JSX.Element {
    const { state, dispatch } = useContext(PlayerContext);

    const [data, setData] = useState(state.data ?? []);
    const [length, setLength] = useState<number>(1);
    const [isSwap, setSwap] = useState(false);
    const [isDone, setDone] = useState(false);

    function promiseSwap(
        arr: (string | number)[],
        length: number,
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                setTimeout(
                    () => {
                        swap(arr, length, length - 1);
                        setData(arr);
                        resolve(true);
                    },
                    state.delay && state.delay > 0
                        ? state.delay / 2
                        : state.delay,
                );
            } catch (error) {
                reject(false);
            }
        });
    }

    useInterval(
        async () => {
            setSwap(false);
            let isSorted = true;
            const arr = [...data];
            if (length < arr?.length && !isDone) {
                if (arr[length - 1] > arr[length]) {
                    setSwap(true);
                    await promiseSwap(arr, length);
                } else setLength(length + 1);
            } else if (!isDone) {
                let n = 1;
                while (n < arr?.length) {
                    if (arr[n - 1] > arr[n]) isSorted = false;
                    n++;
                }
                setLength(1);
                if (isSorted) {
                    setDone(true);
                    setLength(-1);
                    dispatch({ type: "SET_PAUSE" });
                }
            } else dispatch({ type: "SET_PAUSE" });
        },
        state.isPlaying
            ? state.delay && state.delay > 0
                ? state.delay / 2
                : state.delay
            : undefined,
    );

    useEffect(() => {
        if (state.isReset) {
            setData(state.data as (string | number)[]);
            setLength(1);
            setSwap(false);
            setDone(false);
        }
    }, [state]);

    return (
        <div className="flex-1 h-full flex-col justify-center content-center mt-8">
            <div className="flex justify-center">
                <h2 className="text-2xl font-bold">Bubble Sort</h2>
            </div>
            <div className="flex flex-row justify-center items-center space-x-2 drop-shadow-2xl">
                {data?.length > 0 &&
                    data?.map((item, idx) => (
                        <div
                            key={idx}
                            className={`flex w-20 h-20 justify-center items-center self-center text-4xl border-8 ${
                                idx === length
                                    ? "bg-green-500 shadow-2xl border-none"
                                    : idx <= length - 1 || isDone
                                    ? "border-black"
                                    : "bg-white border-gray-300"
                            } ${
                                idx === length - 1
                                    ? "bg-blue-500 border-none shadow-2xl"
                                    : idx <= length - 1 || isDone
                                    ? "border-black"
                                    : "bg-white border-gray-300"
                            }
                  ${
                      isSwap && (idx == length || idx == length - 1)
                          ? "font-black text-white"
                          : "font-normal"
                  }
                `}
                        >
                            {item}
                        </div>
                    ))}
            </div>
        </div>
    );
}
