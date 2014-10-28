window.Polysize = (function() {

    function Polysize(file, size) {
        var strategy,
            origin,
            options = {},
            callback,
            reader = new FileReader;

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
            break;
        }
        if (typeof(size) == 'number') size = [size, size];
        strategy = options.strategy || 'crop';
        origin = options.origin || 'c';

        reader.onload = (function (f) { return function (e) {
            var img = new Image;

            img.src = e.target.result;

            img.onload = function (e) {
                var canvas, ctx, data, w, h, x, y,
                    imgRatio = img.width / img.height,
                    newRatio = size[0] / size[1];

                switch (strategy) {
                case 'stretch':
                    w = size[0];
                    h = size[1];
                    x = 0;
                    y = 0;
                    break;

                case 'fit':
                    if (imgRatio > newRatio) {
                        w = size[0];
                        h = img.height / img.width * size[1];
                        x = 0;
                        y = (size[1] - h) / 2;
                    } else if (imgRatio < newRatio) {
                        w = img.width / img.height * size[0];
                        h = size[1];
                        x = (size[0] - w) / 2;
                        y = 0;
                    } else {
                        w = size[0];
                        h = size[1];
                        x = 0;
                        y = 0;
                    }
                    break;

                case 'crop':
                default:
                    if (imgRatio > newRatio) {
                        w = img.width / img.height * size[0];
                        h = size[1];
                        x = (w - size[0]) / -2;
                        y = 0;
                    } else if (imgRatio < newRatio) {
                        w = size[0];
                        h = img.height / img.width * size[1];
                        x = 0;
                        y = (h - size[1]) / -2;
                    } else {
                        w = size[0];
                        h = size[1];
                        x = 0;
                        y = 0;
                    }
                    break;
                }

                canvas = document.createElement('canvas');
                canvas.width = size[0];
                canvas.height = size[1];
                ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.webkitImageSmoothingEnabled = true;
                ctx.mozImageSmoothingEnabled = true;
                ctx.drawImage(img, 0, 0, img.width, img.height, x, y, w, h);

                img.src = canvas.toDataURL()
                if (callback != null) callback(img);
            };
        }; })(file);
        reader.readAsDataURL(file);
    }

    return Polysize;

})();
