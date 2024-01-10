import { useRouter } from 'next/navigation'
import React from 'react'

function Page() {
    const router = useRouter()
    const id = router?.query?.id
    return (
        <div>Page</div>
    )
}

export default Page