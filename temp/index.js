import * as fc from 'fast-check'
import doThingsAndStuff from "./original.js"
import doThingsAndStuff2 from "./refactor.js"

// const under_test = original => {
//     try {
//         const clone = [...original]
//         const res = doThingsAndStuff(clone)
//         return {
//             success: true,
//             input: original,
//             output: clone,
//         }
//     } catch (e) {
//         return {
//             success: false,
//             error: e
//         }
//     }
// }

// const test = (input) => {
//     console.log(`===================`)
//     console.log(`[Inn] ${JSON.stringify(input)}`)
//     const output = under_test(input)
//     console.log(`[Out] ${JSON.stringify(output.output)} `)
// }


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
    const aj = JSON.stringify(g(arr))

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
const x = [" "]
console.log(`test in: ${JSON.stringify(x)}`)
doThingsAndStuff2(x)
console.log(`test out: ${JSON.stringify(x)}`)


function runRefactor() {
    const expectedFn = (arr) => {
        const x = [...arr]
        doThingsAndStuff(x)
        return x
    }
    const actualFn = (arr) => {
        const x = [...arr]
        console.log(`actualFn in: ${JSON.stringify(x)}`)
        doThingsAndStuff2(x)
        console.log(`actualFn out: ${JSON.stringify(x)}`)
        return x
    }

    if (fc.assert(fc.property(fc.array(fc.string()), arr => compare(expectedFn, actualFn, arr)))) {
        console.log("Success")
    } else {
        console.log("Fail")
    }
}

// const f = doThingsAndStuff2
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
    assert_equal("", ["  ", " "], actualImpl(["  ", " "]))
    assert_equal("", ["  ", " "], actualImpl([" ", "  "]))
    assert_equal("", [" !", "  "], actualImpl(["  ", " !"]))

    fc.assert(fc.property(fc.array(fc.string()), arr => compare(expectedFn, actualImpl, arr)))



    console.log("Success!")
}

// runNewImpl()
// runRefactor()

// test([])
// test(["a"])
// test(["c cc"])
// test(["a a", "b "])
// test(["a a", "b", "b", "c c", "c c"])
// test(["a a", "a b c", "a b c", "a b c d"])

// Generate array of random strings, pass to both functions, compare output, if not equal, then create test and fix it




// fc.array(fc.nat())

// fc.assert( // run the property several times (in other words execute the test)
//   fc.property( // define the property: arbitrary and what should be observed (predicate)
//     arb1, arb2, ..., // 1 to +infinity arbitraries
//     (valueGeneratedByArb1, valueGeneratedByArb2, ...) => { // predicate receives generated values
//       // In case of success: No return, 'return undefined' or 'return true'
//       // In case of failure: Throw or 'return false'
//     }
//   )
// )

// // Example:
// fc.assert(
//   fc.property(
//     fc.string(), fc.string(), fc.string(),
//     (a, b, c) => isSubstring(b, a + b + c),
//   )
// )

export default {}