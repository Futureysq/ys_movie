export const mutations = {
  getMovieDetailsData(state, data) {
    state.movieDetailsData = data;
    // console.log('state.movieDetailsData ==> ', state.movieDetailsData);
    
  },

  //修改宽度
  changeW(state, w) {
    state.movieDetailsData.w = w;
  },

  // 修改行数
  changeDisplay(state) {
    state.display = state.display == 'block' ? '-webkit-box' : 'block';
  },

  //重置state
  resetState(state) {
    state.movieDetailsData = {
      images: {},
      durations: [],
      rating: {},
      casts: [],
      countries: [],
      average: [],
    };

    state.likeActive = false;
  },

  changelikeActive(state, isActive) {
    state.likeActive = isActive;
  }
};