const state = {
    name : window.localStorage.getItem('cityName') || '杭州',
    id : window.localStorage.getItem('cityId') || 330100
    
};

const actions = {

};
const mutations = {
    CITY_INFO(statem, payload){
        state.name = payload.name;
        state.id = payload.id;
    }
}
// 对外管理接口
export default {
    namespaced: true,
    state,
    actions,
    mutations
}