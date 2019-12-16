export const mutations = {
    getMovieIngData(state,result) {

        //判断是否第一次请求数据
        if (state.isInit) {
            state.isInit = false;
        }

        state.movieIngData = result.concat();
        console.log(state.movieIngData)

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
        console.log(state.movieFutureData)

        //截取数量
        state.showMovieFutureData.data = state.movieFutureData.slice(state.showMovieFutureData.start,state.showMovieFutureData.end);
        state.showMovieFutureData.start = state.showMovieFutureData.end;
        state.showMovieFutureData.end +=10;
    },


}