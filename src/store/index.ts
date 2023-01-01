import {createStore} from 'vuex'

//创建并暴露store
export default createStore({
    state() {
        return {
            userInfo: {
                identity: 'tourist',    //只能是 tourist teacher student admin
                user_name: '',
                email: '',
                purchased_courses: [],
                balance: 0
            },
            host: 'localhost:8081',
        }
    },

    // actions中所有函数名字为小写字母+下划线
    actions: {
        set_userInfo(context, payload) {
            //    payload应该为对象：{ email:111@111, user_name:111, is_teacher:true }

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

        PURCHASE_COURSE(state, payload) {
            // @ts-ignore
            state.userInfo.purchased_courses.push(payload)
        },
        ADD_BALANCE(state, payload) {
            state.userInfo.balance += payload
        },

        DECREASE_BALANCE(state, payload) {
            state.userInfo.balance -= payload
        },
    }
})