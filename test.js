function delimit(input, d) {
    let split = [];
    for (let i = input.length; i > 0; i -= 3) {
        split.unshift(input.substring(i - 3, i));
    }
    return split.join(d);
}
