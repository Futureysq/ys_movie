import Vue from 'vue'
import Vuex from 'vuex'

import {registerModule} from './registerStore/registerModule'
import {indexModule} from './indexStore/indexModule'
import {loginModule} from './loginStore/loginModule'
import {movieModule} from './movieStore/movieModule'
import {homeModule} from './homeStore/homeModule'
import {movieDetailsModule} from './movieDetailsStore/movieDetailsModule'
import {mineModule} from './mineStore/mineModule'
import {likeMovieModule} from './likeMovieStore/likeMovieModule'
import {buyMovieTickModule} from './buyMovieTickStore/buyMovieTickModule'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    registerModule,
    indexModule,
    loginModule,
    movieModule,
    homeModule,
    movieDetailsModule,
    mineModule,
    likeMovieModule,
    buyMovieTickModule,
  }
})
