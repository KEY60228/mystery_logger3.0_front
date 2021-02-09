export const OK = 200
export const CREATED = 201
export const NO_CONTENT = 204
export const UNAUTHENTICATED = 401
export const NOT_FOUND = 404
export const UNPROCESSABLE_ENTITY = 422
export const INTERNAL_SERVER_ERROR = 500

// 日付をYYYY/MM/DDで返す
export const formatData = (dt: Date): string => {
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth()+1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    return (y + '/' + m + '/' + d);
}