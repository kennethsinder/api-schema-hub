import { OpenAPIV3_1 as OpenAPI } from "openapi-types"
import { uniqWith } from "../../helpers/uniqWith.js"
import { isSchemaEqual } from "./isSchemaEqual.js"
import { simplifySchema } from "./simplifySchema.js"

/**
 * Given an array of OpenAPI 3.1 schemas, return a simplified version of the
 * array recursively, taking into account the original key that produced the
 * array (e.g. `anyOf`) to only combine schemas into semantically equivalent
 * shapes.
 */
export function simplifySchemaArray({
  schemaArray,
  key,
}: {
  schemaArray: OpenAPI.SchemaObject[]
  key: "anyOf" | "oneOf" | "allOf"
}): OpenAPI.SchemaObject[] {
  const flattenedChildSchemas = schemaArray.flatMap((childSchema) => {
    if (key in childSchema && childSchema[key]) {
      return childSchema[key].flatMap((grandchildSchema) =>
        simplifySchemaArray({ schemaArray: [grandchildSchema], key }),
      )
    }

    return [simplifySchema(childSchema)]
  })

  return uniqWith(flattenedChildSchemas, isSchemaEqual)
}
