<template>
  <div>
    <div>
      手机号: <input type="text"><br>
      验证码: <input type="text">
      <button>发送验证码</button><br>
      <button>登陆</button>
    </div>
    <ele-header>
      <div class="tab">
        <div class="tab-item">
          <a href="#/goods" class="router-link-exact-active router-link-active">商品</a>
        </div>
        <div class="tab-item">
          <a href="#/ratings" class="">评价</a>
        </div>
        <div class="tab-item">
          <a href="#/seller" class="">商家</a>
        </div>
      </div>
    </ele-header>
  </div>

</template>

<script>
  import header from './components/head/header.vue'
  export default{
    components: {
      'ele-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "./common/stylus/mixins.styl"
  .tab
    height 40px
    display flex
    justify-content space-around
    align-items center
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      font-size 14px
      &>a
        color rgb(77,85,93)
      .router-link-active
        color rgb(240,20,20)

</style>
