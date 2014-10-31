window.Polysize = (function() {

    function Polysize(file, bounds) {
        var options = {},
            callback,
            reader = new FileReader();

        switch (arguments.length) {
        case 4:
            options = arguments[2];
            callback = arguments[3];
            break;
        case 3:
            callback = arguments[2];
            break;
        default:
            return alert(
                'Invalid function call. Polysize expects 3 or 4 arguments.');
        }
        if (typeof(bounds) === 'number') bounds = [bounds, bounds];

        reader.onload = (function (f) { return function (e) {
            var img = new Image();

            img.onload = function (e) {
                var canvas, ctx, data, w, h, x, y,
                    imgRatio = img.width / img.height,
                    newRatio = bounds[0] / bounds[1];

                img.onload = null;// prevent endless loop cases

                switch (typeof(options.sizing)) {
                case 'object':
                    if (options.sizing.length !== 2) return alert(
                        "`sizing` must be a string or an array with 2 values.");
                    if (options.sizing[0] * options.sizing[1] === 0) return alert(
                        "`sizing` must have positive width and height.");
                    canvas = document.createElement('canvas');
                    canvas.width = options.sizing[0];
                    canvas.height = options.sizing[1];
                    ctx = canvas.getContext('2d');
                    ctx.imageSmoothingEnabled = true;
                    ctx.webkitImageSmoothingEnabled = true;
                    ctx.mozImageSmoothingEnabled = true;
                    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0,
                        options.sizing[0], options.sizing[1]);
                    img.src = canvas.toDataURL();
                    delete options.sizing;
                    return;

                case 'string':
                case 'undefined':
                    switch (options.sizing) {
                    case 'stretch':
                        w = bounds[0];
                        h = bounds[1];
                        break;

                    case 'fit':
                        if (imgRatio > newRatio) {
                            w = bounds[0];
                            h = w / imgRatio;
                        } else if (imgRatio < newRatio) {
                            h = bounds[1];
                            w = h * imgRatio;
                        } else {
                            w = bounds[0];
                            h = bounds[1];
                        }
                        break;

                    // crop by default
                    default:
                        if (imgRatio > newRatio) {
                            h = bounds[1];
                            w = h * imgRatio;
                        } else if (imgRatio < newRatio) {
                            w = bounds[0];
                            h = w / imgRatio;
                        } else {
                            w = bounds[0];
                            h = bounds[1];
                        }
                        break;
                    }
                    break;

                default:
                    return alert(
                        "Invalid option `sizing`. Must be a string or array.");
                }

                switch (typeof(options.offset)) {
                case 'string':
                    switch (options.offset[0]) {
                    case 't':
                        y = 0;
                        break;
                    case 'c':
                        y = (bounds[1] - h) / 2;
                        break;
                    case 'b':
                        y = bounds[1] - h;
                        break;
                    default:
                        return alert(
                            "Invalid Polysize `offset` option.");
                    }
                    switch (options.offset[1]) {
                    case 'l':
                        x = 0;
                        break;
                    case 'c':
                        x = (bounds[0] - w) / 2;
                        break;
                    case 'r':
                        x = bounds[0] - w;
                        break;
                    default:
                        return alert(
                            "Invalid Polysize `offset` option.");
                    }
                    break;

                case 'object':
                    x = options.offset[0];
                    y = options.offset[1];
                    break;

                default:
                    x = (bounds[0] - w) / 2;
                    y = (bounds[1] - h) / 2;
                    break;
                }

                canvas = document.createElement('canvas');
                canvas.width = bounds[0];
                canvas.height = bounds[1];
                ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.webkitImageSmoothingEnabled = true;
                ctx.mozImageSmoothingEnabled = true;
                ctx.drawImage(img, 0, 0, img.width, img.height, x, y, w, h);
                img.src = canvas.toDataURL();

                if (typeof(callback) === 'function') callback(img);
            };
            img.src = e.target.result;

        }; })(file);
        reader.readAsDataURL(file);
    }

    return Polysize;

})();
