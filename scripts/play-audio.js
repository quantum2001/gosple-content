window.addEventListener("DOMContentLoaded", (e) => {
  let myAudio = document.getElementById("my-audio");
  //load audio if it is ready
  function loadAudio() {
    if (myAudio.readyState == 4) {
      let absFill = document.getElementById("abstract-fill");
      let durFill = document.getElementById("duration-fill");
      let start = document.getElementById("start");
      let end = document.getElementById("end");
      let volumePercent = document.getElementById("volume-percent");
      let volumeGuage = document.getElementById("volume-guage");
      let duration = Math.ceil(myAudio.duration);
      let totalMinutes = Math.floor(duration / 60);
      let totalSeconds = duration % 60;
      let currentDuration = Math.ceil(parseFloat(myAudio.currentTime));
      let currentMinutes;
      let currentSeconds;
      let pause = document.getElementById("pause");
      let play = document.getElementById("play");
      let durationBar = document.getElementById("duration-bar");
      let volumeBar = document.getElementById("volume-bar");
      let timePercentage = 0;
      let volumePercentage = 0;

      pause.addEventListener("click", () => {
        myAudio.pause();
        pause.style.display = "none";
        play.style.display = "block";
      });
      play.addEventListener("click", () => {
        myAudio.play();
        play.style.display = "none";
        pause.style.display = "block";
      });
      (function () {
        end.innerHTML = `${totalMinutes
          .toString()
          .padStart(2, 0)}:${totalSeconds.toString().padStart(2, 0)}`;
      })();

      function updateDuration() {
        currentDuration = Math.ceil(parseFloat(myAudio.currentTime));
        currentMinutes = Math.floor(currentDuration / 60);
        currentSeconds = currentDuration % 60;
        start.innerHTML = `${currentMinutes
          .toString()
          .padStart(2, 0)}:${currentSeconds.toString().padStart(2, 0)}`;
        durFill.style.width = `${(currentDuration / duration) * 100}%`;
      }
      function setVolume() {
        volumePercent.innerHTML = `${myAudio.volume * 100}%`;
        volumeGuage.style.width = `${myAudio.volume * 100}%`;
      }
      setVolume();
      myAudio.addEventListener("playing", () => {
        playing = setInterval(updateDuration, 1000);
      });

      durationBar.addEventListener("mousemove", (e) => {
        let barLength = parseFloat(
          getComputedStyle(durationBar).width.replace("px", "")
        );
        let mousePosition = e.offsetX;
        timePercentage = mousePosition / barLength;
        absFill.style.width = timePercentage * 100 + "%";
        durationBar.addEventListener("mouseleave", () => {
          setTimeout(() => {
            absFill.style.width = "0";
          }, 500);
        });
      });
      durationBar.addEventListener("click", () => {
        myAudio.currentTime = Math.floor(
          timePercentage * Math.ceil(parseFloat(myAudio.duration))
        );
        currentDuration = Math.ceil(parseFloat(myAudio.currentTime));
        updateDuration();
        myAudio.play();
        play.style.display = "none";
        pause.style.display = "block";
      });
      volumeBar.addEventListener("mousemove", (e) => {
        let barLength = parseFloat(
          getComputedStyle(volumeBar).width.replace("px", "")
        );
        let mousePosition = e.offsetX;
        volumePercentage = Math.ceil((mousePosition / barLength) * 10) / 10;
      });
      volumeBar.addEventListener("click", () => {
        myAudio.volume = volumePercentage;
        setVolume();
      });
      console.log(myAudio.readyState);
    } else {
      setTimeout(loadAudio, 100);
    }
  }
  loadAudio();
});
