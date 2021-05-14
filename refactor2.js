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

    //To keep the interface exactly the same, this it (almost) the only mutation in the program
    x.splice(0, x.length)
    x.push.apply(x, [...arr].reverse())
};

const func3 = (f, arr) => {
    for (let i = 0; i < arr.length; i++) {
        var b = f(arr[i])

        if (b !== null) {
            return b ? i : null
        }
    }
    return null
}
const func4 = (str, start) => (strItem) => {
    var isFound = false;
    var strItr = start

    for (var y = 0; y < strItem.length; y++) {
        const chr1 = strItem.charCodeAt(y)
        const chr2 = str.charCodeAt(strItr)
        var [b, found, itr] = func5(chr1, chr2, isFound, strItr)
        if (b !== null) {
            return b
        } else {
            isFound = found
            strItr = itr
            continue
        }
    }
    return null
}
const func5 = (chr1, chr2, isFound, strItr) => {
    if (isFound) {
        if (chr1 !== chr2) {
            return [(!chr2 || chr2 < chr1), true, strItr]
        } else {
            return [null, true, strItr + 1]
        }
    } else {
        if (chr1 === 32) {
            return [null, true, strItr]
        } else {
            return [null, false, strItr]
        }
    }
}

const contains = (char, str) => str.indexOf(char) >= 0;
const addToEnd = (arr, str) => [...[...arr], str]
const addAtPosition = (arr, i, str) => {
    var x = [...arr]
    x.splice(i, 0, str)
    return x
}

export default doThingsAndStuff3
