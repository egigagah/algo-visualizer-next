import { swap } from "./algo/array";

export function waiting(
    delay: number | undefined,
    div = 1,
    isPlaying: boolean,
): Promise<boolean> {
    return new Promise((res) => {
        setTimeout(
            () => {
                if (!isPlaying) return;
                res(true);
            },
            delay ? delay / div : 0,
        );
    });
}

export function promiseSwap(
    arr: (string | number)[],
    i: number,
    j: number,
    isPlaying: boolean,
    action: (d: (string | number)[]) => void,
    delay: number | undefined,
    div = 1,
): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            setTimeout(
                () => {
                    if (!isPlaying) return;
                    swap(arr, i, j);
                    action(arr);
                    resolve(true);
                },
                delay ? delay / div : 0,
            );
        } catch (error) {
            reject(false);
        }
    });
}
