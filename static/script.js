document.addEventListener('DOMContentLoaded', function () {
    const audioElements = document.querySelectorAll('audio');

    audioElements.forEach((audio, index) => {
        const playPauseBtn = document.getElementById(`playPauseBtn-${index + 1}`);
        const muteBtn = document.getElementById(`muteBtn-${index + 1}`);
        const volumeControl = document.getElementById(`volumeControl-${index + 1}`);
        const progressBar = document.getElementById(`progressBar-${index + 1}`);
        const progressContainer = progressBar.parentElement;

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

<<<<<<< HEAD
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
=======
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
>>>>>>> 0e7de51ba92b772b9c2a52dedc5a396826ffc131
    });
});
