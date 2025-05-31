import { OpenAPIV3_1 as OpenAPI } from "openapi-types"
import { uniqWith } from "../../helpers/uniqWith.js"
import { isSchemaEqual } from "./isSchemaEqual.js"
import { simplifySchema } from "./simplifySchema.js"

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
