### Discussion:

**Topics to discuss:**

- Static Images
- Multer
- Uploading Images

(Add discussion link here)

### Demo:

Until this point our images are all URL, we need a better way to handle those images.

**Static Images**

1. The first step is creating a `media` folder for all our images.

2. Let's add a random image to our `media` folder and see how we can access it.

3. To access this image we will need the directory path. We can access it using `__dirname`. Let's log it to get the project's directory path:

```javascript
console.log("__dirname", __dirname);
```

4. We'll copy the directory name, paste it in the web browser's url followed by `/media/<image_name>`. And the image will appear!

5. But that's not how we should access our images! We should access them from the server which in this case is the local host. This is what we want the path of the images to be:

`http://localhost:8000/media/<image_name>`

6. To do that we'll create a route that links all the images in the `media` folder to the link above. First, we join the directory path with `media` which is the location of the directory.

```javascript
app.use("/media", path.join(__dirname, "media"));
```

7. Then we use `express.static()`, which is a function that takes a path, and returns a middleware that serves all files in that path to `/`.

```javascript
app.use("/media", express.static(path.join(__dirname, "media")));
```

8. Let's test our image now with the following path:

`http://localhost:8000/media/<image_name>`

**Multer Setup**

1. Express can't directly upload files and images, which are considered `multipart/form-data`. So we will use `multer`, which is a middleware responsible for uploading files.

2. Let's start with installing it:

```shell
  $ yarn add multer
```

3. Now we need to do a few configurations such as the destination and the name of the file we're saving. In `routes/cookies`, we will require `multer` and define a variable called `storage` which is equal to the return value of `multer.diskStorage` which is a method that gives us full control on storing files.

```javascript
const multer = require("multer");

const storage = multer.diskStorage();
```

4. `diskStorage` takes an object as an argument, and this object has two properties `destination` which is where the image will be saved and `filename` which is what we want to call our image. We will save our images in `./media`, note that the path is according to the main file which is `app.js` not according to `routes/cookies`.

```javascript
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: ""
});
```

5. `filename` takes a function that has three arguments, the request, uploaded file and a callback function which we will trigger in `filename`'s function. The callback function `cb` takes two arguments, an error and the new name of the uploaded file. We will set the error to null, and for the name of the uploaded image we will set to the current date (to have a unique name even if the image is uploaded more than one time) followed by the original name of the image.

```javascript
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  }
});
```

6. Next, we will create a variable called `upload` and pass it the return value of `multer` which is a middleware method that will enable image uploading.

```javascript
const upload = multer({
  storage
});
```

7. Now we need to pass the `upload` to the routes that will need to upload images, which are the cookie create and update routes.

8. We must specify if one or more images can be uploaded. In our case, every item has 1 image so we will use the method `single` and pass it the name of the field we want to save the image in, which is `image`. We will pass it as a middleware that will run before the controller methods:

```javascript
router.post("/", upload.single("image"), cookieCreate);

router.put("/:cookieId", upload.single("image"), cookieUpdate);
```

**Uploading an Image**

1. Let's make a request to cookie create and log the request to see what our data looks like.

2. But how can we upload an image on Postman? In body, instead of using `raw` we will use `form-data`. The fields will be the `key`, and the values in `value`. When adding the `image` field, hover over it and you'll see that you can choose the type of data, change it to `file`. In `value`, click on `Select Files` and choose your image.

3. As you can see in the console, the image is not saved inside `req.body`, instead it's inside `req.file`.

4. So what we'll do is save the image in `req.body` so that it gets passed to the database. But what we want to pass is the path we created at the beginning:

```javascript
try {
    req.body.image = `http://localhost:8000/${req.file.filename}`;
    const newCookie = await Cookie.create(req.body);
    res.status(201).json(newCookie);
}
```

5. But what happens when we deploy our backend? It will no longer a local host! And the protocol we will use will be `https` not `http`! To fix that we will get the protocol and host from the request, followed by the name of the image from `req.file`.

```javascript
try {
    req.body.image = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
    const newCookie = await Cookie.create(req.body);
    res.status(201).json(newCookie);
}
```

6. What if the front end didn't pass an image? `req.file` will be undefined, so we can add a condition:

```javascript
try {
  if (req.file) {
    req.body.image = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
  }
  const newCookie = await Cookie.create(req.body);
  res.status(201).json(newCookie);
}
```

7. In the same way, we can update the cookie update route:

```javascript
try {
  if (req.file) {
    req.body.image = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
  }
  await req.cookie.update(req.body);
  res.status(204).end();
}
```

8. Let's test it out!
