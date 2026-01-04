import { buildSchema } from 'graphql';
import { OpenAPI3 } from './scalars';

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
  add: ({ a, b }: { a: number, b: number }) => a + b
};
