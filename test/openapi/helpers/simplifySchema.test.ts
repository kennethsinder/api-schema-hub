import { describe, expect, it } from "@jest/globals"
import { OpenAPIV3_1 as OpenAPI } from "openapi-types"
import { simplifySchema } from "../../../src/openapi/helpers/simplifySchema"

describe("simplifySchema", () => {
  it("returns the same schema if it is a primitive string", () => {
    expect(simplifySchema({ type: "string" })).toEqual({ type: "string" })
  })

  it("returns the same schema if it is a primitive number", () => {
    expect(simplifySchema({ type: "number" })).toEqual({ type: "number" })
  })

  it("returns the same schema if it is a primitive boolean", () => {
    expect(simplifySchema({ type: "boolean" })).toEqual({ type: "boolean" })
  })

  it("maximally simplifies nested anyOf schemas", () => {
    const input = {
      anyOf: [
        { type: "number" as const, minimum: 1 },
        {
          anyOf: [
            { type: "number" as const, minimum: 1 },
            { type: "number" as const, minimum: 2 },
            {
              anyOf: [
                { type: "number" as const, minimum: 2 },
                { type: "number" as const, minimum: 3 },
              ],
            },
          ],
        },
      ],
    }

    expect(simplifySchema(input)).toEqual({
      anyOf: [
        { type: "number" as const, minimum: 1 },
        { type: "number" as const, minimum: 2 },
        { type: "number" as const, minimum: 3 },
      ],
    })
  })

  it("maximally simplifies repeated anyOf > allOf schemas", () => {
    const properties: Array<Record<string, OpenAPI.SchemaObject>> = [
      { a: { type: "string" as const } },
      { b: { type: "string" as const } },
      { c: { type: "string" as const } },
      { d: { type: "string" as const } },
    ]

    const input = {
      anyOf: [
        {
          allOf: [
            {
              type: "object" as const,
              properties: properties[0],
            },
            {
              type: "object" as const,
              properties: properties[1],
            },
          ],
        },
        {
          allOf: [
            {
              type: "object" as const,
              properties: properties[2],
            },
            {
              type: "object" as const,
              properties: properties[3],
            },
          ],
        },
      ],
    }

    // Currently we don't combine allOf object schemas.
    expect(simplifySchema(input)).toEqual(input)
  })
})
