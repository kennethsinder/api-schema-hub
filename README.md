# API Schema Hub

TypeScript tooling around web API schemas, such as OpenAPI.

The vision is a universal hub for different representations of API specs, with tooling to parse, validate, and convert between types of schemas.

Available on [NPM](https://www.npmjs.com/package/@kennethsinder/api-schema-hub) and [GitHub](https://github.com/kennethsinder/api-schema-hub).

> [!CAUTION]
> The `api-schema-hub` package is in early development. It's not feature-rich or stable enough to safely use in production code.

## Getting started

Download and install the package from NPM, e.g.

```bash
npm i --save @kennethsinder/api@latest
```

Import and invoke the utilities you need. For example:

```typescript
import { simplifySpec } from "@kennethsinder/api-schema-hub"
import type { OpenAPIV3_1 as OpenAPI } from "openapi-types"
import openApiSpec from "./my-project/openApiSpec.json"

const normalizedSpec = simplifySpec(openApiSpec as OpenAPI.Document)

console.log(normalizedSpec)
```

## Features

Currently, only OpenAPI 3.1 is supported.

> [!NOTE]
> Additional functionality will be added over time.

### Simplifying complex API schemas

In today's world of Model Context Protocol (MCP) and Large Language Models (LLM), maintaining an efficient schema for your API is increasingly important.
Often, combining union type shapes and objects in your schema can lead to duplicative, bloated OpenAPI schemas.
They may be correct, but not a particularly efficient representation of your API contract.

Use the `simplifySpec(spec: OpenAPIV3_1.Document): OpenAPIV3_1.Document` function on your schema (e.g. imported from a JSON or YAML file) to de-duplicate and simplify its representation.
The output can be written back to a separate JSON or YAML file.

## Development

To set up a development environment:

- Fork and clone the Git repository
- Run `npm i` to install dependencies
- Run `npm run build` to type check the files in `src/` and `test/` and generate build artifacts in `dist/`
- Run `npm run test` to run the Jest tests under `test/`
