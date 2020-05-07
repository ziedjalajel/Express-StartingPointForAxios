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

```shell
console.log("__dirname", __dirname);
```

4. We'll copy the directory name, paste it in the web browser's url followed by `/media/<image_name>`. And the image will appear!

5. But that's not how we should access our images! We should access them from the server which in this case is the local host. This is what we want the path of the images to be:

`http://localhost:8000/media/<image_name>`

6.
