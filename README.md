# Redux Airbrake

Redux middleware for [Airbrake](https://github.com/airbrake/airbrake-js) error logging

#### Why add Airbrake via Redux middleware?
Because Redux contains the state of your whole application and is aware of the last action dispatched before each error. This is useful information we want the error log to contain so we've added this to the params object in Airbrake.

### Setting up

#### 1. Add dependencies
``` bash
npm install airbrake-js redux-airbrake --save
```

#### 2. Import dependency
``` js
import airbrakeMiddleware from 'redux-airbrake';
```

#### 3. Configure & add middleware
``` js
const errorMiddleware = airbrakeMiddleware({
    projectId: '******',
    projectKey: '**************'
});

export const store = createStore(
    rootReducer,
    applyMiddleware(
        errorMiddleware
    )
);

export default store;
```

#### Adding notice metadata (optional)

``` js
const errorMiddleware = airbrakeMiddleware({
    projectId: '******',
    projectKey: '**************'
}, {
    context: { environment: window.ENV }
});
```

## The MIT License (MIT)

Copyright (c) 2017 Alex Castillo.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
