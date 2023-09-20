'use client'

import {Session} from 'lucia'
import {useEffect} from 'react'
import {redirect} from 'next/navigation'

const Login = (props: { session: Session | null }) => {
    // TODO: We could make this show something while we redirect to login

    useEffect(() => {
        if (props.session) redirect('protected')
        else redirect('/login/azure-ad')
    }, [props.session])

    return <div>Please wait while we log you in...</div>
}

export default Login
