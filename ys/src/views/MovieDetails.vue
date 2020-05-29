<template>
  <div class="movieDetails">
    <div class="nav">
      <van-nav-bar title="电影详情" left-text="返回" left-arrow :border="noactive" @click-left="back" />
    </div>
    <div class="movie-post">
      <img class="auto-img" :src="movieDetailsData.images.large" alt />
      <div class="info clearfix">
        <div class="number fl">
          <div class="people">评论人数</div>
          <div class="people-sum">
            <span>{{movieDetailsData.comments}}</span>
          </div>
        </div>
        <div class="pingfen fl">
          <div class>电影评分</div>
          <div class="rank">{{movieDetailsData.rating.average}}</div>
        </div>
        <div class="play-sum fr">
          <div>播放量</div>
          <div class="play-count">{{movieDetailsData.playcount}}</div>
        </div>
      </div>
    </div>
    <div class="movie-info clearfix">
      <div class="img fl">
        <img class="auto-img" :src="movieDetailsData.images.medium" alt />
      </div>
      <div class="info1 fl">
        <div class="name one-text">{{movieDetailsData.title}}</div>
        <div class="type-time">
          <span class="type">{{movieDetailsData.genresInfo}}</span>
          <span class="time">{{movieDetailsData.durations[0]}}</span>
        </div>
        <div class="date">
          上映日期：{{movieDetailsData.pubdate}}
          <span>({{movieDetailsData.countries[0]}})</span>
        </div>
      </div>
    </div>
    <div class="content">
      <van-tabs
        v-model="activeName"
        line-height="1px"
        color="#EB48AD"
        title-active-color="#EB48AD"
        :border="false"
        background="#060517"
      >
        <van-tab title="简介" name="a">{{movieDetailsData.summary}}</van-tab>
        <van-tab title="演员" name="b">
          <div class="yanyuan">
            <div
              class="yanyuan-box clearfix"
            >
              <div
                ref="yanyuan"
                class="yanyuan-item"
                v-for="(item, index) in movieDetailsData.casts"
                :key="index"
              >
                <div class="name-img">
                  <img class="auto-img" :src="item.avatars.small" alt />
                </div>
                <div class="name one-text">{{item.name}}</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="影评" name="c"></van-tab>
        <van-tab title="更多" name="d">内容 4</van-tab>
      </van-tabs>
    </div>
    <div class="footer clearfix">
      <div class="inner">
        <div class="shoucang fl">
          <van-icon
            @click="likeMovie(movieDetailsData)"
            class="collection"
            :class="{active: likeActive}"
            name="like-o"
            size="20px"
          />
        </div>
        <div class="fl">
          <button class="buyticket" @click="buyTick(movieDetailsData.id)">购票</button>
        </div>
        <div class="share fl">
          <van-icon name="share" color="#fff" size="20px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers(
  "movieDetailsModule"
);
export default {
  name: "movieDetails",
  data() {
    return {
      active: true,
      activeName: "a",
      tabActive: "home",
      noactive: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapState(["movieDetailsData", "display", "likeActive"])
  },

  methods: {
    ...mapMutations(["changeDisplay", "resetState"]),

    // 返回上一步
    back() {
      this.$router.go(-1);
    },

    //收藏电影
    likeMovie(item) {
      // console.log("item==>", item);
      //获取用户登录状态
      let userStatus = localStorage.getItem("user");

      if (userStatus) {
        userStatus = JSON.parse(userStatus);

        if (!userStatus.isLogin) {
          return this.$router.push({ name: "login" });
        }

        //获取用户收藏的电影
        let likeMovieData = localStorage.getItem("likeMovieData");
        likeMovieData = likeMovieData ? JSON.parse(likeMovieData) : {};

        //记录当前用户收藏的电影
        let currentLikeMovieData = likeMovieData[userStatus.username];

        if (!currentLikeMovieData) {
          likeMovieData[userStatus.username] = [];
        }

        //收藏电影之前，根据电影的id判断是否已经收藏过该电影
        for (let i = 0; i < likeMovieData[userStatus.username].length; i++) {
          if (likeMovieData[userStatus.username][i].id == item.id) {
            //提示用户
            this.$toast("你已经收藏过该电影");
            return;
          }
        }

        this.$store.commit("movieDetailsModule/changelikeActive", true);

        //将电影推进likeMovieData[userStatus.username]
        likeMovieData[userStatus.username].unshift(item);

        // console.log("likeMovieData==>", likeMovieData);

        localStorage.setItem("likeMovieData", JSON.stringify(likeMovieData));

        this.$toast.success("收藏成功");
      } else {
        this.$router.push({ name: "login" });
      }
    },

    //购票
    buyTick(id) {
      this.$router.push({ name: "buyMovieTick", query: { id } });
    }
  },

  created() {
    //开启加载提示
    this.$toast.loading({
      duration: 0,
      message: "加载中..."
    });

    //重置state
    this.resetState();

    //截取路由参数
    let id = this.$route.params.id;

    // console.log(id);

    this.axios({
      method: "GET",
      url: "https://douban.uieee.com/v2/movie/subject/" + id
    })
      .then(result => {
        // console.log(result.data.popular_comments[0].content);

        //将电影类型合并
        result.data.genresInfo = result.data.genres.join(" / ");

        // //超过1000, 不足10000，以k显示，超过10000以w显示，不足1000，直接显示
        let comments = result.data.comments_count;
        let playcount = result.data.ratings_count;

        result.data.comments =
          comments >= 10000
            ? (comments / 10000).toFixed(1) + "w"
            : comments >= 1000
            ? (comments / 1000).toFixed(1) + "k"
            : comments;
        result.data.playcount =
          playcount >= 10000
            ? (playcount / 10000).toFixed(1) + "w"
            : playcount >= 1000
            ? (playcount / 1000).toFixed(1) + "k"
            : playcount;

        this.$store
          .dispatch("movieDetailsModule/getMovieDetailsData", result.data)
          .then(() => {
            this.$toast.clear();
            // let yanyuanBoxWidth = this.$refs.yanyuan[0].clientWidth;
            // console.log("yanyuanBoxWidth==>", yanyuanBoxWidth);

            // this.$store.commit("movieDetailsModule/changeW", yanyuanBoxWidth);
            //根据用户登录状态，判断该电影是否被该用户收藏
            let userStatus = localStorage.getItem("user");
            let isActive = userStatus && JSON.parse(userStatus).isLogin;

            //如果用户登录
            if (isActive) {
              let username = JSON.parse(userStatus).username;

              //所有用户收藏的电影
              let likeMovieData = localStorage.getItem("likeMovieData");

              likeMovieData = likeMovieData ? JSON.parse(likeMovieData) : {};

              //获取当前用户收藏的电影
              let currentLikeMovieData = likeMovieData[username];

              currentLikeMovieData = currentLikeMovieData
                ? currentLikeMovieData
                : [];

              for (let i = 0; i < currentLikeMovieData.length; i++) {
                if (this.movieDetailsData.id == currentLikeMovieData[i].id) {
                  this.$store.commit(
                    "movieDetailsModule/changelikeActive",
                    true
                  );
                  return;
                }
              }

              this.$store.commit("movieDetailsModule/changelikeActive", false);
            } else {
              this.$store.commit("movieDetailsModule/changelikeActive", false);
            }
          });
      })
      .catch(err => {
        this.$toast.clear();
      });
  }
};
</script>

<style lang="less" scoped>
.movieDetails {
  background-color: #1f1f20;
  .footer {
    // width: calc(~"100% - 20px";
    padding: 0 10px;
    height: 66px;
    background-color: #14112c;

    .inner {
      width: 100%;
      margin: 0 auto;
      > div {
        width: 33.3%;
        text-align: center;
      }
      .shoucang {
        margin-top: 10.5px;
        .collection {
          color: #fff;
        }
        .collection.active {
          color: #fe0251;
        }
      }
      .buyticket {
        line-height: 32.5px;
        outline: none;
        width: 100%;
        font-size: 18px;
        background-color: #fe0251;
        border: none;
        border-radius: 5px;
        margin-top: 16.75px;
      }
      .share {
        margin-top: 10.5px;
      }
      .select {
        color: aliceblue;
      }
    }
  }
  .content {
    // height: 300px;
    padding: 10px 10px 10px 10px;
    color: rgb(224, 204, 204);
    background-color: #060517;
    .name-img {
      border-radius: 5px;
      overflow: hidden;
    }
    .name {
      margin: 10px 0;
      text-align: center;
      font-size: 12px;
      color: #222;
    }
    .yanyuan {
      overflow-x: auto;
      overflow-y: hidden;
      margin-top: 10px;
    }
    .yanyuan-box {
      width: 480px;
    }
    .yanyuan-item {
      float: left;
      width: 100px;
      padding: 10px;
    }
  }
  .movie-info {
    height: 90px;
    background-color: #060517;
    position: relative;
    .img {
      width: 80px;
      // height: 120px;
      padding-left: 10px;
      margin-top: -30px;
      overflow: hidden;

      > img {
        border-radius: 10px;
      }
    }
    .info1 {
      margin: 12px 12px 0px 20px;
      > div {
        margin-bottom: 5px;
      }
      .name {
        max-width: 250px;
        font-size: 16px;
        color: #fff;
      }
      .type {
        color: rgb(224, 204, 204);
      }
      .time {
        margin-left: 10px;
        color: rgb(224, 204, 204);
      }
      .date {
        color: rgb(224, 204, 204);
      }
    }
  }
  .info {
    width: calc(~"100% - 20px");
    position: absolute;
    // padding: 0 10px;
    left: 0;
    bottom: 60px;
    margin: 0 10px;
    z-index: 10;
  }
  .people {
    font-size: 12px;
    color: #fff;
  }
  .number {
    padding: 0 10px;
    font-size: 16px;
    color: #444;
    width: calc(~"30% - 20px");
    background-color: rgba(253, 255, 255, 0.2);
  }
  .people-sum {
    color: #fe0251;
  }
  .pingfen {
    width: 20%;
    overflow: hidden;
    text-align: center;
    color: #fff;
    background-color: rgba(211, 6, 74, 0.4);
  }
  .rank {
    font-size: 16px;
  }
  .play-sum {
    width: 47%;
    overflow: hidden;
    text-align: right;
    padding-right: 3%;
    color: rgb(247, 224, 224);
    background-color: rgba(227, 0, 140, 0.3);
  }
  .play-count {
    font-size: 16px;
    color: rgb(241, 236, 236);
  }
  .nav {
    width: 100%;
    position: fixed;
    height: 46px;
    line-height: 46px;
    z-index: 10;
    // background-color: rgba(255, 254, 254, 0.1);
  }

  .van-icon {
    line-height: 46px;
    margin-left: 5px;
  }
  .movie-post {
    height: 211.05px;
    overflow: hidden;
    position: relative;
    > img {
      opacity: 0.4;
    }
  }
  .footer {
    margin-top: 10px;
  }
}
</style>