<template>
  <div class="movie">
    <div>
      <van-nav-bar title="我的收藏" left-text="返回" left-arrow @click-left="back" />
    </div>
    <div>
      <div class="hoting-box" ref="moviebox">
        <div
          class="hoting clearfix"
          v-for="(item,index) in currentLikeMovieData"
          :key="index"
          ref="movieitem"
          :id="item.id"
          @click="viewMovieDetail({name: 'movieDetails', params: {id: item.id}})"
        >
          <div class="fl post">
            <img class="auto-img" :src="item.images.medium" alt />
          </div>
          <div class="fl movie-info">
            <div class="info clearfix">
              <div class="movie-name one-text fl">{{item.title}}</div>
              <div class="score fl">
                {{item.rating.average}}
                <span>分</span>
              </div>
            </div>
            <div class="date">
              {{item.mainland_pubdate}}
              <span>上映</span>
            </div>
            <div class="movie-type one-text">{{item.genresInfo}}</div>
            <div class="movie-actor one-text">{{item.avatarsInfo}}</div>
            <div class="movie-year">{{item.durations[0]}}</div>
          </div>
          <div class="fr collection">
            <span class="fr collection" @click.stop="deleteLikeMovie(item.id)">
              <van-icon name="delete" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("likeMovieModule");

export default {
  name: "likeMovie",

  computed: {
    ...mapState(["currentLikeMovieData"])
  },

  methods: {
    //返回上一级
    back() {
      this.$router.go(-1);
    },

    //查看电影详情
    viewMovieDetail(o) {
      this.$router.push(o);
    },

    //删除我的收藏电影
    deleteLikeMovie(id) {
      for (let i = 0; i < this.currentLikeMovieData.length; i++) {
        if (id == this.currentLikeMovieData[i].id) {
          this.$store
            .dispatch("likeMovieModule/deleteLikeMovie", i)
            .then(() => {
              let userStatus = JSON.parse(localStorage.getItem("user"));

              //获取所有用户电影数据
              let likeMovieData = JSON.parse(
                localStorage.getItem("likeMovieData")
              );

              likeMovieData[userStatus.username] = this.currentLikeMovieData;

              localStorage.setItem(
                "likeMovieData",
                JSON.stringify(likeMovieData)
              );
            });
          break;
        }
      }
    }
  },

  created() {
    //验证登录
    let userStatus = localStorage.getItem("user");

    if (userStatus) {
      let userInfo = JSON.parse(userStatus);

      //如果登录
      if (userInfo.isLogin) {
        //开启加载提示
        this.$toast.loading({
          duration: 0,
          message: "加载中..."
        });

        //获取所有用户收藏的电影数据
        let likeMovieData = localStorage.getItem("likeMovieData");

        likeMovieData = likeMovieData ? JSON.parse(likeMovieData) : {};

        //获取当前用户收藏的电影数据
        let currentLikeMovieData = likeMovieData[userInfo.username];

        currentLikeMovieData = currentLikeMovieData ? currentLikeMovieData : [];

        //生成页面数据
        this.$store.commit(
          "likeMovieModule/getCurrentLikeMovieData",
          currentLikeMovieData
        );

        this.$toast.clear();
      } else {
        //如果未登录
        this.$router.push({ name: "login" });
      }
    } else {
      //未登录
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="less" scoped>
.movie {

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
    
  .hoting {
    border-bottom: 5px solid rgb(245, 238, 238);
  }
  .movie-info {
    width: calc(~"100% - 80px - 50px - 20px");
    margin-left: 20px;
    font-size: 14px;
  }
  .info {
    margin-bottom: 5px;
  }
  .score {
    color: #eb48ad;
    margin-left: 20px;
    font-size: 16px;
    margin-top: 1px;
  }
  .movie-name {
    max-width: 70px;
    color: #323233;
    margin-top: 2px;
  }
  .date {
    font-size: 16px;
    color: rgb(18, 133, 233);
    margin-bottom: 5px;
  }
  .movie-type {
    font-size: 14px;
    color: #323233;
    margin-bottom: 5px;
  }
  .movie-actor {
    font-size: 14px;
    color: #323233;
    margin-bottom: 3px;
  }
  .movie-year {
    font-size: 16px;
    color: rgb(216, 34, 89);
  }
  .post {
    width: 80px;
    height: 120px;
  }
  .collection {
    font-size: 16px;
  }
}
</style>