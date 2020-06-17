// Based on github.com/alewin/useWorker

import { TransferableType } from '../../useWorkerFn'
import { jobRunner } from './jobRunner'
import { remoteDepsParser } from './remoteDepsParser'

/**
 * Converts the "fn" function into the syntax needed to be executed within a web
 * worker
 *
 * @param fn the function to run with web worker
 * @param deps array of strings, imported into the worker through
 * "importScripts"
 *
 * @returns a blob url, containing the code of "fn" as a string
 *
 * @example
 * createWorkerBlobUrl((a,b) => a+b, [])
 * // return "onmessage=return Promise.resolve((a,b) => a + b)
 * .then(postMessage(['SUCCESS', result]))
 * .catch(postMessage(['ERROR', error])"
 */
export const createWorkerBlobUrl = (
  fn: Function,
  deps: string[],
  transferable: TransferableType
) => {
  const blobCode = `
    ${remoteDepsParser(deps)};
    onmessage=(${jobRunner})({
      fn: (${fn}),
      transferable: '${transferable}'
    })
  `
  const blob = new Blob([blobCode], { type: 'text/javascript' })
  const url = URL.createObjectURL(blob)
  return url
}
