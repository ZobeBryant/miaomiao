export default {
    path : '/mine',
    // @代表src目录
    //  which is lazy-loaded when the route is visited.
    component : () => import('@/views/Mine')
}