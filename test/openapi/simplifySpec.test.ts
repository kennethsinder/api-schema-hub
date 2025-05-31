import { describe, expect, it } from "@jest/globals"
import { OpenAPIV3_1 as OpenAPI } from "openapi-types"
import { simplifySpec } from "../../src/openapi/simplifySpec.js"
import nestedAnyOfInput from "./simplifySpec-specs/nested-any-of-input.json"
import { output as nestedAnyOfOutput } from "./simplifySpec-specs/nested-any-of-output.js"
import simpleNoOpInput from "./simplifySpec-specs/simple-no-op-input.json"
import { output as simpleNoOpOutput } from "./simplifySpec-specs/simple-no-op-output.js"

describe("simplifySpec", () => {
  it("simple-no-op-input", () => {
    expect(simplifySpec(simpleNoOpInput as OpenAPI.Document)).toEqual(
      simpleNoOpOutput,
    )
  })

  it("nested-any-of-input", () => {
    expect(simplifySpec(nestedAnyOfInput as OpenAPI.Document)).toEqual(
      nestedAnyOfOutput,
    )
  })
})
