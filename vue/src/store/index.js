import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
 //定义数据，相当于data
  state: {
    username:'',
    role:''
  },
  //相当于计算属性  computed
  getters: {
  },
  //唯一改变的地方
  mutations: {
    //state对象，传入的参数
    saveUsername(state,val){
      state.username = val
    },
    saverole(state,val){
      state.role = val
    }
  },
  //异步获取数据
  actions: {
  },
  modules: {
  }
})
