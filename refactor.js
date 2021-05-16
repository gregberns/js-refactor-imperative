export const doThingsAndStuffRefactored = x => {
    const arr =
        [...x]
            .reverse()
            .filter(s => s !== null && s !== "" && contains(' ', s))
            .reduce((arr, str) => {
                var idx = itrArr(arr, str)
                return idx === null
                    ? arr.includes(str) ? arr : addToEnd(arr, str)
                    : addAtPosition(arr, idx, str)
            }, [])

    //To keep the interface exactly the same, this it the only mutation in the program
    x.splice(0, x.length)
    x.push.apply(x, [...arr].reverse())
};
const itrArr = (arr, str) => {
    let [b, idx] =
        foldWhile(
            [null, null],
            (_, strItem, idx) => [itrStr(str, str.indexOf(' ') + 1, strItem), idx],
            (agg) => agg[0] === null,
            arr);
    return b ? (idx === 0 ? 0 : idx - 1) : null
}
const itrStr = (str, start, strItem) =>
    foldWhile(
        [null, false, start],
        ([b, isFound, strItr], i, _, arr) =>
            charCompare(str.charCodeAt(strItr), i.charCodeAt(0), isFound, strItr),
        ([b]) => b === null,
        strItem
    )[0]

const charCompare = (chr1, chr2, isFound, strItr) => {
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
// f :: (agg, i, idx, arr) -> [bool, agg]
// g :: (agg) -> bool
export const foldWhile = (init, f, g, arr) =>
    [...arr]
        .reduce((agg, i, idx, reduceArr) => {
            var aggOut = f(agg, i, idx, reduceArr)
            if (g(aggOut) === false) {
                // exit early with returned value
                reduceArr.splice(0)
                return aggOut
            }
            return aggOut
        }, init)
const contains = (char, str) => str.indexOf(char) >= 0;
const addToEnd = (arr, str) => [...[...arr], str]
const addAtPosition = (arr, i, str) => {
    var x = [...arr]
    x.splice(i, 0, str)
    return x
}
