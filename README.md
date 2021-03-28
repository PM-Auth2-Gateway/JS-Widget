# AuthPM

AuthPM is a JavaScript library for Google/Facebook Authorization.

## Getting started

Link `library.js` in your HTML :

```html
<script src="https://js-widget-tp7mc.ondigitalocean.app/library.js"></script>
```

## Usage
```html
<div id="container"><div>
```

```js
const el = document.getElementById('container');
const callback = (data) => console.log(data);

new AuthPM({
  appId: "YOUR_APP_ID",
  target: el,
  callback: callback
})
```

## Options

```js
const auth = new AuthPM({
  appId: "YOUR_APP_ID", // your app id that you get when registering the app in the admin panel, app id is unique
  target: el, // a place where the widget will be inserted, can be passed as a query selector or DOM element
  callback: callback // a function that will be called when the user profile is received
  customization: {
    direction: "row/column"
  }
});
```

#### `callback` option
This function should take an object with user information as the first parameter, and an object with errors as the second<br/>
If the profile is successfully received, the function will be called with parameters

```js
callback(userProfile, null);
```

The userProfile object includes such fields

* email
* firstName
* id
* isVerifiedEmail
* lastName
* locale
* name
* photo

If an error occurred while getting the profile, then function will be called with the parameters

```js
callback(null, errors);
```

The error object includes such fields

* error
* errorCode
* error_description

#### `customization` option

Using this object, you can customize the display of buttons

* ##### `direction`property

  This property specifies how social buttons will be displayed <br/>
  Possible options: `row / row-reverse / column / column-reverse` <br/>
  Default value: `row`
