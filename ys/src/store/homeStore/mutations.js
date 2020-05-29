export const mutations = {
    getMovieIngData(state,result) {

        //判断是否第一次请求数据
        if (state.isInit) {
            state.isInit = false;
        }

        state.movieIngData = result.concat();
        // console.log(state.movieIngData)

        //截取数量
        state.showMovieData.data = state.movieIngData.slice(state.showMovieData.start,state.showMovieData.end);
        state.showMovieData.start = state.showMovieData.end;
        state.showMovieData.end +=10;
    },
    getMovieFutureData(state,result) {

        //判断是否第一次请求数据
        if (state.isInit) {
            state.isInit = false;
        }

        state.movieFutureData = result.concat();
        // console.log(state.movieFutureData)

        //截取数量
        state.showMovieFutureData.data = state.movieFutureData.slice(state.showMovieFutureData.start,state.showMovieFutureData.end);
        state.showMovieFutureData.start = state.showMovieFutureData.end;
        state.showMovieFutureData.end +=10;
    },

    // 换一换
  toggleNewMovieData(state) {
    //截取数据
    let data = state.movieIngData.slice(state.showMovieData.start, state.showMovieData.end);

    //获取截取数据数量
    let count = data.length;

    //如果不存在数据
    if (count == 0) {

      state.isHasData = false;

    } else if (count < 10) {
      //如果不足8条数据，需要将之前的数据移除前面count条数据,再往后面加入count条数据
      state.showMovieData.data.splice(0, count);
      state.showMovieData.data.push(...data);
      state.isHasData = false;

    } else {
      state.showMovieData.data = data;
    }

    
  }


}