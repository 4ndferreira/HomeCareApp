import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RegisterRoute,
})

function RegisterRoute() {
  return <div>Hello "/register"!</div>
}
