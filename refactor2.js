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
                return func2(agg, str)
            }, [])

    //Objective: Remove all items from array, add all items from new list
    log && console.log(`arr12: ${JSON.stringify(arr)}, x: ${JSON.stringify(x)}`)
    x.splice(0, x.length)
    log && console.log(`arr13: ${JSON.stringify(arr)}, x: ${JSON.stringify(x)}`)
    x.push.apply(x, [...arr].reverse())
    log && console.log(`arr14: ${JSON.stringify(arr)}, x: ${JSON.stringify(x)}`)
};

const func2 = (arr, str) => {
    log && console.log(`arr3: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)

    // Find the first space, start there
    var indexOfSpace = str.indexOf(' ')

    arr = func3(arr, str, indexOfSpace + 1)
    if (!arr.includes(str)) {
        log && console.log(`arr7: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
        arr = addToEnd(arr, str)
        log && console.log(`arr8: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
    }

    log && console.log(`arr4: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
    return arr
}

const func3 = (arr, str, start) => {
    for (let temp4 = 0; temp4 < arr.length; temp4++) {
        var strItem = arr[temp4]
        var arr2 = func4(arr, str, strItem, start, temp4)
        if (arr2 === null) {
            continue
        } else {
            return arr2
        }
    }
    return arr
}
const func4 = (arr, str, strItem, strItr, temp4, temp7) => {
    var isFound = false;

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
