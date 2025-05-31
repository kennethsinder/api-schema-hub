import { OpenAPIV3_1 as OpenAPI, OpenAPIV3 } from "openapi-types"
import { simplifySchema } from "./helpers/simplifySchema.js"

/**
 * Given an OpenAPI 3.1 schema, return a simplified version of the schema.
 *
 * This function is a work in progress and may not be complete.
 */
export function simplifySpec(spec: OpenAPI.Document): OpenAPI.Document {
  const simplifiedSpec = spec

  if (simplifiedSpec.components?.schemas) {
    simplifiedSpec.components.schemas = Object.fromEntries(
      Object.entries(simplifiedSpec.components.schemas).map(([key, value]) => [
        key,
        simplifySchema(value),
      ]),
    )
  }

  if (simplifiedSpec.components?.parameters) {
    for (const param of Object.values(simplifiedSpec.components.parameters)) {
      if ("schema" in param && param.schema) {
        param.schema = simplifySchema(
          param.schema as OpenAPI.SchemaObject,
        ) as OpenAPIV3.SchemaObject
      }
    }
  }

  if (simplifiedSpec.paths) {
    for (const path of Object.values(simplifiedSpec.paths)) {
      if (!path) {
        continue
      }

      for (const method of Object.keys(path) as OpenAPIV3.HttpMethods[]) {
        const methodPath = path[method]

        if (methodPath?.parameters) {
          methodPath.parameters = methodPath.parameters.map((param) => {
            if ("schema" in param && param.schema) {
              param.schema = simplifySchema(
                param.schema as OpenAPI.SchemaObject,
              ) as OpenAPIV3.SchemaObject
            }

            return param
          })
        }

        if (methodPath?.requestBody) {
          if ("content" in methodPath.requestBody) {
            for (const content of Object.values(
              methodPath.requestBody.content,
            )) {
              if ("schema" in content && content.schema) {
                content.schema = simplifySchema(content.schema)
              }
            }
          }
        }

        if (methodPath?.responses) {
          for (const response of Object.values(methodPath.responses)) {
            if ("content" in response && response.content) {
              for (const content of Object.values(response.content)) {
                if ("schema" in content && content.schema) {
                  content.schema = simplifySchema(content.schema)
                }
              }
            }
          }
        }
      }
    }
  }

  return simplifiedSpec
}
