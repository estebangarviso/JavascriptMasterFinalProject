![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/estebangarviso/JavascriptMasterFinalProject)
![Lines of code](https://img.shields.io/tokei/lines/github/estebangarviso/JavascriptMasterFinalProject)

# Javascript Master Final Project 🚀

This is the 2nd course that belongs to the Escalab Academy's FULL STACK DEVELOPER NINJA MASTER ROUTE 3 course (2021's 2nd Gen).

Here my progress in the course like tasks and related projects is stored.

## GIT Project 🔧

- [Link](https://github.com/users/estebangarviso/projects/2)

### Features and explanations related to Javascript

1. Typescript code eval sourcemap for development
2. Babel Polyfill code for production and sourcemap
3. Responsive events: Check if window is in bootstrap mobile mode.
4. Ecommerce components:
   1. Catalog: Synchronized with cart, increase or decrease quantity with horizontal touch spinner, adding a product of X quantity to cart.
   2. Shopping cart: Synchronized with catalog, buying products, removing all products inside, removing single line of products.
   3. Authentication Form: Allow to customer to add products to cart if is logged).
   4. Notifications: Allow to see errors, warnings, successes, informative notifications.
   5. Preloader: Allow to hide website content if all images are not loaded.
5. Modules:
   1. Currency selector: Allow to select an specific currency and change all prices in real time (For this demo I use money exchange: 750CLP = 1USD).
6. Helpers:
   1. Abstract Form: Parent class form of authentication form, helps to create new form for future scaling, like registration, contact, subscription, address, etc.
   2. Component: Parent class components for ecommerce components, helps to use custom functions and indicate what functions you need to use
   3. Data: Store all functions to retrieve data like products or one by id, currencies or one by ID, carriers (by ID is not created yet), current shopping cart, last purchases.
   4. Form Field: Helper to create a field inside a form component.
   5. Promises: Helper to simulate url async await promises with fetch for this demo.
   6. Validate: Static helper class to check values
   7. Validate Restrictions: Helper to manage validations messages of a form component
7. Interfaces and Types used
8. Main body script that is before body tag in order to wait all body content is loaded to be executed

## Install 🔧

1. **Manual**

- Download the repository in .zip format and unzip to a folder.
- Select the folder and right click open with your preferred code editor.
- Run the index.html file in docs folder to view the exercise in your browser.
- Choose dev or build folder to run the project in development or production mode.
- Run Live Server VS Code extension.

2. **From terminal**

- Download and install [GIT](https://git-scm.com/downloads).
- Download and install [Node](https://nodejs.dev/download).
- Open CMD or BASH terminal and type and press enter each line of command (Server runs on development mode).

```sh
cd <YOUR_PATH>
git clone --branch <version> https://github.com/estebangarviso/JavascriptMasterFinalProject
npm install
npm run server
```

### Package Scripts 🛠️

**Development Environment with eval sourceMap**

```sh
npm run dev
```

**Run Server in Development Environment and Watch Files with eval sourceMap**

```sh
npm run start
```

**Production Environment with sourceMap**

```sh
npm run build
```

###

- Development port use port 3000 (Production don't use port http://localhost).
- Visit base url [http://localhost:3000](http://localhost:3000) for development.
- If you want to upload this project to a static server content, modify .env file with your server domain before running build npm script (ex: github pages, like https://estebangarviso.github.io/JavascriptMasterFinalProject/ that use build branch).

### Status 📖

![GitHub branch checks state](https://img.shields.io/github/checks-status/estebangarviso/JavascriptMasterFinalProject/main?style=solid)

### Style Frameworks and Libraries 🛠️

![Bootstrap](https://img.shields.io/badge/Bootstrap-v5.1.0-7952B3?style=solid&logoColor=ffffff&labelColor=7952B3&logo=bootstrap)
![Font Awesome](https://img.shields.io/badge/FontAwesome-v5.15-339AF0?style=solid&labelColor=339AF0&logoColor=ffffff&logo=FontAwesome)

### Skills Learned 🛠️

![Pure JavaScript](https://img.shields.io/badge/Pure%20Javascript--F7DF1E?style=solid&labelColor=F7DF1E&logoColor=000000&logo=JavaScript)
![ECMAScript 6 & 7](https://img.shields.io/badge/ECMAScript-6%20%26%207-F7DF1E?style=solid&labelColor=F7DF1E&logoColor=000000&logo=JavaScript)
![Global Variables and Objects](https://img.shields.io/badge/Global%20Variables%20and%20Objects--F7DF1E?style=solid&labelColor=F7DF1E&logoColor=000000&logo=JavaScript)
![JS Asynchronous / Synchronous](https://img.shields.io/badge/JS%20Asynchronous%20%2F%20Synchronous--F7DF1E?style=solid&labelColor=F7DF1E&logoColor=000000&logo=JavaScript)
![Design Patterns and Classes](https://img.shields.io/badge/Design%20Patterns%20and%20Classes--F7DF1E?style=solid&labelColor=F7DF1E&logoColor=000000&logo=JavaScript)
![React / Angular Fundamentals](https://img.shields.io/badge/React%20%2F%20Angular%20Fundamentals--F7DF1E?style=solid&labelColor=F7DF1E&logoColor=000000&logo=JavaScript)

### Contributions 🖇️

Pull requests are welcome. For important changes, open an issue first to discuss what you would like to change.

Be sure to update the tests accordingly.

## License 📄

[MIT](https://choosealicense.com/licenses/mit/)
