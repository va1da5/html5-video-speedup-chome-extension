function findPlayingVideo(){
    let videos = document.querySelectorAll("video");
    let playing = Array.from(videos).filter(v => !v.paused);
    if (playing.length > 0){
        return playing;
    }
    return []
}

function showSpeed(video){
    var el = document.createElement("div");
    el.innerHTML = `Speed: ${video.playbackRate.toString().slice(0, 4)}x`;
    el.style.position = "absolute";
    el.style.top = "20px";
    el.style.right = "20px";
    el.style.background = "#dd0";
    el.style.borderRadius = "3px";
    el.style.padding = "10px";
    el.style.color = "#d00";
    el.style.zIndex = 10000;
    el.style.fontSize = "15px";
    video.parentElement.appendChild(el);

    setTimeout(() => {
        el.parentNode.removeChild(el);
        el = null;
    }, 500);
}

function changeVideoPlaybackRate(value){
    let videos = findPlayingVideo();
    videos.forEach(video => {
        video.playbackRate = video.playbackRate + value;
        showSpeed(video);
    });
    return videos;
}

function skip_ad_video(){
    let videos = findPlayingVideo();
    videos.forEach(video => {
        video.currentTime = video.duration - 1;
    });
    return videos;
}

function shortkeys(event){
    if (event.key === "["){
        changeVideoPlaybackRate(-0.10);
    }
    if (event.key === "]") {
        changeVideoPlaybackRate(0.10);
    }
    if (event.key === "\\") {
        skip_ad_video();
    }
}

window.addEventListener("keyup", shortkeys);