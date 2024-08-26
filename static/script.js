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
});
