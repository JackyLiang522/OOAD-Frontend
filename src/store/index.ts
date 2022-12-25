import {createStore} from 'vuex'

//创建并暴露store
export default createStore({
    state() {
        return {
            userInfo: {
                is_login: false,
                user_name: '',
                email: '',
                is_teacher: true,
            },
            host: 'localhost:8081',
        }
    },

    // actions中所有函数名字为小写字母+下划线
    actions: {
        set_userInfo(context, payload){
        //    payload应该为对象：{ email:111@111, user_name:111, is_teacher:true }

        }
    },

    // mutations中所有函数名字为大写字母+下划线
    mutations: {
        SET_IS_LOGIN(state, value){
            state.userInfo.is_login = value
        },

        SET_EMAIL(state,value){
            state.userInfo.email = value
        },

        SET_USER_NAME(state,value){
            state.userInfo.user_name = value
        },

        SET_IS_TEACHER(state,value){
            state.userInfo.is_teacher = value
        }
    }
})