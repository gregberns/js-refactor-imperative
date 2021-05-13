var doThingsAndStuff2 = (x) => {
    var arr = [];

    while (x.length) {
        const str = x.pop();
        //Filter nulls
        if (!str) continue;

        // Loop through string characters
        for (let strItr = 0; strItr < str.length; strItr++) {
            const char = str.charCodeAt(strItr)
            // String must have a space
            if (str && char == 32) {
                var start = strItr++ + 1;
                var doBreak = false;
                var isFound = false;

                for (let temp4 = 0; temp4 < arr.length; temp4++) {
                    if (doBreak) {
                        break;
                    }
                    strItr = start;
                    isFound = false;
                    for (var y = 0; y < arr[temp4].length; y++) {
                        const temp6 = arr[temp4].charCodeAt(y)
                        if (!isFound) {
                            if (temp6 == 32) {
                                isFound = true;
                            }
                            continue;
                        }
                        if (!char || char < temp6) {
                            temp4--;
                            if (temp4 < 0) {
                                temp4 = 0;
                            }
                            // add item to start of array
                            arr.splice(temp4, 0, str);
                            // break twice
                            doBreak = true;
                            break;
                        } else if (char == temp6) {
                            strItr++;
                            continue;
                        } else {
                            doBreak = true;
                            break;
                        }
                    }
                }
                // Remove duplicates???
                if (!arr.includes(str)) {
                    arr.push(str);
                }
                break
            }
        }
    };
    x = [...x, ...[...arr].reverse()]
};

export default doThingsAndStuff2
