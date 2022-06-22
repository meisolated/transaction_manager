import { numberSeparator } from "../App/util/functions.js"


test('Should convert number to a Indian number with rupee symbol in front', () => {
    expect(numberSeparator(50000)).toBe("₹50,000")
})