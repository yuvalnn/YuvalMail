import {  useNavigate,useParams } from "react-router"
import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"

export function EmailDetails({}) {
    const [email, setemail] = useState(null)        
    const params = useParams()
    const navigate = useNavigate()

    console.log(params)

    useEffect(() => {
      
        LoadEmail(params)

    }, [])

    async function LoadEmail(){
       
        try {
            const email = await emailService.getById(params.emailId)
            setemail(email)
            
        } catch (error) {
            console.log(error)
        }
        
    }

    function onBack(){
        navigate('/Email')
    }

    console.log('Render');
    if (!email) return <div>Loading...</div>

    return (
    <section className="email-details">
         
         <p>
            {email.body}
         </p>
         <button onClick={onBack}>Back</button>

    </section>)
    
}