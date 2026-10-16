import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: process.env.MONGODB_URL
    
})
