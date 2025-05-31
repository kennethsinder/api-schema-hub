import { describe, expect, it } from "@jest/globals"
import { uniqWith } from "../../src/helpers/uniqWith"

describe("uniqWith", () => {
  it("deduplicates array entries with standard equality", () => {
    expect(uniqWith([1, 2, 3, 4, 5], (a, b) => a === b)).toEqual([
      1, 2, 3, 4, 5,
    ])
  })

  it("deduplicates array entries with custom equality", () => {
    expect(
      uniqWith(
        [
          { x: 1, y: 10 },
          { x: 2, y: 20 },
          { x: 1, y: 30 },
        ],
        (a, b) => a.x === b.x,
      ),
    ).toEqual([
      { x: 1, y: 10 },
      { x: 2, y: 20 },
    ])
  })
})
