import PlayerContext from "@components/player/PlayerContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { promiseSwap, waiting } from "src/utils/helper";

export default function QuickSortComponent(): JSX.Element {
    const { state, dispatch } = useContext(PlayerContext);

    const [data, setData] = useState(state.data ? [...state.data] : []);
    const [isDone, setDone] = useState(false);
    const [leftPointer, setLeftPointer] = useState<number>(0);
    const [rightPointer, setRightPointer] = useState<number>(
        data.length > 0 ? data.length - 1 : 0,
    );
    const [currPivot, setPivot] = useState(0);

    // ref for helper data;
    const currArray = useRef([0, data.length > 0 ? data.length - 1 : 0]);
    const stackArray = useRef([[0, data.length > 0 ? data.length - 1 : 0]]);
    const generatorStatus = useRef<Promise<IteratorResult<boolean, void>>>();
    const playingStatus = useRef<boolean>(state.isPlaying ?? false);
    const pausePosition = useRef<number[] | undefined>();
    const lengthArray = useRef<number | undefined>();

    async function init() {
        try {
            const it = sorting([...data]);
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
                await waiting(state.delay, 1, playingStatus.current);
            }
            dispatch({ type: "SET_PAUSE" });
            setDone(true);
        } catch (error) {
            console.error(error);
        }
    }

    async function* sorting(arr: (string | number)[]) {
        do {
            if (currArray.current[0] < currArray.current[1]) {
                const [left, right] = stackArray.current[0];
                lengthArray.current = right;
                const rightIdx = await pivotHelper(arr, left, right);

                // left array
                currArray.current[0] = left;
                currArray.current[1] = rightIdx - 1;
                const tmp = [];
                if (currArray.current[0] < currArray.current[1]) {
                    tmp.push([currArray.current[0], currArray.current[1]]);
                }

                // right array
                currArray.current[0] = rightIdx + 1;
                currArray.current[1] = lengthArray.current;
                if (currArray.current[0] < currArray.current[1]) {
                    tmp.push([currArray.current[0], currArray.current[1]]);
                }

                stackArray.current.push(...tmp);
            }

            if (playingStatus.current) stackArray.current.shift();
            if (stackArray.current.length > 0) {
                const [left, right] = stackArray.current[0];
                currArray.current = [left, right];
                yield false;
            } else yield true;
        } while (stackArray.current.length > 0);
        setDone(true);
        yield true;
    }

    async function pivotHelper(
        arr: (string | number)[],
        leftProps: number,
        rightProps: number,
    ): Promise<number> {
        let { left, right } = extractPausePosition(leftProps, rightProps);
        const pivot = leftProps++;
        setPivot(pivot);
        while (left <= right) {
            setLeftPointer(left);
            setRightPointer(right);
            await waiting(state.delay, 2, playingStatus.current);
            if (arr[left] > arr[pivot] && arr[right] < arr[pivot]) {
                await promiseSwap(
                    arr,
                    left,
                    right,
                    playingStatus.current,
                    (d) => {
                        setData([...d]);
                    },
                    state.delay,
                    3,
                );
            } else if (arr[left] <= arr[pivot]) left++;
            else if (arr[right] >= arr[pivot]) right--;
        }
        if (pivot !== right) {
            setRightPointer(right);
            await promiseSwap(
                arr,
                pivot,
                right,
                playingStatus.current,
                (d) => {
                    setData([...d]);
                },
                state.delay,
                5,
            );
            await waiting(state.delay, 2, playingStatus.current);
        }

        return right;
    }

    useEffect(() => {
        playingStatus.current = state.isPlaying ?? false;
        if (state.isPlaying) {
            init();
        } else {
            pausePosition.current = [leftPointer, rightPointer];
            generatorStatus.current = undefined;
        }
    }, [state.isPlaying]);

    useEffect(() => {
        if (state.isReset) {
            setData(state.data ? [...state.data] : []);
            setLeftPointer(0);
            setRightPointer((state.data && state.data.length - 1) ?? 0);
            lengthArray.current = (state.data && state.data.length - 1) ?? 0;
            setPivot(0);
            generatorStatus.current = undefined;
            setDone(false);
            pausePosition.current = undefined;
            stackArray.current = [
                [
                    0,
                    state.data && state.data.length > 0
                        ? state.data.length - 1
                        : 0,
                ],
            ];
            currArray.current = [
                0,
                state.data && state.data.length > 0 ? state.data.length - 1 : 0,
            ];
        }
    }, [state.isReset]);

    useEffect(() => {
        if (state.data) {
            setData(state.data ? [...state.data] : []);
            setLeftPointer(0);
            setRightPointer((state.data && state.data.length - 1) ?? 0);
            lengthArray.current = (state.data && state.data.length - 1) ?? 0;
            setPivot(0);
            generatorStatus.current = undefined;
            setDone(false);
            stackArray.current = [
                [
                    0,
                    state.data && state.data.length > 0
                        ? state.data.length - 1
                        : 0,
                ],
            ];
            currArray.current = [
                0,
                state.data && state.data.length > 0 ? state.data.length - 1 : 0,
            ];
        }
    }, [state.data]);

    const extractPausePosition = (leftProps: number, rightProps: number) => {
        let left = leftProps,
            right = rightProps;
        if (pausePosition.current && playingStatus.current) {
            [left, right] = pausePosition.current;
            pausePosition.current = undefined;
        }
        return { left, right };
    };

    return (
        <div className="flex-1 h-full flex-col justify-center content-center space-y-8">
            <div className="flex justify-center">
                <h2 className="text-2xl font-bold">Quick Sort</h2>
            </div>
            <div className="flex flex-row justify-center items-end space-x-2">
                {data.length > 0 &&
                    data.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                height: `${
                                    ((item as number) * 100) / 40 + 70
                                }px`,
                            }}
                            className={`flex w-20 pb-2 justify-center items-end text-4xl border-4
                            ${
                                currPivot === idx &&
                                idx !== leftPointer &&
                                !isDone
                                    ? "!border-red-500 underline font-bold !text-black"
                                    : "no-underline font-normal"
                            }
                            ${
                                idx === rightPointer &&
                                idx !== leftPointer &&
                                !isDone
                                    ? "!border-green-700 shadow-xl !text-black"
                                    : ""
                            }
                            ${
                                idx === leftPointer &&
                                idx !== rightPointer &&
                                !isDone
                                    ? "!border-blue-700 shadow-xl !text-black"
                                    : ""
                            }
                            ${
                                idx === rightPointer &&
                                idx === leftPointer &&
                                !isDone
                                    ? "!border-x-green-500 !border-y-blue-500 shadow-xl !text-black"
                                    : "border-gray-300"
                            }
                            ${
                                idx > leftPointer &&
                                idx < rightPointer &&
                                !isDone
                                    ? "!border-black !text-black"
                                    : "border-gray-300"
                            }
                            ${isDone ? "!border-black" : "text-gray-300"}
                          `}
                        >
                            {item}
                        </div>
                    ))}
            </div>
            <div className="flex flex-col items-center text-center">
                <p className="font-black">
                    Algorithm (Time & Space Complexity)
                </p>
                <div className="flex flex-row w-full lg:w-1/2 xl:w-1/3 justify-center">
                    <div className="flex-1 flex-col">
                        <p className="font-bold">Time</p>
                        <p>Best: O(n(log n))</p>
                        <p>Worst: O(n(log n))</p>
                        <p>Average: O(n(log n))</p>
                    </div>
                    <div className="flex-1 flex-col">
                        <p className="font-bold">Space</p>
                        <p>O(1)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
