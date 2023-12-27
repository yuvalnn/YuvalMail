import {  useNavigate,useParams,useOutletContext } from "react-router"
import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function EmailDetails({}) {
    const [email, setemail] = useState(null)        
    const params = useParams()
    const navigate = useNavigate()
    const { onRemoveEmail } = useOutletContext()
    

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
            navigate('email')
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
        navigate(`/email/${params.folder}`)
    }
    
   async function onRemove()
    {
          try {
             /*  await onRemoveEmail(params.emailId)  */
               await emailService.remove(params.emailId)
              showSuccessMsg('The email was successfully removed')
              navigate(`/email/${params.folder}`)    

          } catch (error) { 
            showErrorMsg('Failed to remove the email. Please try again')
            console.log('Had issues delete email', err);
          }
    }

    
    console.log('Render');
    if (!email) return <div>Loading...</div>

    return (
    <section className="email-details">
         
         <p>
            {email.body}
         </p>
         <button onClick={onBack}>Back</button>
         <button onClick={onRemove}>X</button>

    </section>)
    
}