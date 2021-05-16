import * as fc from 'fast-check'
import doThingsAndStuff from "./original.js"
import { doThingsAndStuffRefactored, foldWhile } from "./refactor.js"

// Verbose Assert function for manual testing
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

// Used for comparing Original to Refactor
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

function runRefactor() {
    const expectedFn = (arr) => {
        const x = [...arr]
        doThingsAndStuff(x)
        return x
    }
    const actualFn = (arr) => {
        const x = [...arr]
        doThingsAndStuffRefactored(x)
        return x
    }
    // Property Based Tesing
    fc.assert(fc.property(fc.array(fc.string()), arr => compare(expectedFn, actualFn, arr)), { numRuns: 100000 })
    // Using lorem to get values that have spaces
    fc.assert(fc.property(fc.array(fc.lorem()), arr => compare(expectedFn, actualFn, arr)), { numRuns: 50000 })

    console.log("Success")
}

const refactorWrapper = (arr) => {
    const x = [...arr]
    // console.log(`actualFn in: ${JSON.stringify(x)}`)
    doThingsAndStuffRefactored(x)
    // console.log(`actualFn out: ${JSON.stringify(x)}`)
    return x
}

runRefactor()

// Manual/Individual Tests
// assert_equal("", [], refactorWrapper([""]))
// assert_equal("", [" "], refactorWrapper([" "]))
// assert_equal("", [" "], refactorWrapper([" ", " "]))
// assert_equal("", ["  ", " "], refactorWrapper(["  ", " "]))
// assert_equal("", ["! ", " "], refactorWrapper(["! ", " "]))
// assert_equal("", ["  ", " ", " "], refactorWrapper([" ", " ", "  "]))

// assert_equal("", 10, foldWhile(0, (agg, i) => agg + i, i => i < 7, [1, 2, 3, 4, 5, 6, 7]))

export default {}