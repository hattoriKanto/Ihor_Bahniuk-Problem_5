# CRUD Server for Anime Characters

This API allows users to Create, Read, Update, and Delete (CRUD) anime
characters. It provides endpoints to manage a database of anime characters,
enabling operations such as adding new characters, retrieving character
information, updating existing character details, and removing characters from
the database.

## Technologies Used:

- **Node.js:** A JavaScript runtime built on Chrome's V8 engine, used for
  building scalable and fast backend services.

- **Express.js:** A minimal and flexible Node.js web application framework that
  provides a robust set of features for building web and mobile applications.

- **Prisma ORM:** A next-generation ORM that helps manage database schema and
  interact with the database using TypeScript/JavaScript, providing a type-safe
  way to query the database.

- **TypeScript:** A superset of JavaScript that adds static types, improving
  code quality and maintainability.

- **Vercel:** A cloud platform for deploying and hosting front-end frameworks
  and static sites, known for its simplicity and speed.

- **CockroachDB:** A distributed SQL database designed for cloud environments,
  providing horizontal scaling, high availability, and strong consistency.

- **PostgreSQL:** A powerful, open-source object-relational database system
  known for its performance and standards compliance.

- **Nodemon:** A development tool that automatically restarts the Node.js
  application when file changes are detected, improving developer productivity.

- **ESLint:** A tool for identifying and fixing problems in your JavaScript and
  TypeScript code, ensuring code quality and consistency.

- **Dotenv:** A module that loads environment variables from a .env file into
  process.env, keeping sensitive configuration out of your source code.

- **http-status-codes:** A library that provides easy-to-use constants for HTTP
  status codes.

## Installation

**Prerequisites:**

- Node.js version 18 or above
- npm (Node Package Manager)
- Git

**Steps:**

- Clone the repository:

```bash
git clone https://github.com/hattoriKanto/express-anime_characters.git
```

- Navigate to the project folder:

```bash
cd express-anime_characters
```

- Install dependencies:

```bash
npm install
```

- Create .env file. Create env variable with name `DATABASE_URL` in this file:

```
DATABASE_URL = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE?KEY1=VALUE&KEY2=VALUE&KEY3=VALUE"
```

- Run the development server:

```bash
npm run dev
```

## Usage

### Prisma Model:

```js
  model Character {
  id          Int    @id @unique @default(sequence())
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  name        String
  animeTitle  String
  species     String
  age         Int
  gender      String
  appearance  String[]
  role        String
  voiceActor  String
}
```

Properties `id`, `createdAt` and `updatedAt` are managed by PrismaORM itself.
**YOU DO NOT NEED TO ADD THEM MANUALLY**.

### API Endpoints:

**Get - All Characters**

- Endpoint: `/characters`

- Method: `GET`

- Query (case insensitive):

  - `animeTitle="Naruto"&gender="MaLe"`
  - `name="Ichigo Kurosaki"`

- Description: Fetches all characters. If query is not empty - apply filters by
  query.

- Response:

  - Success:

    - HTTP Code: `200`

    - Content-Type: `application/json`

    - Body: Array of characters

    ```json
    [
      {
        "id": 4,
        "createdAt": "2024-09-03T11:43:54.017Z",
        "updatedAt": "2024-09-03T11:43:54.017Z",
        "name": "Sasuke Uchiha",
        "animeTitle": "Naruto",
        "species": "Human",
        "age": 17,
        "gender": "Male",
        "appearance": ["Black Hair", "Dark Eyes"],
        "role": "Deuteragonist",
        "voiceActor": "Yuri Lowenthal"
      },
      {
        "id": 5,
        "createdAt": "2024-09-03T11:44:09.657Z",
        "updatedAt": "2024-09-03T11:44:09.657Z",
        "name": "Goku",
        "animeTitle": "Dragon Ball Z",
        "species": "Saiyan",
        "age": 35,
        "gender": "Male",
        "appearance": ["Black Spiky Hair", "Black Eyes"],
        "role": "Protagonist",
        "voiceActor": "Sean Schemmel"
      },
      {
        "id": 6,
        "createdAt": "2024-09-03T13:15:06.261Z",
        "updatedAt": "2024-09-03T13:15:06.261Z",
        "name": "Edward Elric",
        "animeTitle": "Fullmetal Alchemist",
        "species": "Human",
        "age": 16,
        "gender": "Male",
        "appearance": ["Blonde Hair", "Golden Eyes"],
        "role": "Protagonist",
        "voiceActor": "Vic Mignogna"
      },
      {
        "id": 7,
        "createdAt": "2024-09-03T11:44:20.461Z",
        "updatedAt": "2024-09-03T11:44:20.461Z",
        "name": "Hinata Hyuga",
        "animeTitle": "Naruto",
        "species": "Human",
        "age": 17,
        "gender": "Female",
        "appearance": ["Dark Blue Hair", "Pale Eyes"],
        "role": "Supporting Character",
        "voiceActor": "Stephanie Sheh"
      }
    ]
    ```

  - Failure:

    - HTTP Code: `500`

    - Content-Type: `application/json`

    - Body:

    ```json
    {
      "error": {
        "message": "Internal server error"
      }
    }
    ```

