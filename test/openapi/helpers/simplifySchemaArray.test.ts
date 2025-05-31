import { describe, expect, it } from "@jest/globals"
import { simplifySchemaArray } from "../../../src/openapi/helpers/simplifySchemaArray"

describe("simplifySchemaArray", () => {
  it("deduplicates equivalent schemas in the provided array", () => {
    const input = [
      { type: "string" } as const,
      { type: "number" } as const,
      { type: "string" } as const,
    ]

    expect(simplifySchemaArray({ schemaArray: input, key: "anyOf" })).toEqual([
      { type: "string" },
      { type: "number" },
    ])
  })

  it("deduplicates and flattens layers of nested schemas", () => {
    const input = [
      {
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
      },
    ]

    expect(simplifySchemaArray({ schemaArray: input, key: "anyOf" })).toEqual([
      { type: "number" as const, minimum: 1 },
      { type: "number" as const, minimum: 2 },
      { type: "number" as const, minimum: 3 },
    ])
  })

  it("does not deduplicate schemas under a different key", () => {
    const input = [
      {
        anyOf: [
          { type: "number" as const, minimum: 1 },
          {
            allOf: [
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
      },
    ]

    expect(simplifySchemaArray({ schemaArray: input, key: "anyOf" })).toEqual([
      { type: "number" as const, minimum: 1 },
      {
        allOf: [
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
    ])
  })
})
