import { GraphQLScalarType, Kind, type ValueNode } from 'graphql';
import { parse } from 'node:path';

export const OpenAPI3 = new GraphQLScalarType({
    name: "OpenAPI3",
    description: "Open api v3",
    // Response data to client
    serialize: (value) => (value),
    // Input variables that passed in
    parseValue: (value) => (value),
    // Called when value i passed in as a literal on the Executable GrapqhQl Document
    parseLiteral: (ast) => (parseAST(ast))
});

const parseAST = (ast: ValueNode /*, variables*/) => {
    switch (ast.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN: 
            return ast.value;
        case Kind.FLOAT:
            return Number(ast.value)
        case Kind.OBJECT: {
            const obj = {};
            for (const field of ast.fields)
                obj[field.name.value] = parseAST(field.value)

            return obj;
        }
        case Kind.LIST: 
            return ast.values.map(parseAST /*, variables */);
        /* case Kind.VARIABLE:
            return variables ? variables[ast.name.value] : undefined
        */
        default: 
            return null;
    }
}