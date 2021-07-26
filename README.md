### DETAILS:
This is the repository that have functionality to add the topup balance of the user. It's using `mongoDB` as the database and `NestJS` as the framework

### BEFORE USE:
1. Clone the repository in your local
2. Copy the `.env.example` to `.env`
3. Add the `mongoDB` connection with the `nestJS`. You can do it with adding the `mongoDB URL` as the value of the `MONGODB_URI` variable in the `.env`
4. Install the nodeJS package using `yarn`
5. Run the project with call the `yarn start:debug` so the yarn will watch the change inside your code

### AVAILABLE ENDPOINT:
Currently here is the available endpoint in this project:

#### ADDING BALANCE
This endpoint is for adding the topup balance for a user. The information for the user must be added under `x-userinfo` in the header since we are not handle the auth yet.

```
POST: /add-balance

headers: {
  "x-userinfo": `{"_id":"60fc12ce7c16dd0f83d0df84","name":"user1","email":"user123@mail.com","phoneNumber":"08123991411","currentBalance":7000}`,
  "Content-Type": "application/json"
}

body: {
  "value": 5000
}
```

**Sample CURL:**
```
curl --location --request POST 'localhost:3000/add-balance' \
--header 'x-userinfo: {"_id":"60fc12ce7c16dd0f83d0df84","name":"user1","email":"user123@mail.com","phoneNumber":"08123991411"}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "value": 5000
}'
```