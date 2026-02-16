[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/tf5gBLEQ)
# Homework 2: Project Scaffolding Reflection


A pizza validation package built with TypeScript and Zod.

## Installation
```bash
npm install pizza-validator
```

## Usage as a Dependency
```typescript
import { validatePizza } from 'pizza-validator';

const result = validatePizza({
  size: 14,
  crust: 'normal',
  isDeepDish: false,
  toppings: ['pepperoni', 'mushrooms'],
});

if (result.isPizza) {
  console.log(result.pizza.crust); // 'normal'
} else {
  console.log(result.errors);
}
```

## CLI Usage

Install globally:
```bash
npm install --global .
```

Then run:
```bash
pizza-validator test-pizza.json
```

If the pizza is valid, it prints the pizza object. If not, it prints the specific reasons why.

Example with an invalid pizza:
```bash
pizza-validator bad-pizza.json
# Not a valid pizza. Reasons:
#   - size: Expected number, received string
#   - crust: Invalid enum value. Expected 'stuffed' | 'normal', received 'thin'
#   - toppings.0: "nutella" is not a valid pizza topping
#   - toppings.1: "pineapple" is not a valid pizza topping
```

## How many hours did you spend working on this homework?
6 hours

## What challenges/roadblocks did you face during this homework?
The organization and starting from scratch was extremely difficult.

## Did you use AI/LLM tools for this assignment? If so, please provide a transcript or document your usage extensively below. If you did use AI, please explain why you decided to use AI for the task you used it for, what you learned from the AI responses, and explain any relevant unfamiliar terms and concepts that the AI responses generated.
No

