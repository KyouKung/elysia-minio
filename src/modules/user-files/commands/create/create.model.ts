import { t } from 'elysia'

export namespace CreateUserFileModel {
  export const createUserFileBody = t.Object({
    files: t.Array(t.File()),
  })
  export type createUserFileBody = typeof createUserFileBody.static

  export const createUserFileResponse = t.Object({
    id: t.Number(),
    files: t.Union([
      t.Array(
        t.Object({
          id: t.Number(),
          url: t.String(),
          type: t.String(),
        }),
      ),
      t.Null(),
    ]),
  })
  export type createUserFileResponse = typeof createUserFileResponse.static

  export const createUserFileResponseBadRequest = t.Object({
    message: t.String(),
  })
  export type createUserFileResponseBadRequest =
    typeof createUserFileResponseBadRequest.static

  export const createUserFileResponseNotFound = t.Object({
    message: t.String(),
  })
}
