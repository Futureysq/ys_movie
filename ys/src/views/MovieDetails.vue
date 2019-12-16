<template>
  <div class="movieDetails">
    <div class="nav">
      <van-icon size="25px" color="#f5f5f5" name="arrow-left" />
    </div>
    <div class="movie-post">
      <img
        class="auto-img"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575957621760&di=dd98785cdf1be88054cd70e0aee759cc&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-05-07%2F5aefe314c18af.jpg"
        alt
      />
      <div class="info clearfix">
        <div class="number fl">
          <div class="people">购票人数</div>
          <div class="people-sum">
            <span>11.42万</span>
          </div>
        </div>
        <div class="pingfen fl">
          <div class>电影评分</div>
          <div class="rank">7.8</div>
        </div>
        <div class="play-sum fr">
          <div>播放量</div>
          <div class="play-count">37.82万</div>
        </div>
      </div>
    </div>
    <div class="movie-info clearfix">
      <div class="img fl">
        <img
          class="auto-img"
          src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2576090251.jpg"
          alt
        />
      </div>
      <div class="info1 fl">
        <div class="name">误杀</div>
        <div class="type-time">
          <span class="type">剧情/犯罪</span>
          <span class="time">123分钟</span>
        </div>
        <div class="date">
          上映日期：2019-12-12
          <span>(美国)</span>
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
        <van-tab title="简介" name="a">李维杰与妻子阿玉来泰打拼17年，膝下育有两个女儿，年届四十的他靠开设网络公司为生，为人也颇得小镇居民的好感，而这一切美好却被突如其来的不速之客打破。这个充斥走私，贩毒活动的边陲小镇，各种权力交织碾压公平正义。李维杰的大女儿被督察长的儿子强暴，因反抗误杀对方。李维杰曾亲眼 目睹督察长滥用私刑，深知法律无用，为了维护女儿，捍卫家人，李维杰埋尸掩盖一切证据，在时间与空间的交错缝隙中，与警方在身心层面，展开了殊死一搏的较量。</van-tab>
        <van-tab title="演员" name="b">内容 2</van-tab>
        <van-tab title="影评" name="c">内容 3</van-tab>
        <van-tab title="更多" name="d">内容 4</van-tab>
      </van-tabs>
    </div>
    <div class="footer clearfix">
      <div class="inner">
        <div class="shoucang fl">
        <van-icon name="like-o" color="#fff" size="20px"/>
      </div>
      <div class="fl">
        <div class="buy-icon">
          <van-icon name="add-o" color="#EB48AD" size="20px"/>
        </div>
        <p class="select">选座购票</p>
      </div>
      <div class="share fl">
        <van-icon name="share" color="#fff" size="20px"/>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "movieDetails",
  data() {
    return {
      active: true,
      activeName: "a",
      tabActive: 'home'
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.movieDetails {
  .footer{
    // width: calc(~"100% - 20px";
    padding: 0 10px;
    height: 66px;
    background-color: #14112C;
    
    .inner{
      width: 100%;
      margin: 0 auto;
      >div{
        width: 33.3%;
        text-align: center;
        
      }
      .shoucang{
        line-height: 67px;
      }
      .share{
        line-height: 67px;
      }
      .select{
        color: aliceblue;
      }
    }
  }
  .content {
    height: 300px;
    padding: 10px 10px 10px 10px;
    color: rgb(224, 204, 204);
    background-color: #060517;
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
  }
  .number {
    padding: 0 10px;
    font-size: 16px;
    color: #444;
    width: calc(~"30% - 20px");
    background-color: rgb(253, 255, 255);
  }
  .people-sum {
    color: #fe0251;
  }
  .pingfen {
    width: 20%;
    overflow: hidden;
    text-align: center;
    color: #fff;
    background-color: #ff0068;
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
  }
}
</style>