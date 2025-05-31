import { OpenAPIV3_1 as OpenAPI } from "openapi-types"

/**
 * Returns whether the two schema objects are equivalent.
 *
 * TODO: This should be replaced by a more performant and granular
 * approach that takes into account the relevant semantic fields
 * in the OpenAPI spec, as well as checking equivalency of different
 * shapes of schemas that are semantically equivalent.
 */
export function isSchemaEqual(
  a: OpenAPI.SchemaObject,
  b: OpenAPI.SchemaObject,
): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}
