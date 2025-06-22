import { t } from 'elysia'

export namespace FindOneUserModel {
  export const FindOneUserResponse = t.Object({
    id: t.Number(),
    firstName: t.String(),
    lastName: t.String(),
    email: t.String(),
    pictureProfile: t.Union([t.String(), t.Null()]),
  })
  export type FindOneUserResponse = typeof FindOneUserResponse.static

  export const FindOneUserResponseNotFound = t.String()
  export type FindOneUserResponseNotFound =
    typeof FindOneUserResponseNotFound.static

  export const FindOneUserResponseBadRequest = t.String()
  export type FindOneUserResponseBadRequest =
    typeof FindOneUserResponseBadRequest.static
}
