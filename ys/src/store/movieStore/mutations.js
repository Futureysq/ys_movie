export const mutations = {

  changeMovieData(state, result) {
    if (state.isInit) {
      state.isInit = false;
    }
    if (result.data.subjects.length < 10) {
      state.isHas = false;
    }

    //将每次请求的数据推进state.movieData.data.subjects数组中
    state.movieData.data.subjects.push(...result.data.subjects);

    //每次请求完成后，修改请求数据的开始截取位置
    state.params.start += state.params.count;

    // console.log('state.movieData ==> ', state.movieData);
    // console.log('state.params ==> ', state.params);
  }

};