<template>
  <div class="buy">
    <div class="nav clearfix">
      <div class="fl location">广州</div>
      <div class="fl tab">
        <div class="tab-content">
          <div class="fl active">电影</div>
        </div>
      </div>
      <div class="fl search">
        <span class="fr search-icon">
          <van-icon name="search" />
        </span>
      </div>
    </div>

    <div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'buy'
  }
</script>

<style lang="less" scoped>
  .buy{
    background-color: #EB48AD;
    // background-color: #fff;
    padding: 0 10px;
    .location{
      width: 60px;
      height: 40px;
      line-height: 40px;
      color: rgb(255, 255, 255);
      font-size: 14px;
    }

    .tab{
      width: calc(~"100% - 120px");
      height: 40px;
      .tab-content{
        width: 60px;
        margin: 0 auto;
        text-align: center;
        overflow: hidden;
        line-height: 24px;
        margin-top: 8px;
        font-size: 14px;
        >div{
          width: 60px;
          height: 24px;
          color: rgb(110, 116, 124);
          &.active{
            color: rgb(255, 255, 255);
          }
        }
        
      }
    }
    .search{
      width: 60px;
      height: 40px;
      .search-icon{
        width: 20px;
        height: 20px;
        margin-top: 10px;
        font-size: 20px;
        color: rgb(255, 255, 255);
      }
    }
  }
</style>