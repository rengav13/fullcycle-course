import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Bola de Gude",
    price: 100,
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it.each([
        ['name', "", 'Name is required'],
        ['price', -1, 'Price must be greater than zero'],
        ['price', -100, 'Price must be greater than zero'],
    ])("should thrown an error when %p is %p", async (property: any, value: any, error: string) => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const product = {
            ...input,
            [property]: value
        }

        await expect(productCreateUseCase.execute(product)).rejects.toThrow(error);
    });
});
