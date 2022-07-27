import PlayerComponent from "@components/player";
import React from "react";
import BubbleSortComponent from "./sort/BubbleSort";
import TestSortComponent from "./sort/BuubleSortTest";
import InsertionSortComponent from "./sort/InsertionSort";
import QuickSortComponent from "./sort/QuickSort";

export type SortArrayTypes = "bubble" | "insertion";

export interface ArrayWrapperType {
    type: SortArrayTypes | string | string[] | undefined;
}

export default function ArrayWrapper({ type }: ArrayWrapperType): JSX.Element {
    return (
        <div className="flex-col flex-1 space-y-8">
            <h1 className="text-center font-black text-4xl">Array Sort</h1>

            <PlayerComponent />

            {type === "bubble" && <BubbleSortComponent />}
            {type === "insertion" && <InsertionSortComponent />}
            {type === "quick" && <QuickSortComponent />}
            {type === "test" && <TestSortComponent />}
        </div>
    );
}
