import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/patient/$idUser/mySchedules')({
  component: PatientSchedulesRoute,
})

function PatientSchedulesRoute() {
  return <div>Hello "/profile/patient/$idUser/mySchedules"!</div>
}
