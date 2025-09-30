function chunk<T>(input: T[], n: number) {
    const len = Math.ceil(input.length / n);
    return new Array(len).fill(0).map((_, i) => input.slice(i * n, i * n + n));
}
