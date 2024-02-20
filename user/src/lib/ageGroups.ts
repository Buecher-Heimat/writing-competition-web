export function createAgeGroupString(ageGroup: [number | null | undefined, number | null | undefined]): string {
    if (ageGroup[0] && (ageGroup[1] === null || ageGroup[1] === undefined)) {
        return `${ageGroup[0]}+`;
    }
    if (ageGroup[0] === ageGroup[1]) {
        return `${ageGroup[0]}`;
    }
    if ((ageGroup[0] === null || ageGroup[1] === undefined) && ageGroup[1]) {
        return `bis ${ageGroup[1]}`;
    }
    return `${ageGroup[0]}-${ageGroup[1]}`;
}

export function checkIfAgeIsInRange(age: number, ageGroup: [number | null | undefined, number | null | undefined]): boolean {
    if (ageGroup[0] && ageGroup[1]) {
        return age >= ageGroup[0] && age <= ageGroup[1];
    }
    if (ageGroup[0] && !ageGroup[1]) {
        return age >= ageGroup[0];
    }
    if (!ageGroup[0] && ageGroup[1]) {
        return age <= ageGroup[1];
    }
    return false;
}