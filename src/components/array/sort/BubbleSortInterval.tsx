import PlayerContext from "@components/player/PlayerContext";
import React, { useContext, useEffect, useState } from "react";
import { swap } from "src/utils/algo/array";
import useInterval from "src/utils/hooks/useInterval";

export default function BubbleSortIntervalComponent(): JSX.Element {
    const { state, dispatch } = useContext(PlayerContext);

    const [data, setData] = useState(state.data ?? []);
    const [pointer, setPointer] = useState<number>(1);
    const [isSwap, setSwap] = useState(false);
    const [isDone, setDone] = useState(false);

    function promiseSwap(
        arr: (string | number)[],
        n: number,
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                setTimeout(
                    () => {
                        swap(arr, n, n - 1);
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
            if (pointer < arr?.length && !isDone) {
                if (arr[pointer - 1] > arr[pointer]) {
                    setSwap(true);
                    await promiseSwap(arr, pointer);
                } else setPointer(pointer + 1);
            } else if (!isDone) {
                let n = 1;
                while (n < arr?.length) {
                    if (arr[n - 1] > arr[n]) isSorted = false;
                    n++;
                }
                setPointer(1);
                if (isSorted) {
                    setDone(true);
                    setPointer(-1);
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
            setPointer(1);
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
                                idx === pointer && idx !== pointer - 1
                                    ? "border-green-700 shadow-2xl"
                                    : ""
                            } ${
                                idx === pointer - 1 && idx !== pointer
                                    ? "border-blue-700 shadow-2xl"
                                    : ""
                            }
                            ${
                                (idx <= pointer - 1 && idx !== pointer) ||
                                isDone
                                    ? "border-black"
                                    : "border-gray-300"
                            }
                  ${
                      isSwap && (idx == pointer || idx == pointer - 1)
                          ? "font-black underline"
                          : "font-normal no-underline"
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
