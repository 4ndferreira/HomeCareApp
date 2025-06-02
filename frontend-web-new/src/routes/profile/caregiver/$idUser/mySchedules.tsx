import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/caregiver/$idUser/mySchedules')({
  component: CaregiverSchedulesRoute,
})

function CaregiverSchedulesRoute() {
  return <div>Hello "/profile/caregiver/$idUser/mySchedules"!</div>
}
