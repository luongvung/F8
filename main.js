const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
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
        },

        {
            name: 'Rước Nàng',
            singer: 'BIN',
            path: './music/RuocNangAirRemix-BIN-8053843.mp3',
            image: './img/Rước Nàng.jpg'
        },

        {
            name: 'Rước Nàng',
            singer: 'BIN',
            path: './music/RuocNangAirRemix-BIN-8053843.mp3',
            image: './img/Rước Nàng.jpg'
        },

        {
            name: 'Rước Nàng',
            singer: 'BIN',
            path: './music/RuocNangAirRemix-BIN-8053843.mp3',
            image: './img/Rước Nàng.jpg'
        },

        {
            name: 'Rước Nàng',
            singer: 'BIN',
            path: './music/RuocNangAirRemix-BIN-8053843.mp3',
            image: './img/Rước Nàng.jpg'
        }

    ],

    render: function(){
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
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
        console.log([htmls]);
        $('.playlist').innerHTML = htmls.join('');
    },

    handleEvents: function(){
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
    },

    start: function(){
        this.handleEvents();

        this.render();
    }
}

app.start();