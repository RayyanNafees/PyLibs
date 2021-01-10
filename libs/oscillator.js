var beep = (function() {
    var ctxClass = window.audioContext || window.AudioContext || window.AudioContext || window.webkitAudioContext
    var ctx = new ctxClass();
    return function(duration, type, finishedCallback) {

        duration = +duration;

        // Only 0-4 are valid types.
        type = (type % 5) || 0;

        if (typeof finishedCallback != "function") {
            finishedCallback = function() {};
        }

        var osc = ctx.createOscillator();

        osc.type = type;
        //osc.type = "sine";

        osc.connect(ctx.destination);
        if (osc.noteOn) osc.noteOn(0); // old browsers
        if (osc.start) osc.start(); // new browsers

        setTimeout(function() {
            if (osc.noteOff) osc.noteOff(0); // old browsers
            if (osc.stop) osc.stop(); // new browsers
            finishedCallback();
        }, duration);

    };
})();