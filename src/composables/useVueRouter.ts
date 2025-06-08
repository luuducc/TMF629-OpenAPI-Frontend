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
  return { navigateBack }
}

export default useVueRouter
