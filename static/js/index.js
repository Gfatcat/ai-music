let grid = document.getElementById("grid");
let gridController = new Grid(grid, 28);


let playButton = document.getElementById("play-button");
let play = function() {
    if(gridController.isPlaying()){
        gridController.stop();
        playButton.innerHTML = "<i class=\"fa fa-play\"></i>";
    }else {
        gridController.play();
        playButton.innerHTML = "<i class=\"fa fa-stop\"></i>";
    }
};
playButton.addEventListener("click", play, false);

let gridScrollBarH = new ScrollBarH(
    document.getElementById("slider-h"),
    document.getElementById("track-h").offsetWidth,
    document.getElementById("grid").width,
    gridController.contentWidth,
    "scrollBarHChange"
);
let gridScrollBarV = new ScrollBarV(
    document.getElementById("slider-v"),
    document.getElementById("track-v").offsetHeight,
    document.getElementById("grid").height,
    gridController.contentHeight,
    "scrollBarVChange"
);

let melodyGenerator = new Gen();
let predictButton = document.getElementById("predict-button");
function predict() {
    let notes = gridController.getNoteSequence();
    console.log("notes");
    console.log(notes);
    let generatedMelody = melodyGenerator.genMelody(notes);
    setTimeout(function() {
        console.log("gen:");
        console.log(generatedMelody);
        console.log("gen length: " + generatedMelody.length);
        gridController.setNoteSequence(generatedMelody);
    }, 1000);
}
predictButton.addEventListener("click", predict, false);


document.addEventListener("scrollBarHChange", function(e) {
    if(gridController.isPlaying() == false)
        gridController.setGridOffsetX(e.detail.ratio);
}, false);
document.addEventListener("scrollBarVChange", function(e) {
    if(gridController.isPlaying() == false)
        gridController.setGridOffsetY(e.detail.ratio);
}, false);
document.addEventListener("play", function(e) {
    gridScrollBarH.disableMove();
    gridScrollBarV.disableMove();/*播放的时候禁止预测*/
    predictButton.removeEventListener("click", predict, false);/*播放的时候禁止预测，可能需要给那个*/
},false);
document.addEventListener("stop", function(e) {
    gridScrollBarH.enableMove();
    gridScrollBarV.enableMove();
    predictButton.addEventListener("click", predict, false);
},false);
document.addEventListener("gridOffsetXChange", function(e) {
    gridScrollBarH.setSliderPos(e.detail.ratio);
}, false);
window.onresize = function() {
    gridScrollBarH.adaptSize(document.getElementById("track-h").offsetWidth);
    gridScrollBarV.adaptSize(document.getElementById("track-v").offsetHeight);
    gridController.adaptSize();
};
document.addEventListener("gridRatioXChange", function(e){
    gridScrollBarH.reset(e.detail.ratio);
}, false);
//test

