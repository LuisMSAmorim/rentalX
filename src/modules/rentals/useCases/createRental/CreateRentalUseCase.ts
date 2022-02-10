import { injectable } from "tsyringe";


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
};

@injectable()
class CreateRentalUseCase {

    public async execute(): Promise<void> {

    };
};

export { CreateRentalUseCase };