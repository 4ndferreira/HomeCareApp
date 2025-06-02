import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeRouteComponent,
})

function HomeRouteComponent() {
  return (
    <div className="">
      <h3>Welcome Home!</h3>
    </div>
  )
}