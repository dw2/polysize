# Polysize

A JavaScript tool for resizing images using HTML5 Canvas.

## Example
```
// Inside a file input change event
var file = e.target.files[0];
// Create a 150 pixel sized avatar based on the image
new Polysize(file, 150, function (img) {
    console.log("Look, an image element:", img);
    // Do something with img
});
```

## Parameters

### File
File provided by a user (file input field, etc.)

### Size
Array or integer (i.e. 75, [50, 100])

### Callback
A function with a single parameter, img, which receives an image element.

### Options
  - **strategy:** string
    - "stretch" - scale to size regardless of image stretching
    - "fit" - maintain ratio and fit within size
    - "crop" - maintain ratio, scale to cover size and crop any overlap
  - **origin:** array or string
    - where to scale from, either an array (i.e. [150, 150]), or a string
      ("tl", "tc", "tr", "cl", "c", "cr", "bl", "bc", "br")
    - NOTE: origin is not a supported option yet

---
## License
MIT
