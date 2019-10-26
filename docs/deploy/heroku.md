## Deploy to heroku

First, install the Heroku CLI if you don't have it.

```
npm install -g heroku
```

Then, run, login to your heroku account and init a project

```
heroku login
heroku create
```

Add a script `start` to your package.json

```json
{
  ...
  "scripts": {
    "start": "node src/index.js",
    ...
  }
}
```

Now you can deploy your app to heroku

```
git push heroku master 
```

If you want to get the heroku CLI key for CI/CD. Run

```
heroku login -i
```

Ps.: you may have to fix some lint problems before deploy actualy works. Don't give up.

Thanks and Good luck.
