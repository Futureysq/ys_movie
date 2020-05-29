<template>
  <div class="home">
    <div class="nav clearfix">
      <div class="fl location">广州</div>
      <div class="fl search-input">
        <van-search
          class="fl"
          v-model="value"
          shape="round"
          background="#eb48ad"
          placeholder="请输入搜索关键词"
        />
      </div>
      <div class="fl search">
        <span class="fr search-icon">
          <van-icon name="clock-o" />
        </span>
      </div>
    </div>
    <div class="lunbo">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img
            class="auto-img"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575957621760&di=dd98785cdf1be88054cd70e0aee759cc&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-05-07%2F5aefe314c18af.jpg"
            alt
          />
        </van-swipe-item>
        <van-swipe-item>
          <img
            class="auto-img"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575957621760&di=dd98785cdf1be88054cd70e0aee759cc&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-05-07%2F5aefe314c18af.jpg"
            alt
          />
        </van-swipe-item>
        <van-swipe-item>
          <img
            class="auto-img"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575957621760&di=dd98785cdf1be88054cd70e0aee759cc&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-05-07%2F5aefe314c18af.jpg"
            alt
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="tab-list clearfix">
      <div class="list active" data-table="recommend1">
        <div class="icon-box">
          <div class="list-icon">
            <van-icon name="todo-list-o" size="20px" color="#fff" />
          </div>
        </div>
        <div class="list-text active">预告片</div>
      </div>
      <div class="list" data-table="recommend3">
        <div class="icon-box">
          <div class="list-icon">
            <van-icon name="points" size="20px" color="#fff" />
          </div>
        </div>
        <div class="list-text active">片单</div>
      </div>
      <div class="list" data-table="recommend4">
        <div class="icon-box">
          <div class="list-icon">
            <van-icon name="flower-o" size="20px" color="#fff" />
          </div>
        </div>
        <div class="list-text active">榜单</div>
      </div>
      <div class="list" data-table="recommend6">
        <div class="icon-box">
          <div class="list-icon">
            <van-icon name="video-o" size="20px" color="#fff" />
          </div>
        </div>
        <div class="list-text active">美剧</div>
      </div>
    </div>
    <div class="recommend">
      <div class="recommend-text clearfix">
        <span class="fl">正在热映</span>
        <van-icon class="arrow" name="arrow" />
        <div class="huan fr">
          <van-icon class="fl huan-icon" name="replay" @click="changeNewMovieData"/>
        </div>
      </div>
      <div class="recommend-list">
        <ul class="recommend-ul clearfix">
          <li
            class="recommend-li"
            v-for="(item,index) in showMovieData.data"
            :key="index"
            :id="item.id"
            @click="viewMovieDetail({name: 'movieDetails', params: {id: item.id}})"
          >
            <div class="list-img">
              <img class="auto-img" :src="item.images.small" alt />
              <div class="count">
                <span class="listen-count">{{item.rating.average}}</span>
              </div>
            </div>
            <div>
              <span class="songs-text two-text">{{item.title}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="recommend">
      <div class="recommend-text clearfix">
        <span class="fl">即将上映</span>
        <van-icon class="arrow" name="arrow" />
        <div class="huan fr">
          <van-icon class="fl huan-icon" name="replay" />
        </div>
      </div>
      <div class="recommend-list">
        <ul class="recommend-ul clearfix">
          <li
            class="recommend-li"
            v-for="(item,index) in showMovieFutureData.data"
            :key="index"
            :id="item.id"
            @click="viewMovieDetail({name: 'movieDetails', params: {id: item.id}})"
          >
            <div class="list-img">
              <img class="auto-img" :src="item.images.small" alt />
              <div class="count">
                <span class="listen-count">{{item.rating.average}}</span>
              </div>
            </div>
            <div>
              <span class="songs-text two-text">{{item.title}}</span>
            </div>
            <div>
              <span class="mainland-pubdate two-text">{{item.mainland_pubdate}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers("homeModule");
export default {
  name: "home",
  computed: {
    ...mapState([
      "value",
      "baseUrl",
      "movieIngData",
      "showMovieData",
      "isInit",
      "showMovieFutureData",
      "movieFutureData"
    ])
  },
  methods: {
    //换一换数据
    changeNewMovieData() {
      // console.log('ss')
      if (this.isHasData) {
        //提交换一换数据
        this.$store.commit("homeModule/toggleNewMovieData");
        
      }
    },
    //查看电影详情
    viewMovieDetail(o) {
      this.$router.push(o);
    }
  },

  created() {
    // console.log('this.showMovieData ==> ', this.showMovieData);

    if (!this.isInit) {
      return;
    }
    //开启加载提示
    this.$toast.loading({
      duration: 0,
      message: "加载中..."
    });

    this.axios({
      method: "GET",
      url: this.baseUrl + "/in_theaters"
    })
      .then(result => {
        // console.log("result ==> ", result);

        this.$store
          .dispatch("homeModule/getMovieIngData", result.data.subjects)
          .then(() => {
            // console.log('this.showMovieData ==> ', this.showMovieData);

            this.$toast.clear();
          });
      })
      .catch(err => {
        // console.log("err ==> ", err);
      });

    this.axios({
      method: "GET",
      url: this.baseUrl + "/coming_soon"
    })
      .then(result => {
        // console.log("result ==> ", result);

        this.$store
          .dispatch("homeModule/getMovieFutureData", result.data.subjects)
          .then(() => {
            // console.log('this.showMovieFutureData ==> ', this.showMovieFutureData);

            this.$toast.clear();
          });
      })
      .catch(err => {
        // console.log("err ==> ", err);
      });
  }
};
</script>

<style lang="less" scoped>
.home {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 50px;
  margin: auto;
  overflow-y: auto;
  .recommend-list {
    overflow-x: auto;
    overflow-y: hidden;
    margin-top: 10px;
  }
  .recommend-ul {
    width: 1300px;
    // overflow: hidden;
  }
  .recommend {
    width: calc(~"100% - 20px");
    padding: 10px 10px 0 10px;
  }

  .recommend-text {
    color: rgb(2, 2, 2);
    height: 40px;
    line-height: 40px;
    font-size: 19px;
  }
  .arrow {
    line-height: 40px;
  }
  .gengduo {
    // width: 16px;
    // height: 16px;
    // background: url('../icons/dayu.png') no-repeat center center;
    background-size: 12px;
    font-size: 14px;
    // margin-top: 12px;
  }
  .huan-icon {
    line-height: 40px;
    margin-right: 5px;
  }
  .recommend-ul > li {
    float: left;

    width: 121px;
    text-align: center;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .recommend-ul > li:last-child {
    margin-right: 0;
  }

  .list-img {
    position: relative;
    // width: 100%;
    height: 164px;
    overflow: hidden;
    border-radius: 8px;
  }
  .count {
    color: #e7e7e7;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 100%;
    height: 20px;
    border-radius: 0 0 8px 8px;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .listen-icon {
    width: 14px;
    height: 14px;
    background-size: 14px 14px;
    margin-top: 4px;
    margin-right: 2px;
  }
  .listen-count {
    font-size: 14px;
    color: #e0d315;
    font-weight: bold;
  }
  .two-text {
    margin-top: 2px;
    color: rgb(0, 0, 0);
    font-size: 14px;
    max-width: 118px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .mainland-pubdate {
    color: rgb(18, 133, 233);
  }
  // background-color: #fff;
  .tab-list {
    font-size: 16px;
    height: 80px;
    display: flex;
    padding: 0 10px;
  }
  .tab-list > div {
    float: left;
  }
  .list {
    line-height: 80px;
  }
  // .list.active{
  //     border-bottom: 1.5px solid rgb(167, 8, 8);
  //     color: rgb(167, 8, 8);
  // }
  .list > div {
    font-size: 14px;
    line-height: 30px;
    margin-left: auto;
    color: rgb(0, 0, 0);
  }
  .list-icon {
    width: 20px;
    height: 20px;
    overflow: hidden;
    text-align: center;
    line-height: 20px;
    margin: 6px auto;
  }
  .list-text {
    margin-top: 3px;
    text-align: center;
  }
  .icon-box {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #eb48ad;
    overflow: hidden;
    margin-top: 10px;
  }
  .list:first-child .icon-box {
    margin-left: 5px;
  }
  .tab-list > div:first-child {
    margin-left: 0;
  }
  .tab-list > div {
    line-height: 30px;
    margin-left: auto;
    color: rgb(231, 238, 230);
  }
  .tab-list > div.active {
    color: #fff;
  }
  .lunbo {
    // width: 100%;
    margin-top: 40px;
    padding: 0 10px;
  }
  .van-swipe {
    height: 180px;
  }
  .nav {
    position: fixed;
    left: 0;
    top: 0;
    width: calc(~"100% - 20px");
    padding: 0 10px;
    z-index: 10;
    background-color: #eb48ad;
  }
  .location {
    width: 45px;
    height: 40px;
    line-height: 40px;
    color: rgb(255, 255, 255);
    font-size: 14px;
  }
  .form {
    width: 250px;
  }
  .van-search {
    width: 250px;
    height: 30px;
    margin-top: 5px;
  }
  .van-search__content {
    height: 30px;
  }

  .tab {
    width: calc(~"100% - 120px");
    height: 40px;
    .tab-content {
      width: 60px;
      margin: 0 auto;
      text-align: center;
      overflow: hidden;
      line-height: 24px;
      margin-top: 8px;
      font-size: 14px;
      > div {
        width: 60px;
        height: 24px;
        color: rgb(110, 116, 124);
        &.active {
          color: rgb(255, 255, 255);
        }
      }
    }
  }
  .search {
    width: 45px;
    height: 40px;
    .search-icon {
      width: 20px;
      height: 20px;
      margin-top: 10px;
      font-size: 20px;
      color: rgb(255, 255, 255);
    }
  }
}
</style>