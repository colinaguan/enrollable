import React, {useState} from 'react'
import {Form, Button, Card} from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function ClassSearch() {
    const { logout } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleLogOut() {
        try {
            setError('')
            setLoading(true)
            await logout() 
            history.push('/login')
        } catch {
            setError('Fail to log out')
        }
        setLoading(false)
    }

    return (
        <>
            <div>
                class search components
            </div>

            <Button variant="link" onClick={handleLogOut}>
                Log out
            </Button>

        </>
    )
}
