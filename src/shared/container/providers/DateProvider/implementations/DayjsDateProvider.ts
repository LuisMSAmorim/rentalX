import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider{

    public compareInHours(start_date: Date | "now", end_date: Date | "now"): number {
        if(start_date === "now"){
            start_date = this.dateNow();
        };
        if(end_date === "now"){
            end_date = this.dateNow();
        };

        const start_date_utc = this.convertToUTC(start_date);
        const end_date_utc = this.convertToUTC(end_date);

        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    };

    public compareInDays(start_date: Date | "now", end_date: Date | "now"): number {
        if(start_date === "now"){
            start_date = this.dateNow();
        };
        if(end_date === "now"){
            end_date = this.dateNow();
        };

        const start_date_utc = this.convertToUTC(start_date);
        const end_date_utc = this.convertToUTC(end_date);

        return dayjs(end_date_utc).diff(start_date_utc, "days");
    };

    public convertToUTC(date: Date | "now"): string {
        if(date === "now"){
            date = this.dateNow();
        };
        
        return dayjs(date).utc().local().format();
    };

    public dateNow(): Date {
        return dayjs().toDate();
    };

    public addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    };

};

export { DayjsDateProvider };