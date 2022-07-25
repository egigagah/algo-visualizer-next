import React, { ChangeEvent, useContext } from "react";
import PlayerContext from "./PlayerContext";
import { IoPlay, IoPause } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";

export default function PlayerComponent(): JSX.Element {
    const { state, dispatch } = useContext(PlayerContext);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const v = Number(event.target.value);
        const value = v < 1 ? 100 : v * 500;
        console.log(value);
        dispatch({
            type: "SET_DELAY",
            data: { delay: Number(value) as number },
        });
    };

    const resetData = () => {
        dispatch({ type: "SET_RESET" });
    };

    const randomArray = () => {
        resetData();
        const x = [];
        const length = Math.floor(Math.random() * 10 + 3);
        while (x.length < length) {
            x.push(Math.floor(Math.random() * 100));
        }
        dispatch({
            type: "SET_DATA",
            data: { data: x },
        });
    };

    const setPlaying = () => {
        dispatch({
            type: state.isPlaying ? "SET_PAUSE" : "SET_PLAYING",
        });
    };

    return (
        <div className="flex-col flex space-y-8">
            <div className="flex flex-row space-x-8 justify-center">
                <button
                    className="flex-row shadow-lg px-4 py-2 border rounded-lg bg-green-200 justify-center content-center"
                    onClick={() => setPlaying()}
                >
                    {state.isPlaying ? (
                        <div className="flex flex-row justify-center content-center">
                            <IoPause className="self-center mr-2" /> Pause
                        </div>
                    ) : (
                        <div className="flex flex-row justify-center content-center">
                            <IoPlay className="self-center mr-2" /> Play
                        </div>
                    )}
                </button>
                <button
                    className="shadow-lg px-4 py-2 border rounded-lg bg-yellow-200"
                    disabled={state.isPlaying}
                    onClick={() => resetData()}
                >
                    <div className="flex flex-row justify-center content-center">
                        <HiRefresh className="self-center mr-2" /> Reset
                    </div>
                </button>
                <button
                    className="shadow-lg px-4 py-2 border rounded-lg bg-red-200"
                    onClick={() => randomArray()}
                >
                    <div className="flex flex-row justify-center content-center">
                        <FaRandom className="self-center mr-2" /> Random
                    </div>
                </button>
            </div>
            <div className="flex flex-row justify-center space-x-2">
                <label htmlFor="delay">Delay Speed: </label>
                <input
                    type="range"
                    min="0"
                    max="5"
                    name="delay"
                    onChange={handleChange}
                    value={
                        state.delay && state.delay > 100 ? state.delay / 500 : 0
                    }
                />
                <span>
                    {state.delay && state.delay > 100 ? state.delay / 500 : 0} x
                </span>
            </div>
        </div>
    );
}
