export function swap<T>(array: Array<T>, i: number, j: number): void {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

export function bubbleSortArray<T>(
    array: Array<T>,
    slow = 0,
    fast = 1,
): Array<T> {
    let isSorted = true;
    while (fast < array.length) {
        if (array[slow] > array[fast]) {
            swap(array, slow, fast);
            isSorted = false;
        }
        fast++;
        slow++;
    }

    return isSorted ? array : bubbleSortArray(array, 0, 1);
}

export function insertionSortArray<T>(array: Array<T>): Array<T> {
    let left = 0,
        right = 1;
    while (right < array.length) {
        let i = left;
        let j = right;
        while (array[i] > array[j] && i >= 0) {
            swap(array, i, j);
            i--;
            j--;
        }
        right++;
        left++;
    }

    return array;
}

export function PromiseGenerator(
    callback: () => void,
    delay: number | undefined,
): Promise<boolean> {
    return new Promise<boolean>((res) => {
        setTimeout(() => {
            callback();
            res(true);
        }, delay);
    });
}
