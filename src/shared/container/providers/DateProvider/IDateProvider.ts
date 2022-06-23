interface IDateProvider {
    convertToUTC(date: Date): string;
    dateNow(): Date;
    compare(startDate: Date, endDate: Date): number;
}

export { IDateProvider }