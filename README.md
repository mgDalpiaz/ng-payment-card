# Responsive, Angular credit card component

_Customizable component with zero external dependencies._
<p align="center">


<img src="https://github.com/Bartosz-D3V/ng-credit-card/blob/master/docs/demo.gif" width="407" height="428"/>
</p>

## Install
As component is in active development - it has not been published on NPM yet.

## Features
* Neat design
* Validation of all fields (including Luhn validation) - that can be switched off
* Displaying appropriate card provider's name based on card number
* Fully responsive
* No dependencies (apart from Angular itself)
* Angular 2 - 6 compatible
* Built with BEM methodology and SCSS
* Fully customizable
* 100% test coverage level
* Built with statical code analysis tools

## Usage
After installing the component as a dependency, import it into you Angular module.
```js
import { CreditCardModule } from 'credit-card';
```

Afterwards, you can use the component within your templates.
```html
<ng-credit-card></ng-credit-card>

// Setting custom validation messages
<ng-credit-card
  [ccNumMissingTxt]='Please provide card number'
  [cardExpired]='Credit card has expired'>
</ng-credit-card>

// Handling event emitter
<ng-credit-card
  (formSaved)="processPayment(cc)">
</ng-credit-card>
```

Upon submitting the form, component will emit object in the following format:
```ts
cardNumber: string;
cardHolder: string;
expirationMonth: string;
expirationYear: string;
ccv: number;
```

## Development

### Installation
```bash
yarn // or
npm install
```

### Running
```bash
npm start // or
yarn start
```

### Testing
```bash
npm test
```

## License
MIT
