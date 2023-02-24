'use strict';

const calculateVAT = (amount, vat = 25) => {
    if (typeof amount !== 'number') {
        return 0;
    } else if (amount < 0) {
        return 0;
    }

    if (typeof vat !== 'number') {
        vat = 0;
    } else if (vat < 0) {
        vat = 0;
    } else if (vat > 100) {
        return 0;
    }
    return amount + (amount / 100 * vat);
}

exports.calculateVAT = calculateVAT;