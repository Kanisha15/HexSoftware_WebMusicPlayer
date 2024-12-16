const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');
const trackNameElem = document.getElementById('track-name');
const trackArtistElem = document.getElementById('track-artist');
const currentTrackElem = document.getElementById('current-track');
const totalTracksElem = document.getElementById('total-tracks');


const tracks = [
    { name: 'mitawa', artist: 'Shankar Mahadevan , Shafqat Amanat Ali', src: 'mitawa.mp3', cover: 'mitawaa1.jpg', duration: '6:23' },
    { name: 'Angaaronn', artist: 'Shreya ghoshal', src: 'Angaaron.mp3', cover: 'angaaron.jpg', duration: '4:19' },
    { name: 'Kesariya ', artist: 'Arjit singh', src: 'Kesariya.mp3', cover: 'Kesariya.jpg', duration: '4:28' },
    { name: 'Tum Se', artist: 'Sachin-Jigar ,Raghav Chaitanya ,varun jain', src: 'Tum Se.mp3', cover: 'Tum Se.png', duration: '4:24' },
    { name: 'Tere Hawaale ', artist: 'Pritam, Arijit singh, Shilpa rao', src: 'Tere Hawaale.mp3', cover: 'Tere Hawaale.jpg', duration: '5:46' },
  ];
  

let currentTrack = 0;
let isPlaying = false;
const audio = new Audio(tracks[currentTrack].src);

const loadTrack = (index) => {
  const track = tracks[index];
  audio.src = track.src;
  trackNameElem.textContent = track.name;
  trackArtistElem.textContent = track.artist;
  document.querySelector('.cover img').src = track.cover;
  currentTrackElem.textContent = index + 1;
};

const playPause = () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = '▶';
  } else {
    audio.play();
    playPauseBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
};

const nextTrack = () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) audio.play();
};

const prevTrack = () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) audio.play();
};

audio.addEventListener('timeupdate', () => {
  const current = audio.currentTime;
  const duration = audio.duration || 0;
  progressBar.value = (current / duration) * 100 || 0;

  currentTimeElem.textContent = formatTime(current);
  durationElem.textContent = formatTime(duration);
});

progressBar.addEventListener('input', (e) => {
  audio.currentTime = (e.target.value / 100) * audio.duration;
});

volumeBar.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
};

playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

loadTrack(currentTrack);
totalTracksElem.textContent = tracks.length;

const songListElem = document.getElementById('song-list');


const populateSongList = () => {
  tracks.forEach((track, index) => {
    const songItem = document.createElement('li');
    songItem.classList.add('song-item');
    songItem.setAttribute('data-index', index); 

    songItem.innerHTML = `
      <img src="${track.cover}" alt="${track.name}" class="song-cover">
      <div class="song-details">
        <span class="song-title">${track.name}</span>
        <span class="song-artist">${track.artist}</span>
      </div>
      <span class="song-duration">${track.duration}</span>
    `;

    songListElem.appendChild(songItem);
  });
};

songListElem.addEventListener('click', (e) => {
  const songItem = e.target.closest('.song-item');
  if (songItem) {
    const index = parseInt(songItem.dataset.index); 
    currentTrack = index;
    loadTrack(currentTrack); 
    if (isPlaying) audio.play(); 
  }
});

populateSongList();


