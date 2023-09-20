// app/login/page.tsx

import {getPageSession} from '@/auth/lucia'
import Login from '@/app/login/azure-ad/login'

// If the user is logged in, redirect to the admin page
const Page = async () => {
    const session = await getPageSession()
    return <Login session={session}/>
}

export default Page
