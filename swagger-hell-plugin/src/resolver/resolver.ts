import { buildSchema } from 'graphql';
import { OpenAPI3 } from './scalars';
import { addSwaggerUrl, getSwaggerByName, getSwaggerByUrl, getSwaggerEndpointsByName, getSwaggerInfoByName, getSwaggerNames } from '../services/swagger-service';
import { getSwaggerTypeDefinitions, getSwaggerTypeDefinitionsByEndpoints } from '../services/swagger-type-definitions';

export const schema = buildSchema(`#graphql
  
  scalar OpenAPI3

  type SwaggerFileNames {
    current: [String]!
    previous: [String]!
  }

  type SwaggerInfo {
    title: String
    version: String
    description: String
  }

  type Query {
    hello: String 
    add(a: Int!, b: Int!): Int
    getSwaggerByUrl(url: String): OpenAPI3
    getSwaggerNames: SwaggerFileNames
    getSwaggerByName(filename: String): OpenAPI3
    getSwaggerEndpointsByName(filename: String): [String]!
    getSwaggerInfoByName(filename: String): SwaggerInfo!
  }

  type Mutation {
    addSwaggerUrl(url: String): String
  }
`);

export const rootValue = {
  OpenAPI3: OpenAPI3,
  hello: () => 'Hello, world!',
  add: ({ a, b }: { a: number, b: number }) => a + b,
  // Swagger
  getSwaggerByUrl: async (url: string) => await getSwaggerByUrl(url),
  getSwaggerNames: async () => await getSwaggerNames(),
  getSwaggerByName: async (filename: string) => await getSwaggerByName(filename),
  getSwaggerEndpointsByName: async (filename: string) => await getSwaggerEndpointsByName(filename),
  getSwaggerInfoByName: async (filename: string) => await getSwaggerInfoByName(filename),
  addSwaggerUrl: async (url: string) => await addSwaggerUrl(url),
  // Swagger definition
  getSwaggerTypeDefinitions: async (filename: string) => await getSwaggerTypeDefinitions(filename),
  getSwaggerTypeDefinitionsByEndpoints: async (filename: string, endpoints: string[]) => await getSwaggerTypeDefinitionsByEndpoints(filename, endpoints)
};
