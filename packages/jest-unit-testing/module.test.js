import mut from './module.js'; // MUT = Module Under Test


describe('sum', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(mut.sum(1, 2)).toBe(3);
    });

    test('adds 0 + 0 to equal 0', () => {
        expect(mut.sum(0, 0)).toBe(0);
    });

    test('adds negative numbers correctly', () => {
        expect(mut.sum(-1, -1)).toBe(-2);
    });
});



describe('div', () => {
    test('divides 10 / 2 to equal 5', () => {
        expect(mut.div(10, 2)).toBe(5);
    });

    test('divides 5 / 2 to equal 2.5', () => {
        expect(mut.div(5, 2)).toBe(2.5);
    });

    test('handles division by zero', () => {
        expect(mut.div(5, 0)).toBe(Infinity);
    });

    test('correctly divides negative numbers', () => {
        expect(mut.div(-10, -2)).toBe(5);
        expect(mut.div(-10, 2)).toBe(-5);
    });
});


describe('containsNumbers', () => {
    test('returns true when the string contains numbers', () => {
        expect(mut.containsNumbers("hello2world")).toBeTruthy();
        expect(mut.containsNumbers("123")).toBeTruthy();
        expect(mut.containsNumbers("this is 2024")).toBeTruthy();
    });

    test('returns false when the string does not contain numbers', () => {
        expect(mut.containsNumbers("hello world")).toBeFalsy();
        expect(mut.containsNumbers("test")).toBeFalsy();
    });

    test('returns false for empty string', () => {
        expect(mut.containsNumbers("")).toBeFalsy();
    });

    test('handles non-string inputs gracefully', () => {
        expect(mut.containsNumbers(null)).toBeFalsy();
        expect(mut.containsNumbers(undefined)).toBeFalsy();
        expect(mut.containsNumbers(1234)).toBeTruthy();
    });
});