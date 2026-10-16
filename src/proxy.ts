import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    const user = session?.user

    console.log(user)

    
if (!user) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("redirect", request.nextUrl.pathname);

    return NextResponse.redirect(signInUrl);
}


}

export const config = {
    matcher: ["/profile", "/product/:path"],
}