// Based on github.com/alewin/useWorker

/**
 * Concatenates the remote dependencies into a comma separated string. this
 * string will then be passed as an argument to the "importScripts" function
 *
 * @param deps array of string
 * @returns a string composed by the concatenation of the array elements "deps"
 * and "importScripts".
 *
 * @example
 * remoteDepsParser(['http://js.com/1.js', 'http://js.com/2.js'])
 * // return importScripts('http://js.com/1.js, http://js.com/2.js')
 */
export const remoteDepsParser = (deps: string[]) => {
  if (deps.length === 0) return ''

  const depsString = deps.map(dep => `${dep}`).toString()
  return `importScripts('${depsString}')`
}
