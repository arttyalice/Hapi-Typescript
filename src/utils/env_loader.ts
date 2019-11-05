import { resolve } from "path"

import { config } from "dotenv"

export function LoadENV(env: string) {
    config({ path: resolve(__dirname, "../../.env") })
}
