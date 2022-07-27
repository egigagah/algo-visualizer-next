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

export function QuickSort<T>(
    arr: Array<T>,
    left = 0,
    right = arr.length - 1,
): Array<T> {
    if (left >= right) return arr;
    const rightIdx = PivotHelper(arr, left, right);

    // array left < array right
    // if (rightIdx - 1 - left < right - (rightIdx + 1)) {
    // console.log(arr, rightIdx, left, right, "if");
    QuickSort(arr, left, rightIdx - 1); // left array
    QuickSort(arr, rightIdx + 1, right); // right array
    // } else {
    //     // else swipe array
    //     console.log(arr, rightIdx, left, right, "else");
    //     QuickSort(arr, rightIdx + 1, right); // right array
    //     QuickSort(arr, left, rightIdx - 1); // left array
    // }

    return arr;
}

function PivotHelper<T>(arr: Array<T>, left: number, right: number): number {
    const pivot = left++;
    while (left <= right) {
        if (arr[left] > arr[pivot] && arr[right] < arr[pivot]) {
            swap(arr, left, right);
        } else if (arr[left] <= arr[pivot]) left++;
        else if (arr[right] >= arr[pivot]) right--;
    }
    swap(arr, pivot, right);

    return right;
}
