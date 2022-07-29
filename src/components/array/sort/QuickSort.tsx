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
    const currArrayLength = useRef([0, data.length > 0 ? data.length - 1 : 0]);
    const stackArray = useRef([[0, data.length > 0 ? data.length - 1 : 0]]);
    // const pausePosition = useRef<number | null>(null);
    const generatorStatus = useRef<Promise<IteratorResult<boolean, void>>>();
    const playingStatus = useRef<boolean>(state.isPlaying ?? false);

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
        } catch (error) {
            console.error(error);
        }
    }

    async function* sorting(arr: (string | number)[]) {
        do {
            if (currArrayLength.current[1] - currArrayLength.current[0] > 1) {
                const [left, right] = stackArray.current[0];
                const rightIdx = await pivotHelper(arr, left, right);

                // left array
                currArrayLength.current[0] = left;
                currArrayLength.current[1] = rightIdx - 1;
                const tmp = [];
                if (currArrayLength.current[0] < currArrayLength.current[1]) {
                    tmp.push([
                        currArrayLength.current[0],
                        currArrayLength.current[1],
                    ]);
                }

                // right array
                currArrayLength.current[0] = rightIdx + 1;
                currArrayLength.current[1] = rightPointer;
                if (currArrayLength.current[0] < currArrayLength.current[1]) {
                    tmp.push([
                        currArrayLength.current[0],
                        currArrayLength.current[1],
                    ]);
                }

                stackArray.current.push(...tmp);
            }

            stackArray.current.shift();
            if (stackArray.current.length > 0) {
                const [left, right] = stackArray.current[0];
                currArrayLength.current = [left, right];
                yield false;
            } else yield true;
        } while (stackArray.current.length > 0);
        setDone(true);
        yield true;
    }

    async function pivotHelper(
        arr: (string | number)[],
        left: number,
        right: number,
    ): Promise<number> {
        const pivot = left++;
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
                    2,
                );
            } else if (arr[left] <= arr[pivot]) left++;
            else if (arr[right] >= arr[pivot]) right--;
            await waiting(state.delay, 2, playingStatus.current);
        }
        if (pivot !== right) {
            setRightPointer(right);
            await waiting(state.delay, 2, playingStatus.current);
            await promiseSwap(
                arr,
                pivot,
                right,
                playingStatus.current,
                (d) => {
                    setData([...d]);
                },
                state.delay,
                1,
            );
            await waiting(state.delay, 2, playingStatus.current);
        }

        return right;
    }

    useEffect(() => {
        playingStatus.current = state.isPlaying ?? false;
        if (state.isPlaying) {
            init();
        }
    }, [state.isPlaying]);

    useEffect(() => {
        if (state.isReset) {
            setData(state.data ? [...state.data] : []);
            setLeftPointer(0);
            setRightPointer((state.data && state.data.length - 1) ?? 0);
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
            currArrayLength.current = [
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
            currArrayLength.current = [
                0,
                state.data && state.data.length > 0 ? state.data.length - 1 : 0,
            ];
        }
    }, [state.data]);

    return (
        <div className="flex-1 h-full flex-col justify-center content-center space-y-8">
            <div className="flex justify-center">
                <h2 className="text-2xl font-bold">Quick Sort</h2>
            </div>
            <div className="flex flex-row justify-center items-center space-x-2">
                {data.length > 0 &&
                    data.map((item, idx) => (
                        <div
                            key={idx}
                            className={`flex w-20 h-20 justify-center items-center self-center text-4xl border-8
                            ${
                                currPivot === idx && idx !== leftPointer
                                    ? "border-red-500 underline font-bold"
                                    : "no-underline font-normal"
                            }
                            ${
                                idx > leftPointer && idx < rightPointer
                                    ? "border-black"
                                    : "border-gray-300"
                            }
                            ${
                                idx === rightPointer && idx !== leftPointer
                                    ? "border-green-600"
                                    : ""
                            }
                            ${
                                idx === leftPointer && idx !== rightPointer
                                    ? "border-blue-500"
                                    : ""
                            }
                            ${
                                idx === rightPointer && idx === leftPointer
                                    ? "border-x-green-500 border-y-blue-500"
                                    : "border-gray-300"
                            }
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
                        <p>Best: O(n)</p>
                        <p>Worst: O(n^2)</p>
                        <p>Average: O(n^2)</p>
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
