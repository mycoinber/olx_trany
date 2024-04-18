interface isidebarOpen {
    isOpen: boolean
}


const defaultValue: {isOpen: isidebarOpen} = {
    isOpen: {
        isOpen: false
    }
}
const isLoadingStore = userIsLoadingStore();
const router = useRouter();

export const isidebarOpen = defineStore('sidebar'. {
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