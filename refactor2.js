const log = false
var doThingsAndStuff3 = x => {
    log && console.log(`START: x: ${JSON.stringify(x)}`)

    const arr =
        [...x]
            .reverse()
            .filter(s => s !== null && s !== "")
            .reduce((agg, str) => {
                log && console.log(`agg: ${JSON.stringify(agg)}, str: '${JSON.stringify(str)}'`)
                return newFn(agg, str)
            }, [])

    //Objective: Remove all items from array, add all items from new list
    log && console.log(`arr12: ${JSON.stringify(arr)}, x: ${JSON.stringify(x)}`)
    x.splice(0, x.length)
    log && console.log(`arr13: ${JSON.stringify(arr)}, x: ${JSON.stringify(x)}`)
    x.push.apply(x, [...arr].reverse())
    log && console.log(`arr14: ${JSON.stringify(arr)}, x: ${JSON.stringify(x)}`)
};

function newFn(arr1, str) {
    let arr = [...arr1]
    log && console.log(`arr3: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
    for (let strItr = 0; strItr < str.length; strItr++) {
        if (str.charCodeAt(strItr) == 32) {
            var start = strItr + 1;
            var isFound = false;
            var temp4;
            loop2:
            for (temp4 = 0; temp4 < arr.length; temp4++) {
                strItr = start;
                isFound = false;
                for (var y = 0; y < arr[temp4].length; y++) {
                    const temp6 = arr[temp4].charCodeAt(y)
                    const temp7 = str.charCodeAt(strItr)
                    if (!isFound) {
                        if (temp6 == 32) {
                            isFound = true;
                        }
                        continue;
                    }
                    if (!temp7 || temp7 < temp6) {
                        temp4--;
                        if (temp4 < 0) {
                            temp4 = 0;
                        }
                        arr = addAtPosition(arr, temp4, str)
                        break loop2;
                    } else if (temp7 == temp6) {
                        strItr++;
                        continue;
                    } else {
                        break loop2;
                    }
                }
            }
            if (!arr.includes(str)) {
                arr = addToEnd(arr, str)
            }
            break
        }
    }
    log && console.log(`arr4: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
    return arr
}

const addToEnd = (arr, str) => [...[...arr], str]
const addAtPosition = (arr, i, str) => {
    // arr.splice(temp4, 0, str);
    var x = [...arr]
    x.splice(i, 0, str)
    return x
}


export default doThingsAndStuff3
