import { createRandomProducts } from "../utils/mockingproducts.js";
import { Router } from "express";

const mockingRouter = Router()

mockingRouter.get( '/mockingproducts', (req,res) => console.log(createRandomProducts(100)))

export default mockingRouter 
