import {lucia} from 'lucia';
import {nextjs_future} from 'lucia/middleware'
import {prisma as prismaAdapter} from "@lucia-auth/adapter-prisma";
import {PrismaClient} from '@prisma/client'
import {azureAD} from '@lucia-auth/oauth/providers'
import {cache} from 'react'
import * as context from 'next/headers'

const client = new PrismaClient();

export const auth = lucia({
    middleware: nextjs_future(),
    env: process.env.NODE_ENV === 'development' ? "DEV" : "PROD",
    adapter: prismaAdapter(client, {
        // default values
        user: 'user',
        key: 'key',
        session: 'session'
    }),
    sessionCookie: {
        expires: false
    },
    getUserAttributes: (data) => {
        return {...data}
    }
})

export const azureADProvider = azureAD(auth, {
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    clientId: process.env.AZURE_AD_CLIENT_ID,
    tenant: process.env.AZURE_AD_TENANT_ID,
    redirectUri: process.env.AZURE_AD_REDIRECT_URI
})

export type Auth = typeof auth

export const getPageSession = cache(() => {
    const authRequest = auth.handleRequest('GET', context)
    return authRequest.validate()
})
