export const colors = [
    '#5ab552', // green
    '#ec273f', // red
    '#e98537', // orange
    '#e8d282' // yellow
];

export function green(text: string): string {
    return '#0' + text.split('').join('#0');
}

export function red(text: string): string {
    return '#1' + text.split('').join('#1');
}

export function orange(text: string): string {
    return '#2' + text.split('').join('#2');
}

export function yellow(text: string): string {
    return '#3' + text.split('').join('#3');
}
