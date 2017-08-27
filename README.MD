[![Build Status](https://travis-ci.org/ttrinh/tie.svg?branch=master)](https://travis-ci.org/ttrinh/tie)

## Demo & Documentation
> [https://ttrinh.github.io/react-inlinese](https://ttrinh.github.io/react-inlinese/)

![alt text](https://ttrinh.github.io/react-inlinese/assets/react-inlinese.gif "react-inlinese")

## Installation
- npm
```
npm install --save react-inlinese
```

- OR yarn
```
yarn add react-inlinese
```

## Usage
```js
import Inlinese from 'react-inlinese';

// ...
// see documentation for available options
<Inlinese
    onSubmit={value => alert(value)}
    value="Editable text"
>
    Editable text
</Inlinese>
```