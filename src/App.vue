<template>
  <div>
    <div>
    手机号: <input type="text"><br>
    验证码: <input type="text">
    <button>发送验证码</button><br>
    <button>登陆</button>
    </div>
    <!--<div>
      用户名：<input type="text" name="username" placeholder="用户名" v-model="getUser.user"><br>
      密码：<input type="password" name="password" placeholder="密码" v-model="getUser.psw"><br>
      <input type="submit" value="提交">
    </div>-->

    <ele-header :seller="seller"></ele-header>
    <div class="tab">
      <div class="tab-item">
        <a href="#">商品</a>
      </div>
      <div class="tab-item">
        <a href="#">评价</a>
      </div>
      <div class="tab-item">
        <a href="#">商家</a>
      </div>
    </div>
  </div>
</template>

<script>
import header from './components/head/header.vue'
import axios from 'axios'
export default {
  data(){
    return{
      seller:{},
      getUser:{
        user:'',
        psw:''
      }
    }
  },
  mounted() {
    axios.get('/seller')
      .then(response => {
        const result = response.data
        if(result.code===0){
          this.seller=result.data
        }
      })
      .catch(res=>{
        console.log('错误')
      })

  },
  components: {
    'ele-header': header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "./assets/mixins.styl"
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
