export const isEven = (num: number) => {
    const even = num % 2 === 0
    return `The number ${num} is ${even ? 'even' : 'odd'}`
};