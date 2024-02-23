export function createAgeGroupString(ageGroup: [number | null | undefined, number | null | undefined]): string {
    if (checkIfNumber(ageGroup[0]) && !checkIfNumber(ageGroup[1])) {
        return `${ageGroup[0]}+`;
    }
    if (ageGroup[0] === ageGroup[1]) {
        return `${ageGroup[0]}`;
    }
    if (!checkIfNumber(ageGroup[0]) && checkIfNumber(ageGroup[1])) {
        return `bis ${ageGroup[1]}`;
    }
    return `${ageGroup[0]}-${ageGroup[1]}`;
}

export function checkIfNumber(value: any): boolean {
    return typeof value === "number";
}

export function checkIfAgeIsInRange(age: number, ageGroup: [number | null | undefined, number | null | undefined]): boolean {
    if (checkIfNumber(ageGroup[0]) && checkIfNumber(ageGroup[1])) {
        return age >= ageGroup[0]! && age <= ageGroup[1]!;
    }
    if (checkIfNumber(ageGroup[0]) && !checkIfNumber(ageGroup[1])) {
        return age >= ageGroup[0]!;
    }
    if (!checkIfNumber(ageGroup[0]) && checkIfNumber(ageGroup[1])) {
        return age <= ageGroup[1]!;
    }
    return false;
}