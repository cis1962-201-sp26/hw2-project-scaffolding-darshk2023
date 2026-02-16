import { z } from 'zod';

// NOT ALLOWED TOPPINGS
const NOT_ALLOWED_TOPPINGS = [
    'pineapple',
    'ketchup',
    'nutella',
    'chocolate',
    'marshmellows',
];

// VALID TOPPINGS
const ToppingSchema = z.string().superRefine((topping, ctx) => {
    if (NOT_ALLOWED_TOPPINGS.includes(topping.toLowerCase())) {
        ctx.addIssue({
            code: 'custom',
            message: `"${topping}" is not a valid pizza topping`,
        });
    }
});

// Pizza schema (zod)
const PizzaSchema = z.object({
    size: z.number(),
    crust: z.enum(['stuffed', 'normal']),
    isDeepDish: z.boolean().default(false),
    toppings: z.array(ToppingSchema).optional(),
});

type Pizza = z.infer<typeof PizzaSchema>;

// discriminated union
type ValidationResult =
    | { isPizza: true; pizza: Pizza }
    | { isPizza: false; errors: string[] };

// main function
function validatePizza(input: unknown): ValidationResult {
    // check if follows pizza schema
    const result = PizzaSchema.safeParse(input);

    if (result.success) {
        return {
            isPizza: true,
            pizza: result.data,
        };
    } else {
        const errors = result.error.issues.map((issue) => {
            const path = issue.path.length > 0 ? issue.path.join('.') : 'input';
            return `${path}: ${issue.message}`;
        });
        return {
            isPizza: false,
            errors,
        };
    }
}

export { validatePizza, PizzaSchema, Pizza, ValidationResult };
