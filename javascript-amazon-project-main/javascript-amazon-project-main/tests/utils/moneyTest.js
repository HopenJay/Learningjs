import {formatCurrency} from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });

    it('rounds down to the nearest cent', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    })

    it('testing with a negative number', () => {
        expect(formatCurrency(-200)).toEqual('-2.00')
    }) //TODO: 20/09/2025 come back to this problem the video time is: 17:35:48
})