import { expect } from "@jest/globals"

export const output = {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Swagger Petstore",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "http://petstore.swagger.io/v1",
    },
  ],
  paths: {
    "/pets/{petId}": {
      get: {
        summary: "Info for a specific pet",
        operationId: "showPetById",
        tags: ["pets"],
        parameters: [
          {
            name: "petId",
            in: "path",
            required: true,
            description: "The id of the pet to retrieve",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Expected response to a valid request",
            content: {
              "application/json": {
                schema: {
                  anyOf: expect.arrayContaining([
                    {
                      type: "string",
                    },
                    {
                      type: "integer",
                    },
                    {
                      type: "null",
                    },
                  ]),
                },
              },
            },
          },
        },
      },
    },
  },
}
