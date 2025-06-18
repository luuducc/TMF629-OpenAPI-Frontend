import { useRouter } from 'vue-router'

const useVueRouter = () => {
  const router = useRouter()
  const navigateBack = () => {
    if (window.history.state.back) {
      router.back()
    } else {
      // default route
      router.push('/')
    }
  }
  const navigateHome = () => {
    if (window.history.state.back === '/customers') {
      router.back()
    } else {
      router.push('/')
    }
  }
  return { navigateBack, navigateHome }
}

export default useVueRouter