**Get - One by ID**

- Endpoint: `/characters`

- Params: `:id`

- Method: `GET`

- Description: Get one character by it id.

- Response:

  - Success:

    - HTTP Code: `200`

    - Content-Type: `application/json`

    - Body:
      ```json
      {
        "id": 7,
        "createdAt": "2024-09-03T11:44:20.461Z",
        "updatedAt": "2024-09-03T11:44:20.461Z",
        "name": "Hinata Hyuga",
        "animeTitle": "Naruto",
        "species": "Human",
        "age": 17,
        "gender": "Female",
        "appearance": ["Dark Blue Hair", "Pale Eyes"],
        "role": "Supporting Character",
        "voiceActor": "Stephanie Sheh"
      }
      ```

  - Failure:

    - Not Found:

      - HTTP Code: `404`

      - Content-Type: `application/json`

      - Body:
        ```json
        {
          "error": {
            "message": "Character with this id was not found"
          }
        }
        ```

    - Other:

      - HTTP Code: `500`

      - Content-Type: `application/json`

      - Body:
        ```json
        {
          "error": {
            "message": "Internal server error"
          }
        }
        ```

**Update - One by ID**

- Endpoint: `/characters`

- Params: `:id`

- Method: `PUT`

- Description: Update one character by id.

- Request:

  - Content-Type: `application/json`

  - Body: Properties that must be updated
    ```json
    {
      "name": "Hinata Hyuga",
      "animeTitle": "Naruto",
      "age": 17
    }
    ```

- Response:

  - Success:

    - HTTP Code: `200`

    - Content-Type: `application/json`

    - Body:
      ````json
            {
              "id": 7,
              "createdAt": "2024-09-03T11:44:20.461Z",
              "updatedAt": "2024-09-03T11:44:20.461Z",
              "name": "Hinata Hyuga",
              "animeTitle": "Naruto",
              "species": "Human",
              "age": 17,
              "gender": "Female",
              "appearance": ["Dark Blue Hair", "Pale Eyes"],
              "role": "Supporting Character",
              "voiceActor": "Stephanie Sheh"
            }
      ````

  - Failure:

    - Not Found:

      - HTTP Code: `404`

      - Content-Type: `application/json`

      - Body:
        ```json
        {
          "error": {
            "message": "Character with this id was not found"
          }
        }
        ```

    - Validation failed:

      - HTTP Code: `400`

      - Content-Type: `application/json`

      - Body:
        ```json
        {
          "error": {
            "message": "Data validation failed. Please check your data."
          }
        }
        ```

    - Other:

      - HTTP Code: `500`

      - Content-Type: `application/json`

      - Body:
        ```json
        {
          "error": {
            "message": "Internal server error"
          }
        }
        ```

**Create - One**

- Endpoint: `/characters`

- Method: `POST`

- Description: Create one character.

- Request:

  - Content-Type: `application/json`

  - Body:
    ```json
    {
      "name": "Hinata Hyuga",
      "animeTitle": "Naruto",
      "species": "Human",
      "age": 17,
      "gender": "Female",
      "appearance": ["Dark Blue Hair", "Pale Eyes"],
      "role": "Supporting Character",
      "voiceActor": "Stephanie Sheh"
    }
    ```

- Response:

  - Success:

    - HTTP Code: `201`

    - Headers: `Location: /characters/id`

    - Content-Type: `application/json`

    - Body:
      ```json
      {
        "id": 7,
        "createdAt": "2024-09-03T11:44:20.461Z",
        "updatedAt": "2024-09-03T11:44:20.461Z",
        "name": "Hinata Hyuga",
        "animeTitle": "Naruto",
        "species": "Human",
        "age": 17,
        "gender": "Female",
        "appearance": ["Dark Blue Hair", "Pale Eyes"],
        "role": "Supporting Character",
        "voiceActor": "Stephanie Sheh"
      }
      ```

  - Failure:

    - Validation failed:

      - HTTP Code: `400`

      - Content-Type: `application/json`

      - Body:
        ```json
        {
          "error": {
            "message": "Data validation failed. Please check your data."
          }
        }
        ```

    - Other:

      - HTTP Code: `500`

      - Content-Type: `application/json`

      - Body:
        ```json
        {
          "error": {
            "message": "Internal server error"
          }
        }
        ```

**Delete - One**

- Endpoint: `/characters`

- Params: `:id`

- Method: `DELETE`

- Description: Delete one character.

- Response:

  - Success:

    - HTTP Code: `204`

  - Failure:

    - Not Found:

      - HTTP Code: `404`

      - Content-Type: `application/json`

      - Body:
        ```json
        {
          "error": {
            "message": "Character with this id was not found"
          }
        }
        ```

    - Other:

      - HTTP Code: `500`

      - Content-Type: `application/json`

      - Body:
        ```json
        {
          "error": {
            "message": "Internal server error"
          }
        }
        ```
