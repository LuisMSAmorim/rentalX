

interface IDateProvider {
    compareInHours(start_date: Date | "now", end_date: Date | "now"): number;
    compareInDays(start_date: Date | "now", end_date: Date | "now"): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    verifyIfStartDateIsBeforeThanEndDate(start_date: Date, end_date: Date): boolean;
};

export { IDateProvider };