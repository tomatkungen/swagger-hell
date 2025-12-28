import { buildSchema, graphql } from 'graphql';

/** GraphQL # */
export const schema = buildSchema(`
  type Query {
    hello: String 
    add(a: Int!, b: Int!): Int
  }
`);

export const rootValue = {
  hello: () => 'Hello, world!',
  add: ({a,b}: {a: number, b: number}) => a + b
};
