import {  useNavigate,useParams } from "react-router"
import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"

export function EmailDetails({}) {
    const [email, setemail] = useState(null)        
    const params = useParams()
    const navigate = useNavigate()

    console.log(params)

    useEffect(() => {
      
        LoadEmail(params)
        SetRead(params)

    }, [])

    async function LoadEmail(){
       
        try {
            const email = await emailService.getById(params.emailId)
            setemail(email)
            
        } catch (error) {
            navigate('/Email')
            console.log('Had issues loading email', error)
         
        }
        
    }

    async function SetRead() {
        console.log(params)
        try {
            const email = await emailService.getById(params.emailId)
            
            email.isRead = true
            emailService.save(email)
        } catch (error) {
            console.log(error)
        }
        
    }

    function onBack(){
        navigate(`/Email/${params.folder}`)
    }
    
    function onRemoveEmail()
    {
          emailService.remove(params.emailId)
          navigate(`/Email/${params.folder}`)

    }
    console.log('Render');
    if (!email) return <div>Loading...</div>

    return (
    <section className="email-details">
         
         <p>
            {email.body}
         </p>
         <button onClick={onBack}>Back</button>
         <button onClick={onRemoveEmail}>X</button>

    </section>)
    
}