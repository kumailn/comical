import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showBox: false,
    currentStory: '',
    stories: [],
    comics: [],
    faces: [],
    faceMap: 'http://40.117.32.177:8080/face?text=',
    currentImageIndex: 0,
    originalImageSizes: [],
    currentImageSize: {},
  },
  mutations: {

  },
  actions: {

  },
});
