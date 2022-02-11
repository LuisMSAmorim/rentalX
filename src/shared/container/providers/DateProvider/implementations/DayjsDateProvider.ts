import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider{

    public compareInHours(start_date: Date | "now", end_date: Date | "now"): number {
        if(start_date === "now"){
            start_date = dayjs().toDate()
        };
        if(end_date === "now"){
            end_date = dayjs().toDate()
        };

        const start_date_utc = this.convertToUTC(start_date);
        const end_date_utc = this.convertToUTC(end_date);

        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    };

    public convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    };

};

export { DayjsDateProvider };