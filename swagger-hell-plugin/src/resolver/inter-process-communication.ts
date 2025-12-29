import { graphql } from "graphql";
import { rootValue, schema } from "./resolver";

// example: {"query":"query ($a:Int!,$b:Int!){ add(a:$a,b:$b) }","variables":{"a":5,"b":2}}

console.log('Inter-process communication started');
process.stdin.setEncoding('utf-8');

process.stdin.on('data', async (data) => {

    const input = data.toString().trim();

    if (input === 'exit')
        process.exit();

    console.log('> ', input);
    
    try {
        const { query, variables } = JSON.parse(input);
        
        const res = await graphql({
            schema,
            source: query,
            rootValue,
            variableValues: variables
        });

        console.log('< ', JSON.stringify(res));
        process.stdout.write(`${JSON.stringify(res)}\n`);
    } catch (error) {
        const errorMessage = { message: (error as Error).message };
        process.stderr.write(`${JSON.stringify(errorMessage)}\n`);
    }
});

process.stdin.on('end', () => {
    console.log('End of input. Exiting...');
    process.exit();
});

process.on('SIGINT', () => {
    console.log('Process interrupted. Exiting...');
    process.exit();
});
