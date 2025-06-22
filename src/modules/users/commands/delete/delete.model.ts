import { t } from 'elysia'

export namespace DeleteUserModel {
  export const deleteUserResponse = t.Object({
    id: t.Number(),
  })
  export type deleteUserResponse = typeof deleteUserResponse.static

  export const deleteUserResponseNotFound = t.String()
  export type deleteUserResponseNotFound =
    typeof deleteUserResponseNotFound.static

  export const deleteUserResponseBadRequest = t.String()
  export type deleteUserResponseBadRequest =
    typeof deleteUserResponseBadRequest.static
}
