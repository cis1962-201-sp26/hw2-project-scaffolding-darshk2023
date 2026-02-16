#!/usr/bin/env node

import { readFileSync } from 'fs';
import { parseArgs } from 'node:util';
import { validatePizza } from './index';

function main(): void {
    const { positionals } = parseArgs({
        allowPositionals: true,
    });

    const fPath = positionals[0];

    if (!fPath) {
        console.error('Usage: the pizza-validator <file.json>');
        process.exit(1);
    }

    // read CLI arguments
    let fContent: string;
    try {
        fContent = readFileSync(fPath, 'utf-8');
    } catch {
        console.error(`Error: Could not read the file "${fPath}".`);
        process.exit(1);
    }

    // parse CLI arguments
    let data: unknown;
    try {
        data = JSON.parse(fContent);
    } catch {
        console.error(
            `Error: File "${fPath}" does not contain the valid JSON.`
        );
        process.exit(1);
    }

    // check if valid pizza
    const result = validatePizza(data);

    if (result.isPizza) {
        console.log('VALID PIZZAA!');
        console.log(JSON.stringify(result.pizza, null, 2));
    } else {
        console.log('NOT VALID :(. Reasons:');
        for (const error of result.errors) {
            console.log(`  - ${error}`);
        }
    }
}

main();
