# JS Refactor Imperitive

## Purpose

Refactor a JS function from a mutation rich, incomprehensible function, to a function (nearly) devoid of mutation, which follows functional programming principals.

## Run Comparison

This will run two tests. See "Verification Testing > Methodology" below.

* 100k tests, each containing an array of random strings
* 50k tests, each containing an array of 'lorem ipsum' strings

```bash
npm install
node index
```

## Details

* `original.js` contains the provided JS function to refactor.
* `refactor.js` contains the refactored function. The only mutation is to the input value (`x`), so the function works exactly as the original.

## Developer Notes

* `refactor.js` mutates the input value (`x`) to replicate exactly the functionality of the Original function.

* `refactor.js` contains functions named `func3`, `func4`, etc. Some developers would say these are 'bad' function names. No disagreement. But they are about as arbitrary as `innerLoop`, `compareStrings` or whatever. The function names can be modified during code review (read: the tests pass, push to prod - lol). And seriously - what the hell does this thing do anyways, lol.

## Verification Testing

`index.js` contains the function `runRefactor`, which executes tests to verify that the Original and Refactor work exactly the same.

### Methodology

Attempting to come up with a set of test inputs to verify the Original vs Refactor would be impractical (read: your going to miss an edge case).

Instead, lets use a property based testing framework to generate tons of random inputs, apply them to both Original and Refactor, then check the outputs are the same.

There are two tests:

* `fc.array(fc.string())` - Generates an array of random strings.
* `fc.array(fc.lorem())` - Generates an array of lorem ipsum values

The "Lorem ipsum" tests were added because they have many spaces in them. The random strings didn't frequently contain spaces, so its possible edge cases could be missed.

```js
// file: index.js, function: runRefactor()
fc.assert(fc.property(fc.array(fc.string()), arr => compare(expectedFn, actualFn, arr)), { numRuns: 100000 })
// Using lorem to get values that have spaces
fc.assert(fc.property(fc.array(fc.lorem()), arr => compare(expectedFn, actualFn, arr)), { numRuns: 50000 })
```

If we needed additional rigor, meaning we thought the inputs could contain lots more special characters (or something), we could build an `fc` generator that took the random strings and inject more frequent spaces.
