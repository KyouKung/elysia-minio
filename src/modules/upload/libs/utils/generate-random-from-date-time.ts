import { dayjs } from '@/libs/plugins/dayjs.plugin'

export function generateRandomFromDateTime(): string {
  const now = dayjs().utc().toDate()

  const date =
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0')

  const time =
    now.getHours().toString().padStart(2, '0') +
    now.getMinutes().toString().padStart(2, '0') +
    now.getSeconds().toString().padStart(2, '0')

  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0')

  return `${date}${time}${randomNum}`
}
