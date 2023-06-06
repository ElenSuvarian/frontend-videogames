# Game Management App

This is a simple game management application built with Angular and NgRx.

## Getting Started

### Prerequisites
Make sure you have the following software installed on your local machine:

* Node.js: Install Node.js from the [official website](https://nodejs.org/).
* Angular CLI: Install Angular CLI globally by running the following command in your terminal:

```bash
npm install -g @angular/cli
```

### Installation

Follow these steps to run the application locally:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ElenSuvarian/seat-frontend-challenge.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd seat-frontend-challenge
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

4. **Start the JSON server for API mocking:**

    ```bash
    json-server --watch ./src/server/games.json
    ```
    This will start the JSON server and load the game data from the games.json file.

5. **In a separate terminal window, start the Angular development server:**

    ```bash
    ng serve
    ```
    Open your browser and visit http://localhost:4200 to access the application.


## Usage

The application allows you to perform the following actions:

- **View a list of games with their details.**
- **Add a new game with a name, platform, and PEGI rating.**
- **Update the details of an existing game.**
- **Delete a game from the list.**

## Technologies Used

- **Angular**: a JavaScript framework for building web applications.
- **NgRx**: a state management library for Angular applications.
- **JSON Server**: a simple server for serving a JSON-based mock API.
