export default {
    path : '/movie',
    // @代表src目录
    //  which is lazy-loaded when the route is visited.
    component : () => import('@/views/Movie'),
    children :[
        {
            path : 'city',
            component : () => import('@/components/City')
        },
        {
            path : 'nowPlaying',
            component : () => import('@/components/NowPlaying')
        },
        {
            path : 'comingSoon',
            component : () => import('@/components/ComingSoon')
        },
        {
            path : 'search',
            component : () => import('@/components/Search')
        },
        {
            path : 'detail/1/:movieId',
            components: {
                default: () => import('@/components/NowPlaying'),
                detail : () => import('@/views/Movie/detail')
            },
            props: {
                detail : true
            }
        },
        {
            path : 'detail/2/:movieId',
            components: {
                default: () => import('@/components/ComingSoon'),
                detail : () => import('@/views/Movie/detail')
            },
            props: {
                detail : true
            }
        },
        {
            path : '/movie',
            redirect: '/movie/nowPlaying'
        }
    ]
}