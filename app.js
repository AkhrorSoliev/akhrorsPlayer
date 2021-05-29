const musicPlayer = document.getElementById('music-container')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const title = document.getElementById('title')
const cover = document.getElementById('cover')
const body = document.querySelector('body')

// song titles

const songs = [
  'Escape',
  'Rauf & Faik - колыбельная',
  'Rihanna - Dancing In the Dark',
  'Ring My bells',
]

// keep track of song

let songIndex = 0

// Initially load song details into DOM

loadSong(songs[songIndex])

// Update song details

function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}

// Play Song

function playSong() {
  musicPlayer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
  loder()
}

// Posue Song

function pouseSong() {
  musicPlayer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

// Previous song
function prevSong() {
  songIndex--

  if (songIndex < 0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])

  playSong()
  loder()
}

// Next Song

function nextSong() {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])

  playSong()
  loder()
}

// eventListeners

playBtn.addEventListener('click', () => {
  const isPlaying = musicPlayer.classList.contains('play')

  if (isPlaying) {
    pouseSong()
  } else {
    playSong()
  }
})

// Update progress bar

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

// setProgress

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

// change song

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// time song update

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)

function loder() {
  const values = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ]
  const mixer = () => {
    let adder = ''
    for (let i = 0; i < 6; i++) {
      let random = Math.round(Math.random() * 15)
      let valueRandom = values[random]
      adder += valueRandom
    }
    return adder
  }

  const mixer1 = mixer()
  const mixer2 = mixer()
  const randomDeg = Math.floor(Math.random() * 361)
  const linearGrad = `linear-gradient(${randomDeg}deg, #${mixer1} , #${mixer2})`

  body.style.background = linearGrad
}

loder()
