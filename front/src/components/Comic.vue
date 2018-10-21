<template>
    <div class="mainScene">

        <svg id="comic-container" class="main">
            <!-- this is the draggable root -->

            <g id='scene'>
                <g id="dynamic"></g>
                <!-- <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <image xlink:href="https://imgix.ranker.com/user_node_img/104/2075534/original/spider-man-comic-book-characters-photo-u17?w=650&q=50&fm=jpg&fit=crop&crop=faces" x="0" y="0" height="300px" width="400px" />
                </svg>
                <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <image xlink:href="https://i.pinimg.com/originals/38/02/d7/3802d7dc056f424edcda561616b1b6e9.jpg" x="400" y="0" height="300px" width="400px" />
                </svg>
                <svg id='lol' width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <image xlink:href="https://img.purch.com/o/aHR0cDovL3d3dy5uZXdzYXJhbWEuY29tL2ltYWdlcy9pLzAwMC8xOTcvMDQ0L2kwMi9hY3Rpb25fOTc4X2Zyb250LmpwZw==" x="800" y="0" height="300px" width="400px" />
                </svg> -->

                <svg v-for="(comic, ind) in comics" :key="ind" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <image :xlink:href="comic" :x="xCoord(ind)" :y="(Math.floor(ind / 3) * 400) + 10" height="280px" width="380px" />
                </svg>
                <!-- <svg width="400" height="110">
                    <rect width="300" height="100" style="fill:rgb(0,0,255); stroke-width:3; stroke:rgb(0,0,0)" />
                </svg> -->
                <text x="70" y="35" class="small">My</text>
            </g>
        </svg>

    </div>
</template>

<script>
import Vue from 'vue';
import SVG from 'svg.js';
import panzoom from 'panzoom';
import db from '../init.js';
import cloudinary from 'cloudinary';
import axios from 'axios';
export default {
    name: 'HelloWorld',
    data() {
        return {
            comics: [],
            draw: null,
            faceMap: 'http://40.117.32.177:8080/face?text=',
            currentImageIndex: 0,
        };
    },
    props: {
        msg: String,
    },
    methods: {
        xCoord(ind) {
            this.currentImageIndex = ind;
            console.log('Index is', ind);
            this.createBorder(ind);
            return (ind % 3) * 400 + 10;
        },
        attachListener() {
            db.collection('users')
                .doc('test2')
                .onSnapshot(async doc => {
                    //this.comics.push(doc.data().comics.slice(-1)[0]);
                    // let faceMappning = await axios.get(
                    //     `${this.faceMap}${doc.data().comics.slice(-1)[0].url}`
                    // );
                    //console.log('Face map result', faceMappning.data);
                    this.comicify(doc.data().comics.slice(-1)[0].url);
                    console.log('Current data: ', doc.data());
                });
        },
        comicify(imgUrl) {
            cloudinary.uploader.upload(
                imgUrl,
                result => {
                    console.log('Res', result);
                    this.comics.push(result.url);
                    this.createTextbox(this.currentImageIndex);
                },
                {
                    public_id: 'sample_remote',
                    effect: 'cartoonify:50:80',
                }
            );
        },
        createBorder(ind) {
            this.draw.rect(400, 300).attr({
                fill: '#000000',
                x: (ind % 3) * 400,
                y: Math.floor(ind / 3) * 400,
            });

            this.draw.rect(390, 290).attr({
                fill: '#ffffff',
                x: (ind % 3) * 400 + 5,
                y: Math.floor(ind / 3) * 400 + 5,
            });
        },
        createTextbox(ind) {
            this.draw.rect(250, 50).attr({
                fill: '#ffffff',
                stroke: '#000000',
                'stroke-width': 6,
                x: (ind % 3) * 400 + 150,
                y: Math.floor(ind / 3) * 400 + 200,
            });
        },
    },
    mounted() {
        db.collection('comic')
            .doc('one')
            .set({ fakedata: 'test' })
            .then(() => console.log('Done'));

        panzoom(document.getElementById('scene')).zoomAbs(
            screen.width / 2 + 200, // initial x position
            screen.height / 2 - 300, // initial y position
            0.5 // initial zoom
        );
        document.body.addEventListener(
            'panstart',
            function(e) {
                console.log('pan start', e);
            },
            true
        );

        document.body.addEventListener(
            'panend',
            function(e) {
                console.log('pan end', e);
            },
            true
        );

        this.draw = SVG('dynamic').size(2000, 2000);
        this.draw.rect(1200, 1600).attr({ fill: '#F5F5F5' });

        var event = new MouseEvent('dblclick', {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        cloudinary.config({
            cloud_name: 'dbjk4bwcc',
            api_key: '725375149814274',
            api_secret: 'TOAstsCVs27sGfTvXygtVZxn-5g',
        });
        //document.getElementById('lol').dispatchEvent(event);

        this.attachListener();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}

#comic-container {
    width: 2000px;
    height: 2400px;
    outline: none;
}

a:active,
a:focus {
    outline: 0;
    border: none;
    -moz-outline-style: none;
}

@font-face {
    font-family: 'SequentialistBB';
    src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/306FA6_1_0.woff2') format('woff2'),
        url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/306FA6_0_0.woff') format('woff');
    font-style: normal;
    font-weight: 400;
}
@font-face {
    font-family: 'SequentialistBB';
    src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/306FA6_0_0.woff2') format('woff2'),
        url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/306FA6_0_0.woff') format('woff');
    font-style: italic;
    font-weight: 400;
}
* {
    box-sizing: border-box;
}

body {
    font-family: SequentialistBB, cursive;
    font-size: 2.5vw;
    margin: 0;
}

/* section {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-content: center;
} */

/* section {
    padding: 3rem;
} */

blockquote.bubble {
    background-position: center;
    background-repeat: no-repeat !important;
    background-size: 50px 50px;
    margin: 0 auto;
    text-align: center;
    height: 0;
    box-sizing: content-box;
    line-height: 1;
}

blockquote.speech {
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/speech-bubble.svg);
    width: 10%;
    padding-top: 6%;
    padding-bottom: 20%;
}

blockquote.whisper {
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/whisper.svg);
    width: 25%;
    font-size: 2vw;
    color: #ccc;
    font-style: italic;
    padding: 6% 5% 15%;
}

blockquote.electric {
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/electric.svg);
    width: 25%;
    font-size: 2.4vw;
    font-style: italic;
    padding: 4% 6% 12% 0%;
}

blockquote.electric span {
    display: block;
    font-size: 3vw;
    font-weight: bold;
}
</style>
