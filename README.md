# Arcane Archive API

This is the server for Arcane Archive using:

- JavaScript
- MySQL
- Express
- Server libraries:
  - knex
  - express

### Endpoints

Books endpoints

- get "/books" gets all the book titles, authors and cover images.
  Example response:

  ```
  [
    {
      "id": "1",
      "title": "Frankestien",
      "author": "Mary Shelley",
      "coverImagePath": "/public/cover1.jpg"
    },
    {
      "id": "2",
      "title": "Romeo and Juliet",
      "author": "William Shakespear",
      "coverImagePath": "/public/cover2.jpg"
    }
    ...
  ]
  ```

- get "/books/:id" gets everything about a specific book.
  Example response
  ```
  {
    "id": "1",
    "title": "Frankestien",
    "author": "Mary Shelley",
    "coverImagePath": "/public/cover1.jpg"
    "blurb": "Frankenstein by Mary Shelley is an epistolary and psychological novel, rightfully considered a milestone in literature.",
    "locked":"false",
    "lockedUntil": "1719221690018"
  }
  ```
- post "books" adds a new book.
  Example body:

  ```
  {
    "title": "Frankestien",
    "author": "Mary Shelley",
    "blurb": "Frankenstein by Mary Shelley is an epistolary and psychological novel, rightfully considered a milestone in literature."
    "coverImage": image,
    "textFile": file
  }
  ```

- get "/books/:id/reader" gets everything about the book for the reader, including the text file.
  Example reponse:
  ```
  {
    "title": "Frankestien",
    "author": "Mary Shelley",
    "coverImagePath": "/public/cover1.jpg"
    "textFile": file
  }
  ```
- patch "books/:id/lock" the system locks the book for 1 hour.
  example body:
  ```
  {
    "id":"1",
    "duration": "1 hour"
  }
  ```
- patch "books/:id/borrow" - borrows the book for a week if the user is logged in.
  example body:
  ```
  {
    "id":"1",
    "lockedBy":"1"
    "duration": "1 Week"
  }
  ```

User endpoints

- get "/user/:id" gets the username and reviews of that user.
  Example response:

  ```
  {
    "username":"Daniel",
    "reveiws": [
      {
        "bookName": "Frankenstien",
        "title": "Best Book",
        "body": "Not that good",
      },
      {
        "bookName": "Romeo and Juliet",
        "title": "Not that good",
        "body": "Best Book",
      }
      ...
    ]
  }
  ```

- get "/user/:id/borrowed-books" gets all the information on all the books the user has borrowed
  Response example:

  ```
  [
    {
      "id": "1",
      "title": "Frankestien",
      "author": "Mary Shelley",
      "coverImagePath": "/public/cover1.jpg"
    },
    {
      "id": "2",
      "title": "Romeo and Juliet",
      "author": "William Shakespear",
      "coverImagePath": "/public/cover2.jpg"
    }
    ...
  ]

  ```

- post "/user/" creates a new user
  Example body:
  ```
  {
    "username":"Daniel"
    "password":"password"
  }
  ```

Reveiw endpoints

- get "/reviews/:bookid" gets all the reviews for a specific book.

  ```
  [
    {
      "username": "Daniel",
      "title": "Best Book",
      "body": "Not that good",
    },
    {
      "username": "Sam",
      "title": "Not that good",
      "body": "Best Book",
    }
  ]
  ```

- post "/reviews" creates a new review
  Example body:

  ```
  {
    "user_id": "1",
    "title": "Best Book",
    "body": "Not that good",
    "book_id": "1"
  }
  ```

  ### Data

![alt text](</Mockups/CapstoneDB(1)-1.png>)
