'use client'

import {useRouter} from 'next/navigation'
import {useEffect} from 'react'

const Page = () => {
    const router = useRouter()

    useEffect(() => {
        fetch('/api/logout')
            // We need to do this, as we still seem to be logged in even though session is now invalid
            .then(() => router.refresh())
            .then(() => router.push('/'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div>Please wait while you are signed out...</div>
}

export default Page
