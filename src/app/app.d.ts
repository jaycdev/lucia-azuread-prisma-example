declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        AZURE_AD_CLIENT_SECRET: string
        AZURE_AD_CLIENT_ID: string
        AZURE_AD_TENANT_ID: string
        AZURE_AD_REDIRECT_URI: string
    }
}

declare namespace Lucia {
    type Auth = import('@/auth/lucia').Auth
    type DatabaseUserAttributes = {
        name: string
        given_name: string
        family_name: string
        email?: string
    }
    type DatabaseSessionAttributes = {}
}
