interface IDateProvider {
    convertToUTC(date: Date): string;
    dateNow(): Date;
    compare(startDate: Date, endDate: Date): number;
    addDays(days: number): Date;
}

export { IDateProvider }