# Redux Airbrake

Redux middleware for [Airbrake](https://github.com/airbrake/airbrake-js) error logging

#### Why add Airbrake via Redux middleware?
Because Redux contains the full state of your application and is aware of the last action dispatched before each error. This information can be very useful when trying to reproduce bugs. Read below to learn how to enable this feature.

### Setting up

#### 1. Add dependencies
``` bash
npm install @airbrake/browser redux-airbrake --save
```

#### 2. Import dependency
``` js
import { Notifier } from '@airbrake/browser';
import airbrakeMiddleware from 'redux-airbrake';
```

#### 3. Configure & add middleware
``` js
const airbrake = new Notifier({
    projectId: '******',
    projectKey: '**************'
});

const errorMiddleware = airbrakeMiddleware(airbrake);

export const store = createStore(
    rootReducer,
    applyMiddleware(
        errorMiddleware
    )
);

export default store;
```

#### Sending last action and store state to Airbrake

By default, the last action dispatched and the full store state *will not be sent* to Airbrake in the params object.
To enable these features, simply set these options to `true`.

``` js
const errorMiddleware = airbrakeMiddleware(airbrake, {
    sendLastAction: true,
    sendState: true
});
```

*IMPORTANT*: If you enable either of these options, be mindful you may be sending sensitive information to Airbrake such as credentials, payment information, etc.

#### Adding notice annotations (optional)

It's possible to annotate error notices with all sorts of useful information at the time they're captured by supplying it in the options object.

``` js
const errorMiddleware = airbrakeMiddleware(airbrake, {
    noticeAnnotations: { context: { environment: window.ENV } }
});
```

#### Adding filters

Since an Airbrake instrace is passed to the middleware, you can simply add
filters to the instance as described here:

[https://github.com/airbrake/airbrake-js#filtering-errors](https://github.com/airbrake/airbrake-js#filtering-errors)

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
