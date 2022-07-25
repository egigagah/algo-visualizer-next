export function simpleFibonachi(value = 0): number {
    if (value <= 2) return 1;
    else if (value < 1) return 0;

    return simpleFibonachi(value - 1) + simpleFibonachi(value - 2);
}
