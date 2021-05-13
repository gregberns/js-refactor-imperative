const log = false
var doThingsAndStuff3 = x => {
    // let arr = [];
    log && console.log(`START: x: ${JSON.stringify(x)}`)
    // if (true) {
    const arr = [...x].reverse().reduce((arr, str) => {
        log && console.log(`arr1: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
        return newFn(arr, str)
    }, [])
    // } else {
    //     while (x.length) {
    //         const str = x.pop();
    //         if (!str) continue;
    //         for (let strItr = 0; strItr < str.length; strItr++) {
    //             if (str && str.charCodeAt(strItr) == 32) {
    //                 var start = strItr + 1;
    //                 var isFound = false;
    //                 var temp4;
    //                 loop2:
    //                 for (temp4 = 0; temp4 < arr.length; temp4++) {
    //                     strItr = start;
    //                     isFound = false;
    //                     for (var y = 0; y < arr[temp4].length; y++) {
    //                         const temp6 = arr[temp4].charCodeAt(y)
    //                         const temp7 = str.charCodeAt(strItr)
    //                         if (!isFound) {
    //                             if (temp6 == 32) {
    //                                 isFound = true;
    //                             }
    //                             continue;
    //                         }
    //                         if (!temp7 || temp7 < temp6) {
    //                             temp4--;
    //                             if (temp4 < 0) {
    //                                 temp4 = 0;
    //                             }
    //                             arr = addAtPosition(arr, temp4, str)
    //                             break loop2;
    //                         } else if (temp7 == temp6) {
    //                             strItr++;
    //                             continue;
    //                         } else {
    //                             break loop2;
    //                         }
    //                     }
    //                 }
    //                 if (!arr.includes(str)) {
    //                     log && console.log(`arr6: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
    //                     arr = addToEnd(arr, str)
    //                     log && console.log(`arr7: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
    //                 }
    //                 break
    //             }
    //         }
    //         log && console.log(`arr2: ${JSON.stringify(arr)}`)
    //     };
    // }

    //Objective: Remove all items from array, add all items from new list

    log && console.log(`x: ${JSON.stringify(x)}, arr: ${JSON.stringify(arr)}`)
    x.splice(0, x.length)
    log && console.log(`x: ${JSON.stringify(x)}, arr: ${JSON.stringify(arr)}`)
    while (arr.length) {
        var newThing = arr.pop();
        x.push(newThing);
    };
    // x.push.apply(x, [...arr])
    log && console.log(`x: ${JSON.stringify(x)}, arr: ${JSON.stringify(arr)}`)

};

const addToEnd = (arr, str) => [...[...arr], str]
const addAtPosition = (arr, i, str) => {
    // arr.splice(temp4, 0, str);
    var x = [...arr]
    x.splice(i, 0, str)
    return x
}

function newFn(arr, str) {
    log && console.log(`arr3: ${JSON.stringify(arr)}, str: '${JSON.stringify(str)}'`)
    if (!str) return arr;
    for (let strItr = 0; strItr < str.length; strItr++) {
        if (str && str.charCodeAt(strItr) == 32) {
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


export default doThingsAndStuff3
