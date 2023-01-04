import {createStore} from 'vuex'

//创建并暴露store
export default createStore({
    state() {
        return {
            userInfo:{
              id:0,
              user_name:'',
              identity:'tourist',
              email:'111@111.11'  
            },
            host: 'localhost:8081',
        }
    },

    // actions中所有函数名字为小写字母+下划线
    actions: {
        set_userInfo(context, payload) {
            context.commit('SET_ID',payload.id)
            context.commit('SET_IDENTITY',payload.identity)
            context.commit('SET_USER_NAME',payload.user_name)
            context.commit('SET_EMAIL',payload.email)
        },
    },

    // mutations中所有函数名字为大写字母+下划线
    mutations: {
        SET_IDENTITY(state, payload) {
            state.userInfo.identity = payload
        },

        SET_EMAIL(state, payload) {
            state.userInfo.email = payload
        },

        SET_USER_NAME(state, payload) {
            state.userInfo.user_name = payload
        },
        SET_ID(state, payload) {
            state.userInfo.id = payload
        }
    }
})