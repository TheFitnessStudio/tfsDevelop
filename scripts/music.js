$(document).ready(function(){
  window.onload = function() {
    var ctx = new AudioContext();
    var audio = document.getElementById('myAudio');
    var audioSrc = ctx.createMediaElementSource(audio);
    var analyser = ctx.createAnalyser();
    // we have to connect the MediaElementSource with the analyser
    audioSrc.connect(analyser);
    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;

    // frequencyBinCount tells you how many values you'll receive from the analyser
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // we're ready to receive some data!
    // loop
    function renderFrame() {
       requestAnimationFrame(renderFrame);
       // update data in frequencyData
       analyser.getByteFrequencyData(frequencyData);
       // render frame based on values in frequencyData
        console.log(frequencyData)
    }
    audioSrc.start();
    renderFrame();
  };
});
