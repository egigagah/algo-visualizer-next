import React, {
    createContext,
    Dispatch,
    PropsWithChildren,
    useEffect,
    useReducer,
} from "react";

export interface PlayerContextType<T> {
    data?: Array<T>;
    delay?: number | undefined;
    isPlaying?: boolean;
    isReset?: boolean;
}

interface PlayerProviderType {
    state: PlayerContextType<number | string>;
    dispatch: Dispatch<playerContextAction>;
}

interface playerContextAction {
    type: "SET_PLAYING" | "SET_PAUSE" | "SET_DATA" | "SET_DELAY" | "SET_RESET";
    data?: PlayerContextType<number | string>;
}

const defaultState: PlayerContextType<number | string> = {
    data: [9, 8, 7, 6, 5, 4, 3, 2, 1],
    delay: 1000,
    isPlaying: false,
    isReset: false,
};

const reducer = (
    state: PlayerContextType<number | string>,
    { type, data }: playerContextAction,
) => {
    const props = data;
    switch (type) {
        case "SET_PLAYING":
            return { ...state, isPlaying: true, isReset: false };
        case "SET_PAUSE":
            return { ...state, isPlaying: false, isReset: false };
        case "SET_DATA":
            return {
                ...state,
                data: props?.data,
                isReset: true,
                isPlaying: false,
            };
        case "SET_DELAY":
            return { ...state, delay: props?.delay, isReset: false };
        case "SET_RESET":
            return { ...state, isReset: true, isPlaying: false };
        default:
            return { ...state };
    }
};

const PlayerContext = createContext<PlayerProviderType>({
    state: defaultState,
    dispatch: () => ({ type: "SET_PAUSE" }),
});

export const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    useEffect(() => {
        dispatch({ type: "SET_PAUSE" });
    }, []);

    return (
        <PlayerContext.Provider value={{ state, dispatch }}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContext;
