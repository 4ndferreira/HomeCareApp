import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/patient/$idUser/')({
  component: PatientProfileRoute,
})

function PatientProfileRoute() {
  const { idUser } = Route.useParams()
  return <div>Profile {idUser}</div>
}
