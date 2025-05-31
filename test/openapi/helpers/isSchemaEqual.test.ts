import { describe, expect, it } from "@jest/globals"
import { isSchemaEqual } from "../../../src/openapi/helpers/isSchemaEqual"

describe("isSchemaEqual", () => {
  it("returns true if the schemas are equal", () => {
    expect(isSchemaEqual({ type: "string" }, { type: "string" })).toBe(true)
  })

  it("returns false if the schemas are not equal", () => {
    expect(isSchemaEqual({ type: "string" }, { type: "number" })).toBe(false)
  })
})
