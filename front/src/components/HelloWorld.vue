<template>
  <div class="mainScene">
    <svg class="main" style="width: 100%; height: 1000px">
      <!-- this is the draggable root -->
      <g id='scene'>
        <g id="dynamic"></g>
        <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <image xlink:href="https://imgix.ranker.com/user_node_img/104/2075534/original/spider-man-comic-book-characters-photo-u17?w=650&q=50&fm=jpg&fit=crop&crop=faces" x="0" y="0" height="300px" width="400px" />
        </svg>
        <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <image xlink:href="https://i.pinimg.com/originals/38/02/d7/3802d7dc056f424edcda561616b1b6e9.jpg" x="400" y="0" height="300px" width="400px" />
        </svg>
        <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <image xlink:href="https://img.purch.com/o/aHR0cDovL3d3dy5uZXdzYXJhbWEuY29tL2ltYWdlcy9pLzAwMC8xOTcvMDQ0L2kwMi9hY3Rpb25fOTc4X2Zyb250LmpwZw==" x="800" y="0" height="300px" width="400px" />
        </svg>
      </g>
    </svg>

  </div>
</template>

<script>
import SVG from 'svg.js';
import panzoom from 'panzoom';
import db from '../init.js';
export default {
    name: 'HelloWorld',
    props: {
        msg: String,
    },
    mounted() {
        db.collection('comic')
            .doc('one')
            .set({ fakedata: 'test' })
            .then(() => console.log('Done'));
        panzoom(document.getElementById('scene'));
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
a {
    color: #42b983;
}

/* blockquote.bubble {
    background: url(speech-bubble.svg);
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 25%;
    text-align: center;
    height: 0;
    padding-top: 6%;
    padding-bottom: 20%;
    box-sizing: content-box;
    line-height: 1;
} */

a:active,
a:focus {
    outline: 0;
    border: none;
    -moz-outline-style: none;
}
</style>
