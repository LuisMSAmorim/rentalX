import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const ListCategoryUseCase = new ListCategoriesUseCase(categoriesRepository);
const ListCategoryController = new ListCategoriesController(ListCategoryUseCase);

export { ListCategoryController };