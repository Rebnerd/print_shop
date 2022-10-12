import {createStore} from 'vuex'

export default createStore({
    state: {
        // printer: 'http://v49o743002.qicp.vip',
        // printer: 'http://localhost:8080',
        // For cors reason
        printer: 'http://192.168.66.196:4500',
        jobId: '',
        money: '0'
    },
    mutations: {
        // call the handler commit to store it
        setJobId(state, jobId) {
            state.jobId = jobId
        },
        setMoney(state, money) {
            state.money = money
        }
    },
    actions: {},
    modules: {},
})
