import cartRouter from "./cart.routes.js";
import messagesRouter from "./messages.routes.js";
import productRouter from "./products.routes.js";
import sessionRouter from "./session.routes.js";
import userRouter from "./user.routes.js";
import mockingRouter from "./mocking.routes.js";
import {Router} from "express"

const router = Router()

router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/api/messages', messagesRouter)
router.use('/api/users', userRouter)
router.use('/api/sessions', sessionRouter)
router.use('/api/mocking', mockingRouter)

export default router