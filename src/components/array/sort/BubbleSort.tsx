import React, { memo, useEffect, useState } from "react";
import { swap } from "src/utils/algo/array";
import useInterval from "src/utils/hooks/useInterval";

interface BubbleSortType<T> {
    array: T[];
    delay: number | undefined;
    isPlaying: boolean;
    playingCallback: (value: boolean) => void;
}

function BubbleSort({
    array,
    delay,
    isPlaying,
    playingCallback,
}: BubbleSortType<number | string>) {
    const [data, setData] = useState(array);
    const [length, setLength] = useState<number>(1);
    const [isSwap, setSwap] = useState(false);

    function promiseSwap(
        arr: (string | number)[],
        length: number,
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                setTimeout(() => {
                    swap(arr, length, length - 1);
                    setData(arr);
                    console.warn(arr);
                    resolve(true);
                }, delay);
            } catch (error) {
                reject(false);
            }
        });
    }

    useInterval(
        async () => {
            // setLength(length+1)
            setSwap(false);
            const arr = [...data];
            let isSorted = true;
            // setInterval(() => {
            if (length < array.length) {
                if (arr[length - 1] > arr[length]) {
                    setSwap(true);
                    await promiseSwap(arr, length);
                    console.log("all done");
                } else setLength(length + 1);
            } else {
                let n = 1;
                while (n < data.length) {
                    if (data[n - 1] > data[n]) isSorted = false;
                    n++;
                }
                setLength(1);
                if (isSorted) playingCallback(false);
            }
        },
        isPlaying ? delay : undefined,
    );

    useEffect(() => {
        setData(array);
        setLength(1);
        setSwap(false);
    }, [array]);

    return (
        <div className="flex-1 h-full flex-col justify-center content-center mt-8">
            <div className="flex justify-center">
                <h2 className="text-2xl font-bold">Bubble Sort</h2>
            </div>
            <div className="flex flex-row justify-center items-center space-x-2 drop-shadow-2xl">
                {data.length > 0 &&
                    data.map((item, idx) => (
                        <div
                            key={idx}
                            className={`flex w-20 h-20 justify-center items-center self-center text-4xl border-8 ${
                                idx === length
                                    ? "bg-green-500 shadow-2xl border-none"
                                    : "bg-white border-black"
                            } ${
                                idx === length - 1
                                    ? "bg-blue-500 border-none shadow-2xl"
                                    : "bg-white border-black"
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

const BubbleSortComponent = memo(BubbleSort, (prev, next) => {
    return (
        prev.array === next.array &&
        prev.isPlaying === next.isPlaying &&
        prev.delay === next.delay
    );
});

export default BubbleSortComponent;
