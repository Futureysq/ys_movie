export const actions = {

    //获取电影数据
    // action 也有一个固有参数 context，但是 context 是 state 的父级，包含 state、getters
    getMovieIngData(context, result) {
      //提交mutations
      context.commit('getMovieIngData', result);
    },

    //即将上映
    getMovieFutureData(context, result) {
      //提交mutations
      context.commit('getMovieFutureData', result);
    }
  
  }