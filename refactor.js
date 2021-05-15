var doThingsAndStuffRefactored = x => {
    const arr =
        [...x]
            .reverse()
            .filter(s => s !== null && s !== "" && contains(' ', s))
            .reduce((agg, str) => {
                return func3(agg, str)
            }, [])

    //To keep the interface exactly the same, this it the only mutation in the program
    x.splice(0, x.length)
    x.push.apply(x, [...arr].reverse())
};
const func3 = (arr, str) => {
    let idx = [...arr]
        .reduce((_, itm, idx, reduceArr) => {
            var b = func4(str, str.indexOf(' ') + 1, itm)
            if (b !== null) {
                reduceArr.splice(0) // eww... exit early
                return b ? (idx === 0 ? 0 : idx - 1) : null
            }
            return _
        }, null)
    return idx !== null
        ? addAtPosition(arr, idx, str)
        : arr.includes(str) ? arr : addToEnd(arr, str)
}
const func4 = (str, start, strItem) => {
    return [...strItem]
        .reduce(([b, isFound, strItr], y, _, arr) => {
            if (b !== null) {
                arr.splice(0) // eww... exit early
                return [b]
            }
            return func5(str.charCodeAt(strItr), y.charCodeAt(0), isFound, strItr)
        }, [null, false, start])[0]
}
const func5 = (chr1, chr2, isFound, strItr) => {
    if (isFound) {
        if (chr1 !== chr2) {
            return [(!chr1 || chr1 < chr2), null, null]
        } else {
            return [null, true, strItr + 1]
        }
    } else {
        return [null, chr2 === 32, strItr]
    }
}
const contains = (char, str) => str.indexOf(char) >= 0;
const addToEnd = (arr, str) => [...[...arr], str]
const addAtPosition = (arr, i, str) => {
    var x = [...arr]
    x.splice(i, 0, str)
    return x
}

export default doThingsAndStuffRefactored
