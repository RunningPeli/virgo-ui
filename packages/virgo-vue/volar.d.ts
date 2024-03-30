declare module 'vue' {
  export interface GlobalComponents {
    BaseInput: typeof import('@virgo-ui/vue')['BaseInput']
    VirgoButton: typeof import('@virgo-ui/vue')['VirgoButton']
    Floating: typeof import('@virgo-ui/vue')['Floating']
    VirgoInput: typeof import('@virgo-ui/vue')['VirgoInput']
    Tooltip: typeof import('@virgo-ui/vue')['Tooltip']
  }
}

export  {}