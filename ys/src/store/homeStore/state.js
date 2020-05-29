export const state = {
    value: '',

    baseUrl: "https://douban.uieee.com/v2/movie",

    // 正在上映的电影所有数据
    movieIngData: [],

    //截取展示电影数据
    showMovieData: {
        start: 0,
        end: 10,
        data: []
    },

    movieFutureData: [],
    
    showMovieFutureData: {
        start: 0,
        end: 10,
        data: []
    },

    //是否存在换一换数据
  isHasData: true,

    //是否初始化
    isInit: true
}