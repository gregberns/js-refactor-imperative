const log = false
var doThingsAndStuff3 = x => {
    log && console.log(`START: x: ${JSON.stringify(x)}`)

    const arr =
        [...x]
            .reverse()
            .filter(s => s !== null && s !== "" && contains(' ', s))
            .reduce((agg, str) => {
                let i = func3(func4(str, str.indexOf(' ') + 1), agg)
                return i !== null
                    ? addAtPosition(agg, i === 0 ? 0 : i - 1, str)
                    : agg.includes(str) ? agg : addToEnd(agg, str)
            }, [])

    //To keep the interface exactly the same, this it the only mutation in the program
    x.splice(0, x.length)
    x.push.apply(x, [...arr].reverse())
};

const func3 = (f, arr) => {
    return arr
        .slice(0)
        .reduce((_, itm, idx, reduceArr) => {
            var b = f(itm)
            if (b !== null) {
                reduceArr.splice(0) // eww... exit early
                return b ? idx : null
            }
            return _
        }, null)
}
const func4 = (str, start) => (strItem) => {
    return range(0, strItem.length - 1)
        .reduce(([b, isFound, strItr], y, _, arr) => {
            const chr1 = strItem.charCodeAt(y)
            const chr2 = str.charCodeAt(strItr)
            var [b, isFound, strItr] = func5(chr1, chr2, isFound, strItr)
            if (b !== null) {
                arr.splice(0) // eww... exit early
                return [b]
            }
            return [b, isFound, strItr]
        }, [null, false, start])[0]
}
const func5 = (chr1, chr2, isFound, strItr) => {
    if (isFound) {
        if (chr1 !== chr2) {
            return [(!chr2 || chr2 < chr1), null, null]
        } else {
            return [null, true, strItr + 1]
        }
    } else {
        return [null, chr1 === 32, strItr]
    }
}
function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => i)
}
const contains = (char, str) => str.indexOf(char) >= 0;
const addToEnd = (arr, str) => [...[...arr], str]
const addAtPosition = (arr, i, str) => {
    var x = [...arr]
    x.splice(i, 0, str)
    return x
}

export default doThingsAndStuff3
