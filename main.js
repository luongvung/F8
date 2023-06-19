const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const progress = $('#progress');
const progressCurrent= $('.progress-current');
const progressDuration = $('.progress-duration');

const playBtn = $('.btn-toggle-play');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Là Anh',
            singer: 'Phạm Linh',
            path: './music/LaAnh-PhamLichBMZ-8811329.mp3',
            image: './img/Là Anh.jpg'
        },

        {
            name: 'Lụy Tình',
            singer: 'Trung Dio',
            path: './music/LuyTinhAirRemix-TrungDioGGTu-8564493.mp3',
            image: './img/Lụy Tình.jpg'
        },

        {
            name: 'Trách Duyên',
            singer: 'Đỗ Thanh Duy',
            path: './music/TrachDuyenTrachPhan-DoThanhDuy.mp3',
            image: './img/Trách Duyên.jpg'
        },
        
        {
            name: 'Vô Tư',
            singer: 'Anh Quân',
            path: './music/VoTuRemix-AnhQuanIdol-8065871.mp3',
            image: './img/Vô Tư.jpg'
        },

        {
            name: 'Rước Nàng',
            singer: 'BIN',
            path: './music/RuocNangAirRemix-BIN-8053843.mp3',
            image: './img/Rước Nàng.jpg'
        }
    ],

    render: function(){
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === app.currentIndex ? 'active' : '' }" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>
            `
        });
        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvents: function(){
        const cdWidth = cd.offsetWidth;

        // CD quay
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity,
        });
        cdThumbAnimate.pause();
        
        // Phóng to thu nhỏ CD
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Ấn play
        playBtn.onclick = function(){
            if(app.isPlaying){
                audio.pause();   
            } else {
                audio.play(); 
            }
        }

        // Khi song dc play 
        audio.onplay = function(){
            app.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.cancel()
            cdThumbAnimate.play();
            
        }

        // Khi song dc pause
        audio.onpause = function(){
            app.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;

                var current = audio.currentTime;
                var minutes = Math.floor(current / 60);
                var seconds = Math.floor(current % 60);
                var formattedDuration = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
                progressCurrent.innerText = formattedDuration;
            }
            
        }

        // Tua song 
        progress.oninput = function(e){
            const seekTime = audio.duration * e.target.value / 100;
            audio.currentTime = seekTime;
        }

        // Khi next song
        nextBtn.onclick = function(){
            if(app.isRandom){
                app.playRandomSong();
            } else {
                app.nextSong();
            }
            audio.play();
            app.render();
        }

        // Khi prev song
        prevBtn.onclick = function(){
            if(app.isRandom){
                app.playRandomSong();
            } else {
                app.prevSong();
            }
            audio.play();
            app.render();

        }

        // Khi bật random 
        randomBtn.onclick = function(e){
            if(app.isRandom){
                randomBtn.classList.remove('active')
                app.isRandom = false;
            } else {
                randomBtn.classList.add('active')
                app.isRandom = true;
            }
        }

        // Phát lại
        repeatBtn.onclick = function(){
            if(app.isRandom){
                repeatBtn.classList.remove('active')
                app.isRepeat = false;
            } else {
                repeatBtn.classList.add('active')
                app.isRepeat = true;
            }
        }
        
        // Next khi hết bài 
        audio.onended = function(){
            if(app.isRepeat){
                audio.play();
            } else{
                nextBtn.click();
            }
        }

        // Lắng nghe hành vi khi click vào playlist
        playlist.onclick = function(e){
            if(e.target.closest('.song:not(.active)') || e.target.closest('.option')){
                // Khi click vào song
                
            }
        }
    },

    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

        audio.addEventListener("loadedmetadata", function() {
            var duration = audio.duration;
            var minutes = Math.floor(duration / 60);
            var seconds = Math.floor(duration % 60);
            var formattedDuration = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
            progressDuration.innerText = formattedDuration
        });
    },

    nextSong: function(){
      this.currentIndex++;
      if(this.currentIndex >= this.songs.length){
        this.currentIndex = 0;
      }  
      this.loadCurrentSong();
    },

    prevSong: function(){
        this.currentIndex--;
      if(this.currentIndex < 0){
        this.currentIndex = this.songs.length - 1;
      }  
      this.loadCurrentSong();
    },

    playRandomSong: function(){
        let newIndex;
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start: function(){
        // Định nghĩa thuộc tính cho Obj
        this.defineProperties()

        // Lắng nghe, xử lý sự kiện
        this.handleEvents();

        // Tải xuống thông tin bài hát đầu tiên 
        this.loadCurrentSong();

        // Hiển thị playlist
        this.render();
    }
}

app.start();