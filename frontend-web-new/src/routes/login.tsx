import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../components/pages/loginPage/loginPage'

export const Route = createFileRoute('/login')({
  component: LoginRoute,
})

function LoginRoute() {
  return <LoginPage />
}
