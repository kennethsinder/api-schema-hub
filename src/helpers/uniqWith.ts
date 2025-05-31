/**
 * Returns a version of the array that has no duplicate values but otherwise
 * preserves the order of the first occurrence of each value.
 *
 * Used the algorithm from: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore/blob/5ea02d3a0b151ea3e49ab14233c739cba657acaa/README.md#_uniqWith
 */
export function uniqWith<T>(arr: T[], fn: (a: T, b: T) => boolean): T[] {
  return arr.filter((element, index) => {
    const foundIndex = arr.findIndex((step) => fn(element, step))
    return foundIndex === index
  })
}
