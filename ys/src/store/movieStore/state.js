export const state = {

  params: {
    //开始截取位置
    start: 0,

    //数据数量
    count: 10,

    //城市
    city: '广州'
  },

  //是否初始化数据
  isInit: true,
  
  //是否存在可加载数据
  isHas: true,

  movieData: {
    data: {
      subjects: []
    }
  }
};