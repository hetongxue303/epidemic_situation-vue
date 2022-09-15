export interface IMenu {
    name: string
    path: string
    icon: string
    children?: Array<IMenu>
}

export interface IMeta {
    title: string
    icon: string
    keepAlive: boolean
    requireAuth: boolean
    roles: Array<string>
}

export interface IRouter {
    name: string
    path: string
    component: string
    meta: IMeta
    children?: Array<IRouter>
}