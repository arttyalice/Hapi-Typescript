interface SuccessRes {
    version: string
    data: object | ListObject
}

interface ListObject {
    items: object[]
    length: number
}

export const ResponseSuccess = (data: object | ListObject): SuccessRes => {
    const res: SuccessRes = {
        version: process.env.APP_HAPI_VERSION,
        data: data
    }
    return res
}

interface FailRes {
    version: string
    status_code: number
    message: string
}

export const ResponseFail = (code: number, message: string): FailRes => {
    const res: FailRes = {
        version: process.env.APP_HAPI_VERSION,
        status_code: code,
        message: message
    }
    return res
}