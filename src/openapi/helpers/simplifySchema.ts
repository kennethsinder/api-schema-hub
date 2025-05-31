import { OpenAPIV3_1 as OpenAPI } from "openapi-types"
import { simplifySchemaArray } from "./simplifySchemaArray.js"

/**
 * Given an OpenAPI 3.1 schema, return a simplified version of the schema.
 *
 * This function is a work in progress and may not be complete.
 */
export function simplifySchema(
  schema: OpenAPI.SchemaObject,
): OpenAPI.SchemaObject {
  if ("$ref" in schema) {
    return schema
  }

  let workingSchema: OpenAPI.SchemaObject = JSON.parse(JSON.stringify(schema))

  if (workingSchema.properties) {
    workingSchema.properties = Object.fromEntries(
      Object.entries(workingSchema.properties).map(([key, value]) => [
        key,
        simplifySchema(value),
      ]),
    )
  }

  if (
    Array.isArray(workingSchema.type) &&
    workingSchema.type.length === 2 &&
    (workingSchema.type[0] === "null" || workingSchema.type[1] === "null")
  ) {
    workingSchema = {
      anyOf: [
        {
          ...workingSchema,
          type: workingSchema.type.filter((type) => type !== "null"),
        },
        {
          type: "null",
        },
      ],
    }
  }

  for (const key of ["anyOf", "oneOf", "allOf"] as const) {
    if (workingSchema[key]) {
      workingSchema[key] = simplifySchemaArray({
        schemaArray: workingSchema[key],
        key,
      })

      if (workingSchema[key].length === 1) {
        workingSchema = workingSchema[key][0]
      }
    }
  }

  if (workingSchema.not) {
    workingSchema.not = simplifySchema(workingSchema.not)
  }

  if ("items" in workingSchema && workingSchema.items) {
    workingSchema.items = simplifySchema(workingSchema.items)
  }

  return workingSchema
}
