import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/caregiver/$idUser/')({
  component: CaregiverProfileRoute,
})

function CaregiverProfileRoute() {
  const { idUser } = Route.useParams()
  return <div>Profile {idUser}</div>
}