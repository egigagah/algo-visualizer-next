import { useEffect, useRef } from "react";

function useInterval(callback: () => void, delay?: number | undefined): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const callbackRef = useRef(() => {});

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!delay && delay !== 0) return;

        const interval = setInterval(() => callbackRef.current(), delay);
        return () => clearInterval(interval);
    }, [delay]);
}

export default useInterval;
