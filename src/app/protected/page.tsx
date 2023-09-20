// app/admin/page.tsx

import {getPageSession} from '@/auth/lucia'
import Link from 'next/link'

const AdminPage = async () => {
    const session = await getPageSession()

    return <>
        {session ?
            <div>
                <h3>You are signed in!</h3>
                <p>id: {session.user.id}</p>
                <p>email: {session.user.email}</p>
            </div> :
            <div className="text-center">
                <h3>You must be signed in to access this page...</h3>
                <Link href="login"
                      className="block mt-2 bg-blue-600 hover:bg-blue-500 w-fit mx-auto px-4 py-2 rounded">
                    Click here to sign in.
                </Link>
            </div>}
    </>
}


export default AdminPage
