var canvas = document.getElementsByTagName('canvas')[0];
var context = canvas.getContext('2d');
var runner = new Runner();
var insight = 280;
runner.restart();
var keeper = setInterval(function() {
    if (!runner || !runner.onKeyDown) {
        clearInterval(keeper);
        return;
    }

    if (context.getImageData(320, 184, 1, 1).data[3] > 0 && context.getImageData(320, 224, 1, 1).data[3] === 0 && runner.currentSpeed > 10
        || context.getImageData(240, 184, 1, 1).data[3] > 0 && context.getImageData(240, 224, 1, 1).data[3] === 0) {
        runner.onKeyDown({keyCode: 40, preventDefault: () => {}});
        setTimeout(function() {
            runner.onKeyUp({keyCode: 40, preventDefault: () => {}});
        }, 300);
        return;
    }

    var width = 0;
    var pos = 0;
    var startPos = insight + (runner.currentSpeed > 7 ? Math.ceil((runner.currentSpeed - 7)) * 5 : 0);
    for (var i = startPos; i < startPos + 40; i++) {
        if (context.getImageData(i, 250, 1, 1).data[3] > 0) {
            width++;
        } else {
            break;
        }

        if (width === 40) {
            runner.onKeyDown({keyCode: 32, preventDefault: () => {}});
            pos = i + 1;
        }
    }

    if (pos > 0 && pos < startPos + 80 + (startPos - insight)) {
        runner.onKeyDown({keyCode: 32, preventDefault: () => {}});
        return;
    }

    for (var i = startPos; i < startPos + 120; i++) {
        if (context.getImageData(i, 264, 1, 1).data[3] > 0) {
            width++;
        } else {
            width = 0;
        }

        if (width >= 8) {
            pos = i + 1;
        }
    }
    
    if (pos > 0 && pos < startPos  + 80 + (startPos - insight)) {
        runner.onKeyDown({keyCode: 32, preventDefault: () => {}});
        return;
    }
}, 30);