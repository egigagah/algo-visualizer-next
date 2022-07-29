import PlayerContext from "@components/player/PlayerContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { swap } from "src/utils/algo/array";

export default function BubbleSortComponent(): JSX.Element {
    const { state, dispatch } = useContext(PlayerContext);

    const [data, setData] = useState<(string | number)[]>(
        state.data ? [...state.data] : [],
    );
    const [length, setLength] = useState<number>(1);
    const [isSwap, setSwap] = useState(false);
    const [isDone, setDone] = useState(false);
    const [isSorted, setSorted] = useState(false);
    const pausePosition = useRef<number | null>(null);
    const generatorStatus =
        useRef<Promise<IteratorResult<boolean, boolean | undefined>>>();
    const playingStatus = useRef(state.isPlaying);

    function promiseSwap(
        arr: (string | number)[],
        i: number,
        j: number,
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                setTimeout(async () => {
                    if (!playingStatus.current) return;
                    swap(arr, i, j);
                    setData([...arr]);
                    resolve(true);
                }, state.delay);
            } catch (error) {
                reject(false);
            }
        });
    }

    function waiting(div = 1): Promise<boolean> {
        return new Promise((res) => {
            setTimeout(
                () => {
                    if (!playingStatus.current) return;
                    res(true);
                },
                state.delay ? state.delay / div : 0,
            );
        });
    }

    async function* sorting(arr: (string | number)[]) {
        let sorted = isSorted;
        do {
            let i = pausePosition.current ?? 1;
            if (pausePosition.current) pausePosition.current = null;
            sorted = true;
            while (i < arr.length && !isDone) {
                if (!playingStatus.current) return sorted;
                setSwap(false);
                if (arr[i - 1] > arr[i]) {
                    setLength(i);
                    setSwap(true);
                    await promiseSwap(arr, i - 1, i);
                    await waiting(2);
                    sorted = false;
                    yield sorted;
                }
                i++;
            }
        } while (!sorted);
        setDone(true);
        setSorted(true);
        yield true;
    }

    async function init() {
        try {
            const arr = [...data];
            const it = sorting(arr);
            if (!(await generatorStatus.current))
                generatorStatus.current = it.next();
            while (
                generatorStatus.current &&
                !(await generatorStatus.current).value &&
                !(await generatorStatus.current).done &&
                playingStatus.current &&
                !isDone
            ) {
                generatorStatus.current = it.next();
                await waiting();
            }
            dispatch({ type: "SET_PAUSE" });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (state.isReset) {
            setData(state.data ? [...state.data] : []);
            setLength(1);
            setSorted(false);
            setSwap(false);
            setDone(false);
            generatorStatus.current = undefined;
            pausePosition.current = null;
        }
    }, [state.isReset]);

    useEffect(() => {
        playingStatus.current = state.isPlaying;
        if (state.isPlaying) {
            init();
        } else if (!state.isPlaying) {
            pausePosition.current = length;
            generatorStatus.current = undefined;
        }
    }, [state.isPlaying]);

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
                                    ? "border-green-700 shadow-2xl"
                                    : idx <= length - 1 || isDone
                                    ? "border-black"
                                    : "border-gray-300"
                            } ${
                                idx === length - 1
                                    ? "border-blue-700 shadow-2xl"
                                    : idx <= length - 1 || isDone
                                    ? "border-black"
                                    : "border-gray-300"
                            }
                  ${
                      isSwap && (idx == length || idx == length - 1)
                          ? "font-black underline"
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
