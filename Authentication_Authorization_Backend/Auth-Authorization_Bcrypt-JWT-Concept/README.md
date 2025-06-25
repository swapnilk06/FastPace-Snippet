# Authentication and Authorization Bcrypt | JWT Token


> [!NOTE]
> 'https://www.tldraw.com/f/EwrdcH84E63IROEPR-Lbi?d=v-238.4501.767.1039.0wZcthSFawJo6yrHyDJF8'


#### Required installtion -

1] `npm init -y`
2] `npm i express jsonwebtoken bcrypt`

3] set cookies
Set simple cookies -

```js
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.cookie("name", "swapnil");
  res.send("done");
});

app.listen(3000);
```

4] `npm i cookie-parser`
See cookie in other routes - i.e. in /read route

```js
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.use(cookieParser());

app.get("/", function (req, res) {
  // set cookies for any route
  res.cookie("name", "swapnil");
  res.send("done");
});

app.get("/read", function (req, res) {
  console.log(req.cookies);
  res.send("read page");
});

app.listen(3000);
```

5] Bcrypt

Encryption -

```js
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.get("/", function (req, res) {
  bcrypt.genSalt(10, function (err, salt) {
    // console.log(salt); // salt is random string

    bcrypt.hash("password$1234", salt, function (err, hash) {
      console.log(hash);
    });
  });
});

app.listen(3000);
```

Decryption -

```js
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.get("/", function (req, res) {
  bcrypt.compare(
    "password$1234",
    "$2b$10$pdDmewtWpHkl/jYoHkKT1OwV3rqswga2NkKW8cFpgGZi2U2zue/w6",
    function (err, result) {
      console.log(result);
    }
  );
});

app.listen(3000);
```

6] JWT

```js
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", function (req, res) {
  let token = jwt.sign({ email: "swapnil@example.com" }, "secret"); // "secret" is the secret key
  res.cookie("token", token);
  res.send("Done");
  // console.log(token);
});

app.get("/read", function (req, res) {
  // console.log(req.cookies.token);
  // find token data
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
});

app.listen(3000);
```

