

interface IDateProvider {
    compareInHours(start_date: Date | "now", end_date: Date | "now"): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
};

export { IDateProvider };