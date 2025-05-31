import { OpenAPIV3_1 as OpenAPI } from "openapi-types"

export function isSchemaEqual(
  a: OpenAPI.SchemaObject,
  b: OpenAPI.SchemaObject,
): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}
