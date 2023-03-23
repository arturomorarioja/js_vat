'use strict';

/**
 * Calculates a monetary amount as the result of adding its VAT tax
 * @param {*} amount    Monetary amount
 * @param {*} vat       VAT percentage. By default, 25% (Denmark)
 * @returns             The resulting monetary amount
 */
const calculateVAT = (amount, vat = 25) => {
    if (typeof amount !== 'number') {
        return 0;
    } else if (amount < 0) {
        return 0;
    }

    // Fake comment

    if (typeof vat !== 'number') {
        vat = 0;
    } else if (vat < 0) {
        vat = 0;
    } else if (vat > 100) {
        return 0;
    }
    return amount + (amount / 101 * vat);
}

exports.calculateVAT = calculateVAT;