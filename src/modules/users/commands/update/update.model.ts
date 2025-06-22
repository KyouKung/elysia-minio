import { t } from 'elysia'

export namespace UpdateUserModel {
  export const updateUserBody = t.Object({
    firstName: t.Optional(t.String()),
    lastName: t.Optional(t.String()),
    email: t.Optional(t.String()),
    file: t.Optional(t.File()),
  })
  export type updateUserBody = typeof updateUserBody.static

  export const updateUserResponse = t.Object({
    id: t.Number(),
    firstName: t.Union([t.String(), t.Null()]),
    lastName: t.Union([t.String(), t.Null()]),
    email: t.Union([t.String(), t.Null()]),
    pictureProfile: t.Union([t.String(), t.Null()]),
  })
  export type updateUserResponse = typeof updateUserResponse.static

  export const updateUserResponseNotFound = t.String()
  export type updateUserResponseNotFound =
    typeof updateUserResponseNotFound.static

  export const updateUserResponseBadRequest = t.String()
  export type updateUserResponseBadRequest =
    typeof updateUserResponseBadRequest.static
}
