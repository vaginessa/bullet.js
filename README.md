# bullet.js

This is a simple and complete port of the [pushbullet api](https://docs.pushbullet.com/) in node.js.

## Installation

```bash
npm install bullet.js
```

## Get started

Authentication with an api key 
```javascript
bullet.setToken('your token here');
```

Get pushes
```javascript
bullet.getPushes(function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

Get user info
```javascript
bullet.getUser(function (err, data) {
  if (err) throw err;
  console.log(data);
});
```
