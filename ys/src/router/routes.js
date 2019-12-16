import routesComponent from './routesComponent'

export default [
    {
        path: '/register',
        name: 'register',
        component: routesComponent.registerComponent
    },
    {
        path: '/login',
        name: 'login',
        component: routesComponent.loginComponent
    },
    {
        path: '/index',
        name: 'index',
        component: routesComponent.indexComponent,
        children: [
            {
              path: '/home',
              name: 'home',
              component: routesComponent.homeComponent
            },
            {
              path: '/buy',
              name: 'buy',
              component: routesComponent.buyComponent,
              children: [
                {
                  path: '/movie',
                  name: 'movie',
                  component: routesComponent.movieComponent
                }
              ]
            },
            {
              path: '/cinema',
              name: 'cinema',
              component: routesComponent.cinemaComponent
            },
            {
              path: '/find',
              name: 'find',
              component: routesComponent.findComponent
            },
            {
              path: '/mine',
              name: 'mine',
              component: routesComponent.mineComponent
            }
        ]
    },
    {
      path: '/movieDetails',
      name: 'movieDetails',
      component: routesComponent.movieDetailsComponent
    },
    
    {
        path: '*',
        redirect: {name: 'movieDetails'}
    }
]