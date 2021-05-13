const log = false
var doThingsAndStuff3 = x => {
    log && console.log(`START: x: ${JSON.stringify(x)}`)

    const arr =
        [...x]
            .reverse()
            .filter(s => s !== null && s !== "")
            // string must contain a ' '
            .filter(s => contains(' ', s))
            .reduce((agg, str) => {
                log && console.log(`agg: ${JSON.stringify(agg)}, str: '${JSON.stringify(str)}'`)
                let arr = func3(agg, str, str.indexOf(' ') + 1)
                return arr.includes(str) ? arr : addToEnd(arr, str)
            }, [])

    //Objective: Remove all items from array, add all items from new list
    log && console.log(`arr12: ${JSON.stringify(arr)}, x: ${JSON.stringify(x)}`)
    x.splice(0, x.length)
    log && console.log(`arr13: ${JSON.stringify(arr)}, x: ${JSON.stringify(x)}`)
    x.push.apply(x, [...arr].reverse())
    log && console.log(`arr14: ${JSON.stringify(arr)}, x: ${JSON.stringify(x)}`)
};

const func3 = (arr, str, start) => {
    // This is hard to move to a higher order function because of the exit early and returing of the default arr
    for (let i = 0; i < arr.length; i++) {
        var newArr = func4(arr, str, start, arr[i], i)
        if (newArr) {
            return newArr
        }
    }
    return arr
}
const func4 = (arr, str, start, strItem, temp4) => {
    var isFound = false;
    var strItr = start
    for (var y = 0; y < strItem.length; y++) {
        const chr = strItem.charCodeAt(y)
        if (!isFound) {
            if (chr == 32) {
                isFound = true;
            }
            continue;
        }
        const temp7 = str.charCodeAt(strItr)
        if (temp7 === chr) {
            strItr++;
            continue;
        }
        if (!temp7 || temp7 < chr) {
            log && console.log(`arr5: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
            var temp44 = temp4 === 0 ? 0 : temp4 - 1
            arr = addAtPosition(arr, temp44, str)
            log && console.log(`arr6: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
        }
        return arr
    }
    return null
}

const contains = (char, str) => str.indexOf(char) >= 0;
const addToEnd = (arr, str) => [...[...arr], str]
const addAtPosition = (arr, i, str) => {
    // arr.splice(temp4, 0, str);
    var x = [...arr]
    x.splice(i, 0, str)
    return x
}

export default doThingsAndStuff3
