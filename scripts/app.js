const songsList = document.querySelectorAll('.songs-list .song')
for (let i = 0; i < songsList.length; i++) {
    const audio = songsList[i].querySelector('audio')
    const pause = songsList[i].querySelector('.pause')
    const play = songsList[i].querySelector('.play')
    const playEffect = songsList[i].querySelector('.playing-effect')
    pause.addEventListener('click', () => {
        audio.pause()
        pause.style.display = 'none'
        play.style.display = 'flex'
        playEffect.classList.remove('rotate-animation')
    })
    play.addEventListener('click', () => {
        const allAudio = document.querySelectorAll('.songs-list audio')
        for (let j = 0; j < allAudio.length; j++) {
            allAudio[j].currentTime = 0
            allAudio[j].pause()
            songsList[j].querySelector('.pause').style.display = 'none'
            songsList[j].querySelector('.play').style.display = 'flex'
            songsList[j].querySelector('.playing-effect').classList.remove('rotate-animation')
        }
        audio.play()
        play.style.display = 'none'
        pause.style.display = 'flex'
        playEffect.classList.add('rotate-animation')

    })
}

const toogleBtn = document.querySelector('.dropdown-btn')
const navLinks = document.querySelector('.nav-links')
toogleBtn.addEventListener('click', () => {
    if (navLinks.style.display == 'flex') {
        navLinks.style.display = 'none'
    } else {
        navLinks.style.display = 'flex'
    }
})

const searchBtn = document.querySelector('.nav-search-icon')
const staticSearch = document.querySelector('.static-search')
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        if (staticSearch.style.display == 'flex') {
            staticSearch.style.display = 'none'
        } else {
            staticSearch.style.display = 'flex'
        }
    })
}