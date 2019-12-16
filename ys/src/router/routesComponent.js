class RoutesComponent{
    registerComponent() {
        return import('../views/Register.vue')
    }
    loginComponent() {
        return import('../views/Login.vue')
    }
    indexComponent() {
        return import('../views/Index.vue')
    }
    homeComponent() {
        return import('../views/indexComponent/Home.vue')
      }
    buyComponent() {
        return import('../views/indexComponent/Buy.vue')
    }
    cinemaComponent() {
        return import('../views/indexComponent/Cinema.vue')
    }
    
    findComponent() {
        return import('../views/indexComponent/Find.vue')
    }
    
    mineComponent() {
        return import('../views/indexComponent/Mine.vue')
    }
    
    movieComponent() {
        return import('../views/buyComponent/Movie.vue')
    }
    movieDetailsComponent() {
        return import('../views/MovieDetails.vue')
    }
    
}

export default new RoutesComponent();
