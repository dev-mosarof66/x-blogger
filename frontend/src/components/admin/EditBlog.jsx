import React, { useEffect, useState } from 'react'
import BlogEditor from './BlogEditor'

// step => 1 editor with value


const EditBlog = () => {
    const [step, setStep] = useState(1)
    console.log(step)

    useEffect(() => {
        setStep()
    }, [])
    return (
        <div>
            <BlogEditor />
        </div>
    )
}

export default EditBlog