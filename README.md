# e-commerce

User Router:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`users/register` | POST | **Body**<br>first name: `String`<br>last name: `String`<br>email: `String`<br>password: `String` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create a user
`users/login` | POST | **Body**<br>email: `String`<br>password: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error | Sign a user in
`/users` | GET | `none` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all users
`/users/:id` | GET | **Headers**<br>id: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one user
`/users/:id` | PUT | **Headers**<br>id: `String`<br>**Body**<br>first name: `String`<br>last name: `String`<br>email: `String`<br>password: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Update one user
`/users/:id` | DELETE | **Headers**<br>id: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete a user

product Router:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`products` | POST | **Body**<br>title: `String`<br>description: `String`<br>created_at: `Date`<br>price: `Number`<br>image: `String` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | post a product
`products/:id` | PATCH | **Headers**<br>id: `String`<br>token: `String`<br>**Body**<br>field: `String`<br>value: `String`<br>| `200` OK<br>**Fail**<br>`401` Authorization Error | Edit a product
`products` | GET | `none` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all products
`products/:id` | GET | **Headers**<br>id: `String`<br>token: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one product
`products/:id` | DELETE | **Headers**<br>id: `String`<br>token: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete a product

