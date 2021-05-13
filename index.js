import * as fc from 'fast-check'
import doThingsAndStuff from "./original.js"
import doThingsAndStuff2 from "./refactor.js"
import doThingsAndStuff3 from "./refactor2.js"

const assert_equal = (msg, expected, actual) => {
    const e = JSON.stringify(expected)
    const a = JSON.stringify(actual)
    if (e === a) {
        return
    } else {
        console.error(`Error: ${msg}`)
        console.error(`Expect: ${e}`)
        console.error(`Actual: ${a}`)
        throw new Error()
    }
}

const compare = (f, g, arr) => {
    const ej = JSON.stringify(f(arr))

    var res = null
    try {
        res = g(arr)
    } catch (e) {
        console.log(`Input: ${JSON.stringify(arr)}`)
        console.log(`Expect: ${ej}`)
        console.log(`ERROR: ${e}`)
        return false
    }

    const aj = JSON.stringify(res)

    if (ej === aj) {
        return true
    } else {
        console.log(`==========`)
        console.log(`Input: ${JSON.stringify(arr)}`)
        console.log(`Expect: ${ej}`)
        console.log(`Actual: ${aj}`)
        return false
    }
}

// Testing
// const x = [" "]
// console.log(`test in: ${JSON.stringify(x)}`)
// doThingsAndStuff3(x)
// console.log(`test out: ${JSON.stringify(x)}`)

function runRefactor() {
    const expectedFn = (arr) => {
        const x = [...arr]
        doThingsAndStuff(x)
        return x
    }
    const actualFn = (arr) => {
        const x = [...arr]
        // console.log(`actualFn in: ${JSON.stringify(x)}`)
        doThingsAndStuff3(x)
        // console.log(`actualFn out: ${JSON.stringify(x)}`)
        return x
    }
    // Property Based Tesing
    fc.assert(fc.property(fc.array(fc.string()), arr => compare(expectedFn, actualFn, arr)), { numRuns: 100000 })
    // Using lorem to get more examples that have spaces
    fc.assert(fc.property(fc.array(fc.lorem()), arr => compare(expectedFn, actualFn, arr)), { numRuns: 50000 })

    // compare(expectedFn, actualFn, [" ", " ", "  "])
    console.log("Success")
}

const refactorWrapper = (arr) => {
    const x = [...arr]
    // console.log(`actualFn in: ${JSON.stringify(x)}`)
    doThingsAndStuff3(x)
    // console.log(`actualFn out: ${JSON.stringify(x)}`)
    return x
}
runRefactor()

// assert_equal("", [], refactorWrapper([""]))
// assert_equal("", [" "], refactorWrapper([" "]))
// assert_equal("", ["  ", " "], refactorWrapper([" ", "  "]))
// assert_equal("", ["! ", " "], refactorWrapper(["! ", " "]))
// assert_equal("", ["  ", " ", " "], refactorWrapper([" ", " ", "  "]))



const actualImpl = (arr) => {
    const strHas = (f, str) => {
        for (let i = 0; i < str.length; i++) {
            var char = str[i]
            if (f(char)) {
                return true
            }
        }
        return false
    }

    const charFunc = str => {
        // has chars greater than 
        return strHas(c => c.charCodeAt(0) === 32, str)
        // strHas(c => 64 < c.charCodeAt(0), str)

    }

    const a = arr
        // filter nulls
        ?.filter(i => i !== null)
        // filter empty strings
        .filter(i => {
            return i.length !== 0
        })
        .filter(i => {
            return charFunc(i)
        })
    // remove duplicates

    return [...new Set(a)]
        .sort((a, b) => b.length - a.length);
}
function runNewImpl() {
    const expectedFn = (arr) => {
        const expected = [...arr]
        doThingsAndStuff(expected)
        return expected
    }
    assert_equal("", ["  "], actualImpl([" "]))
    assert_equal("", ["  ", " "], actualImpl(["  ", " "]))
    assert_equal("", ["  ", " "], actualImpl([" ", "  "]))
    assert_equal("", [" !", "  "], actualImpl(["  ", " !"]))

    fc.assert(fc.property(fc.array(fc.string()), arr => compare(expectedFn, actualImpl, arr)), { numRuns: 1000 })

    console.log("Success!")
}


// runNewImpl()



export default {}