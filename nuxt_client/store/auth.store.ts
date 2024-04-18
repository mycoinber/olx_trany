interface iAuthStore {
    name: string
    password: string
    status: boolean
}


const defaultValue: {user: IAuthStore} = {
    user: {
        name: '',
        password: '',
        status: false
    }
}
const isLoadingStore = userIsLoadingStore();
const router = useRouter();

export const useAuthStore = defineStore('auth'. {
    state: ()=>defaultValue,
    getters: {
        isAuth: state => state.user.status,
    },
    actions: {
        clear(){
            this.$patch(defaultValue);
        },
        set(input: IAuthStore){
            this.$patch({user: input})
        }
    }
})

export const userIsLoadingStore = defineStore('isLoading', {
    state: () =>({
        isLoading: true,
    }),
    actions: {
        set(data: boolean){
            this.$patch({isLoading: data})
        }
    }
})