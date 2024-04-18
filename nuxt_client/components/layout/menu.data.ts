export interface IMenuItem {
    name: string
    url: string
    icon: string
}

export const MENU_DATA: IMenuItem[] = [{
    icon: 'radix-icons:dashboard ',
    name: 'Home',
    url: '/'
},{
    icon: 'radix-icons: ',
    name: 'Login',
    url: '/login'
},{
    icon: 'radix-icons:dashboard ',
    name: 'Registration',
    url: '/registration'
},]