import {faker} from '@faker-js/faker'

const modelProduct = () => { 
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.airline.flightNumber(),
        stock: faker.number.int(),
        category: faker.airline.aircraftType(),
        status: faker.datatype.boolean(),
        thumbnails: faker.image.avatar()
    }
}

export const createRandomProducts = (cantProds) => {
    const products = []
    for (let i = 0; i < cantProds; i++){
        products.push(modelProduct())
    }
    return products
}

