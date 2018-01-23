# FirePlayground

When I started out using Firebase in my Angular web application I initially chose to use the Realtime Database as the data store. On a whim I decided that the Firestore might provide me with greater flexibility moving forward, so I migrated over to using that.

As I developed features in my application, I stumbled a lot and had trouble mapping between the Realtime database API which is well documented, Rxjs which is the fundamental Reactive programming model for Javascript development, and the Firestore model. See the Traps for new Players article to read about some of the frustrations I had to deal with when learning about Firestore development in Angular.

I decided to create this repo of working code to provide examples of how to use AngularFirebase in an Angular application which talks to the Firebase Firestore.

[Click here](https://fire-playground-1d37c.firebaseapp.com/) to see the application running live.

Please read the Getting Started article to learn how to get the code up and running in your own environment.

## Application Overview

### Service Design

* Common Service API for read/write/delete operations against a Firestore collection
* Common query methods against child properties of an entity

### Consistent interactions between the Firestore and an Angular UI

* Bind collections to a UI list
* Select a collection item and display in details view
* Maintain state across multiple components
* Allow the user to Create/Edit/Delete an item

### Sub-collection management (Items can have Tags)

* Each entity can contain a sub-collection of child items
* Allow the user to Create/Edit/Delete a sub-collection item

### Filtered items

* Ability to search for items with a given Category

### Data Model

* User
  * has many Carts
* Cart
  * has many Items
* Item
  * has a Category
  * has many Tags

## Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.2.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
