<template>
  <div class="movie">
    <van-tabs active="a" color="#EB48AD" title-active-color="#EB48AD" :border="false">
      <van-tab title="正在热映" name="a">
        <div class="hoting-box" ref="moviebox">
          <div class="hoting clearfix" v-for="(item,index) in movieData.data.subjects" :key="index" ref="movieitem" :id="item.id"
            @click="viewMovieDetail({name: 'movieDetails', params: {id: item.id}})">
            <div class="fl post">
              <img class="auto-img" :src="item.images.medium" alt="">
            </div>
            <div class="fl movie-info">
              <div class="info clearfix">
                <div class="movie-name one-text fl">{{item.title}}</div>
                <div class="score fl">{{item.rating.average}}<span>分</span></div>
              </div>
              <div class="date">{{item.mainland_pubdate}}<span>上映</span></div>
              <div class="movie-type one-text">{{item.genresInfo}}</div>
              <div class="movie-actor one-text">{{item.avatarsInfo}}</div>
              <div class="movie-year">{{item.durations[0]}}</div>
            </div>
            <div class="fr tikets">
              <van-button color="#EB48AD" round size="mini" type="info">购票</van-button>
            </div>
          </div>
          <p class="tip-text" v-if="!isHas">没有更多数据可加载了</p>
        </div>
      </van-tab>
      <van-tab title="即将上映" name="b">即将上映</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("movieModule");
export default {
  name: 'movie',

  data() {
    return {
      activeName: 'a'
    };
  },

  computed: {
    ...mapState(['movieData', 'params', 'isHas', 'isInit'])
  },

  methods: {
    getMovieData() {

      let self =this;

      this.$toast.loading({
        duration: 0,
        message: "加载中..."
      });

      //请求数据
      this.axios({
        //请求类型
        method: "GET",

        //请求地址
        url: "https://douban.uieee.com/v2/movie/in_theaters",

        //请求参数
        params: this.params
      })
        .then(result => {
          // console.log("result.data.subjects ==> ", result.data.subjects);

          result.data.subjects.forEach(v => {
            //合并电影类型
            v.genresInfo = v.genres.join(" / ");

            //合并演员
            v.avatarsInfo = "";
            v.casts.forEach(item => {
              v.avatarsInfo += item.name + " / ";
            });

            v.avatarsInfo = v.avatarsInfo.slice(0, -3);
          });

          if (this.isInit) {
            let movieBox = this.$refs.moviebox;

            let movieBoxHeight = movieBox.clientHeight;
            // console.log('movieBoxHeight ==> ', movieBoxHeight);
            let timers = [];

            movieBox.onscroll = function () {

              if (!self.isHas) {
                // console.log('没更多数据可加载');
                return;
              }

              let that = this;

              let timer = setTimeout(function () {

                for (let i = 1; i < timers.length; i++) {
                  clearTimeout(timers[i]);
                }

                let movieItem = self.$refs.movieitem[self.$refs.movieitem.length - 1];
                // console.log('movieItem ==> ', movieItem);

                let movieItemMarginBottom = parseFloat(getComputedStyle(movieItem).marginBottom);
                // console.log('movieItemMarginBottom ==> ', movieItemMarginBottom);

                let movieItemHeight = movieItem.clientHeight;
                // console.log('movieItemHeight ==> ', movieItemHeight);

                let movieItemOffsetTop = movieItem.offsetTop;
  

                if (that.scrollTop + movieBoxHeight - movieItemHeight - movieItemMarginBottom + 50 >= movieItemOffsetTop) {
                  // console.log('发起数据请求');
                  //发起数据请求
                  self.getMovieData();
                }

                timers = [];


              }, 1000)

              timers.push(timer);
            }
            
          }

          this.$store.commit("movieModule/changeMovieData", result);

          this.$toast.clear();
          
        })
        .catch(err => {
          // console.log("err ==> ", err);
          this.$toast.clear();
        });
    },
    //查看电影详情
    viewMovieDetail(o) {
      this.$router.push(o);
    },

  },

  created() {

    this.getMovieData();
  }

};
</script>

<style lang="less" scoped>
  .movie{
    padding: 0 10px;
    position: fixed;
    left: 0;
    right: 0;
    top: 40px;
    bottom: 50px;
    .van-tabs{
      position: static;
    }
    .hoting-box{
      padding: 0 10px;
      margin-top: 10px;
      position: absolute;
      left: 0;
      right: 0;
      top: 44px;
      bottom: 0;
      overflow-y: auto;
    }
    .tip-text{
    color: #aaa;
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
    background-color: #fff;
  }
    .hoting{
      border-bottom: 5px solid rgb(245, 238, 238);
    }
    .movie-info{
      width: calc(~"100% - 80px - 50px - 20px");
      margin-left: 20px;
      font-size: 14px;
      
    }
    .info{
      margin-bottom: 5px;
    }
    .score{
      color: #EB48AD;
      margin-left: 20px;
      font-size: 16px;
      margin-top: 1px;
    }
    .movie-name{
      max-width: 70px;
      color: #323233;
      margin-top: 2px;
    }
    .date{
      font-size: 16px;
      color: rgb(18, 133, 233);
      margin-bottom: 5px;
    }
    .movie-type{
      font-size: 14px;
      color: #323233;
      margin-bottom: 5px;
    }
    .movie-actor{
      font-size: 14px;
      color: #323233;
      margin-bottom: 3px;
    }
    .movie-year{
      font-size: 16px;
      color: rgb(216, 34, 89);
      
    }
    .tikets{
      margin-top: 95px;
    }
    .post{
      width: 80px;
      height: 120px;
    }
  }
</style>