'use strict';
const { calculateVAT } = require('../vat');

describe('calculateVAT with default VAT passes', () => {
    it('VAT for 1200 is 1500', () => {
        const result = calculateVAT(1200);
        const expected = 1400;

        expect(result).toBeDefined();
        expect(result).not.toBeNaN();
        expect(result).toBe(expected);
        expect(result).toEqual(expected);
    });

    const vatData = [
        {'amount': 0, 'expected': 0},
        {'amount': 1000, 'expected': 1250},
        {'amount': 10000, 'expected': 12500},
        {'amount': 1425.26, 'expected': 1781.575},
    ];
    it.each(vatData)('several correct amounts', (vatAmount) => {
        expect(calculateVAT(vatAmount.amount)).toBe(vatAmount.expected);
    });
});

describe('calculateVAT with default VAT fails', () => {
    const vatWrongData = [
        {'amount': -1000, 'expected': 0},        
        {'amount': '', 'expected': 0},        
        {'amount': 'Twelve', 'expected': 0},        
        {'amount': true, 'expected': 0},        
        {'amount': [1200], 'expected': 0},        
    ];
    it.each(vatWrongData)('several incorrect amounts', (vatAmount) => {
        expect(calculateVAT(vatAmount.amount)).toBe(vatAmount.expected);
    });
});

describe('calculateVAT with custom VAT passes', () => {
    it('12% VAT for 1200 is 1500', () => {
        const result = calculateVAT(1200, 12);
        const expected = 1344;

        expect(result).toBeDefined();
        expect(result).not.toBeNaN();
        expect(result).toBe(expected);
        expect(result).toEqual(expected);
    });

    const vatIntData = [
        {'amount': 0, 'vat': 12, 'expected': 0},
        {'amount': 10000, 'vat': 0, 'expected': 10000},
    ];
    it.each(vatIntData)('several correct integer VAT values', (vatAmount) => {
        expect(calculateVAT(vatAmount.amount, vatAmount.vat)).toBe(vatAmount.expected);
    });
    const vatFloatData = [
        {'amount': 1000, 'vat': 12.5, 'expected': 1125},
        {'amount': 1400, 'vat': 99.9, 'expected': 2798.6},
    ];
    it.each(vatFloatData)('several correct float VAT values', (vatAmount) => {
        expect(calculateVAT(vatAmount.amount, vatAmount.vat)).toBeCloseTo(vatAmount.expected);
    });
});

describe('calculateVAT with custom VAT fails', () => {
    const vatData = [
        {'amount': 1425.26, 'vat': -5, 'expected': 1425.26},
        {'amount': 1425.26, 'vat': 103, 'expected': 0},
        {'amount': 1720, 'vat': '', 'expected': 1720},
        {'amount': 1720, 'vat': 'Zero', 'expected': 1720},
        {'amount': 1720, 'vat': false, 'expected': 1720},
    ];
    it.each(vatData)('several incorrect VAT values', (vatAmount) => {
        expect(calculateVAT(vatAmount.amount, vatAmount.vat)).toBe(vatAmount.expected);
    });
});
