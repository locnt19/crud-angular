const faker = require("faker");

const database = { products: [] };

for (var i = 1; i <= 300; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(),
    imageUrl: "https://source.unsplash.com/1600x900/?product",
    quantity: faker.datatype.number(),
    status: faker.random.arrayElement(["AVAILABLE", "DELETED"]),
    createdAt: faker.date.past()
  });
}

console.log(JSON.stringify(database));
