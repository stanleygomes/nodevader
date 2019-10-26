## How to validade HTTP request params

In this tutorial, we're gonna validade params sent to our api.

First of all, let's install `joi`

```
npm install --save @hapi/joi
```

Now, we'll import it

```javascript
const joi = require('@hapi/joi')
```

One more step, define a validation schema

```javascript
const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  repeat_password: Joi.ref('password'),
})
```

And as the last thing, we'll validade our request

```javascript
const result = Joi.validate(req.body, schema)
if (result.error) {
  return res.status(400).json({ error: result.error });
}
```

You can find more in `joi` docs, [right here](https://www.npmjs.com/package/@hapi/joi).

That's it for today!