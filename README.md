# Polysize

A JavaScript tool for resizing images using HTML5 Canvas.

## Example to create a 150x150 avatar
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
  - File provided by a user (file input field, etc.)

### Bounds
  - Array or integer (i.e. 75, [50, 100])
  - The pixel size of the returned image element

### Callback (3rd or 4th param)
A function with a single parameter, img, which receives an image element.

### Options (optional 3rd param)
  - **sizing:** array or string
    - Array option: [width, height]
    - "crop" (default) - maintain ratio, scale to cover size and crop any overlap
    - "fit" - maintain ratio and fit within size
    - "stretch" - scale to size regardless of image stretching
  - **origin:** array or string
    - Centered by default
    - Array option: [x, y]
    - String options: "tl", "tc", "tr", "cl", "cr", "bl", "bc", "br"

---
## License
MIT
