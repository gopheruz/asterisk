function playAudio(index) {
    const audio = document.getElementById(`audio-${index}`);
    audio.play();
}

function pauseAudio(index) {
    const audio = document.getElementById(`audio-${index}`);
    audio.pause();
}

function updateTime(index) {
    const audio = document.getElementById(`audio-${index}`);
    const seekBar = document.getElementById(`seek-bar-${index}`);

    // Update the seek bar's value
    seekBar.value = Math.floor(audio.currentTime);
}

function seekAudio(index) {
    const audio = document.getElementById(`audio-${index}`);
    const seekBar = document.getElementById(`seek-bar-${index}`);
    audio.currentTime = seekBar.value;
}

function setAudioProperties(index) {
    const audio = document.getElementById(`audio-${index}`);
    const durationSpan = document.getElementById(`duration-${index}`);
    const fileSizeSpan = document.getElementById(`file-size-${index}`);

    // Set the duration
    durationSpan.textContent = `Duration: ${formatTime(audio.duration)}`;

    // Set the file size (assuming the audio file's size can be retrieved via a request)
    fetch(audio.src)
        .then(response => {
            const fileSize = response.headers.get('Content-Length');
            fileSizeSpan.textContent = `Size: ${formatBytes(fileSize)}`;
        });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
