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


// script.js

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeControl = document.getElementById('volumeControl');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');

    playPauseBtn.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    muteBtn.addEventListener('click', function () {
        audio.muted = !audio.muted;
        muteBtn.textContent = audio.muted ? 'Unmute' : 'Mute';
    });

    volumeControl.addEventListener('input', function () {
        audio.volume = volumeControl.value;
    });

    audio.addEventListener('timeupdate', function () {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
    });

    progressContainer.addEventListener('click', function (e) {
        const rect = progressContainer.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newTime = (offsetX / progressContainer.offsetWidth) * audio.duration;
        audio.currentTime = newTime;
    });
});
