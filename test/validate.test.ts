import { validatePizza } from '../src/index';

describe('validatePizza', () => {
    // TEST 1: valid pizza
    test('should validate a correct pizza', () => {
        const input = {
            size: 12,
            crust: 'normal',
            isDeepDish: false,
            toppings: ['pepperoni', 'mushrooms'],
        };

        const result = validatePizza(input);
        expect(result.isPizza).toBe(true);

        if (result.isPizza) {
            expect(result.pizza.size).toBe(12);
            expect(result.pizza.crust).toBe('normal');
        }
    });

    // TEST 2: wrong crust type
    test('should reject a pizza with invalid crust option', () => {
        const input = {
            size: 10,
            crust: 'thin',
            toppings: ['cheese'],
        };

        const result = validatePizza(input);
        expect(result.isPizza).toBe(false);

        if (!result.isPizza) {
            expect(result.errors.length).toBeGreaterThan(0);
        }
    });

    // TEST 3: not a pizza object
    test('should reject a non-pizza object', () => {
        const input = {
            hehehehaw: true,
        };

        const result = validatePizza(input);
        expect(result.isPizza).toBe(false);

        if (!result.isPizza) {
            expect(result.errors.length).toBeGreaterThan(0);
        }
    });

    // TEST 4: invalid topping test
    test('should reject a pizza with banned toppings (pineapple)', () => {
        const input = {
            size: 16,
            crust: 'stuffed',
            toppings: ['pepperoni', 'pineapple'],
        };

        const result = validatePizza(input);
        expect(result.isPizza).toBe(false);

        if (!result.isPizza) {
            expect(result.errors.some((e) => e.includes('pineapple'))).toBe(
                true
            );
        }
    });

    // TEST 5: another invalid topping test
    test('should reject a pizza with banned toppings (nutella)', () => {
        const input = {
            size: 16,
            crust: 'stuffed',
            toppings: ['pepperoni', 'nutella'],
        };

        const result = validatePizza(input);
        expect(result.isPizza).toBe(false);

        if (!result.isPizza) {
            expect(result.errors.some((e) => e.includes('nutella'))).toBe(true);
        }
    });
});
