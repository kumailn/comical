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
                    <image :xlink:href="comic" :x="xCoord(ind)" :y="Math.floor(ind / 3) * 400" height="300px" width="400px" />
                </svg>
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
export default {
    name: 'HelloWorld',
    data() {
        return {
            comics: [],
        };
    },
    props: {
        msg: String,
    },
    methods: {
        xCoord(ind) {
            console.log('Index is', ind);
            return (ind % 3) * 400;
        },
        attachListener() {
            db.collection('users')
                .doc('test')
                .onSnapshot(doc => {
                    //this.comics.push(doc.data().comics.slice(-1)[0]);
                    this.comicify(doc.data().comics.slice(-1)[0]);
                    console.log('Current data: ', doc.data());
                });
        },
        comicify(imgUrl) {
            cloudinary.uploader.upload(
                imgUrl,
                result => {
                    console.log('Res', result.url);
                    this.comics.push(result.url);
                },
                {
                    public_id: 'sample_remote',
                    effect: 'cartoonify:50:bw',
                }
            );
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

        var draw = SVG('dynamic').size(2000, 2000);
        var rect = draw.rect(1200, 1600).attr({ fill: '#F5F5F5' });

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
</style>
