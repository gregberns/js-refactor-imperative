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

    arr = func3(arr, str, indexOfSpace, indexOfSpace + 1)
    if (!arr.includes(str)) {
        log && console.log(`arr7: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
        arr = addToEnd(arr, str)
        log && console.log(`arr8: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
    }

    log && console.log(`arr4: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
    return arr
}

const func3 = (arr, str, strItr, start) => {
    for (let temp4 = 0; temp4 < arr.length; temp4++) {
        strItr = start;
        var isFound = false;
        for (var y = 0; y < arr[temp4].length; y++) {
            const temp6 = arr[temp4].charCodeAt(y)
            const temp7 = str.charCodeAt(strItr)
            if (!isFound) {
                if (temp6 == 32) {
                    isFound = true;
                }
                continue;
            }
            if (temp7 == temp6) {
                strItr++;
                continue;
            }
            if (!temp7 || temp7 < temp6) {
                temp4--;
                if (temp4 < 0) {
                    temp4 = 0;
                }
                log && console.log(`arr5: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
                arr = addAtPosition(arr, temp4, str)
                log && console.log(`arr6: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
                return arr
            } else {
                return arr
            }
        }
    }
    return arr
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
