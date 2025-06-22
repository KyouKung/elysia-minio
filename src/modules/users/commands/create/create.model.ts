import { t } from 'elysia'

export namespace CreateUserModel {
  export const createUserBody = t.Object({
    firstName: t.String(),
    lastName: t.String(),
    email: t.String(),
    file: t.Optional(t.File()),
  })
  export type createUserBody = typeof createUserBody.static

  export const createUserResponse = t.Object({
    id: t.Number(),
    firstName: t.String(),
    lastName: t.String(),
    email: t.String(),
    pictureProfile: t.Union([t.String(), t.Null()]),
  })
  export type createUserResponse = typeof createUserResponse.static
}
