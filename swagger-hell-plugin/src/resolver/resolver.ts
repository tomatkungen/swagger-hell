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

  type SwaggerDefinition {
    swaggerRaw: String
    swaggerDefinitionType: String
  }

  type Query {
    hello: String 
    add(a: Int!, b: Int!): Int
    getSwaggerByUrl(url: String!): OpenAPI3
    getSwaggerNames: SwaggerFileNames
    getSwaggerByName(filename: String!): OpenAPI3
    getSwaggerEndpointsByName(filename: String!): [String]!
    getSwaggerInfoByName(filename: String!): SwaggerInfo!
    getSwaggerTypeDefinitions(filename: String!): SwaggerDefinition!
    getSwaggerTypeDefinitionsByEndpoints(filename: String!, endpoints: [String!]!): SwaggerDefinition! 
  }

  type Mutation {
    addSwaggerUrl(url: String!): OpenAPI3
  }
`);

export const rootValue = {
  OpenAPI3: OpenAPI3,
  hello: ()                                                             => 'Hello, world!',
  add: ({ a, b }: { a: number, b: number })                             => a + b,
  // Replace this with package json semver
  version: ()                                                           => "0.0.0",
  // Swagger Query
  getSwaggerByUrl: async ({ url }: { url: string })                     => await getSwaggerByUrl(url),
  getSwaggerNames: async ()                                             => await getSwaggerNames(),
  getSwaggerByName: async ({ filename }: { filename: string })          => await getSwaggerByName(filename),
  getSwaggerEndpointsByName: async ({ filename }: { filename: string }) => await getSwaggerEndpointsByName(filename),
  getSwaggerInfoByName: async ({ filename }: { filename: string })      => await getSwaggerInfoByName(filename),
  // Swagger Mutation
  addSwaggerUrl: async ({ url }: { url: string })                       => await addSwaggerUrl(url),
  // Swagger Query definition
  getSwaggerTypeDefinitions: async ({ filename }: { filename: string }) => await getSwaggerTypeDefinitions(filename),
  getSwaggerTypeDefinitionsByEndpoints: async ({ filename, endpoints }: { filename: string, endpoints: string[] }) => await getSwaggerTypeDefinitionsByEndpoints(filename, endpoints)
};
