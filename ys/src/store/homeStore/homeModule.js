import {state} from './state'
import {mutations} from './mutations'
import {actions} from './actions'

export const homeModule = {
    namespaced: true,
    mutations,
    state,
    actions
}