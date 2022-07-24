import React, { memo, useEffect, useState } from "react";
import { PromiseGenerator, swap } from "src/utils/algo/array";
import useInterval from "src/utils/hooks/useInterval";

interface InsertionSortType<T> {
    array: T[];
    delay: number | undefined;
    isPlaying: boolean;
    playingCallback: (value: boolean) => void;
}

function InsertionSort({
    array,
    delay,
    isPlaying,
    playingCallback,
}: InsertionSortType<number | string>) {
    const [data, setData] = useState(array);
    const [length, setLength] = useState<number[]>([0, 1]);
    const [sublength, setSubLength] = useState<number[]>([0, 1]);
    const [pointer, setPointer] = useState<number>(1);

    function promiseSwap(
        arr: (string | number)[],
        left: number,
        right: number,
    ): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                swap(arr, left, right);
                setPointer(left);
                setData(arr);
                resolve(true);
            }, delay);
        });
    }

    useInterval(
        async () => {
            const arr = [...data];

            let [left, right] = length;
            if (right < arr.length) {
                const [i, j] = sublength;
                if (arr[i] > arr[j] && i >= 0) {
                    await promiseSwap(arr, i, j);
                    setSubLength([i - 1, j - 1]);
                } else {
                    left++;
                    right++;
                    await PromiseGenerator(() => {
                        setSubLength([left, right]);
                        setLength([left, right]);
                        setPointer(right);
                    }, delay);
                }
            } else {
                playingCallback(false);
                setLength([0, 1]);
                setPointer(1);
            }
        },
        isPlaying ? delay : undefined,
    );

    useEffect(() => {
        setData(array);
        setLength([0, 1]);
        setSubLength([0, 1]);
        setPointer(1);
    }, [array]);

    return (
        <div className="flex-1 h-full flex-col justify-center content-center mt-8">
            <div className="flex justify-center">
                <h2 className="text-2xl font-bold">Insertion Sort</h2>
            </div>
            <div className="flex flex-row justify-center items-center space-x-2">
                {data.length > 0 &&
                    data.map((item, idx) => (
                        <div
                            key={idx}
                            className={`flex w-20 h-20 justify-center items-center self-center text-4xl border-8
                            ${
                                idx === length[1]
                                    ? "border-green-300"
                                    : "text-black border-gray-300"
                            }
                            ${
                                idx <= length[0]
                                    ? "border-blue-300"
                                    : "text-black border-gray-300"
                            }
                            ${
                                pointer === idx
                                    ? "bg-red-300 shadow-lg"
                                    : "bg-white"
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

const InsertionSortComponent = memo(InsertionSort, (prev, next) => {
    return (
        prev.array === next.array &&
        prev.isPlaying === next.isPlaying &&
        prev.delay === next.delay
    );
});

export default InsertionSortComponent;