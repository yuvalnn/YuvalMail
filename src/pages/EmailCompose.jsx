
import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { Link,useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom"

export function EmailCompose({onAddEmail , folder}) {

const [email, setEmail] = useState(emailService.createEmail())
const params  = useParams()
/* const {onAddEmail ,folder} = useOutletContext() */
const navigate = useNavigate()
      

    useEffect(()=>{
           
    },[])

    async function onSaveEmail(ev){
        ev.preventDefault()

        try {
           await onAddEmail(email) 
           if (params.emailId){
            navigate(`/email/${folder}/${params.emailId}`) 
           }
           else{
            navigate(`/email/${folder}`) 
           }
          /*  onSetfilter((filterBy) => ({ ...filterBy, ['compose']: '' }));  */     
           
        } catch (error) {
            
            console.log('Had issues saving email', error);
        }
    }


    function handleChange({target}){
       let {name:field , value, type} = target
       setEmail((prevEmail)=> ({...prevEmail, [field]: value}))       
    }
    
    const { subjetc, body, from, to } = email
   

    return (    
        <div className="email-compose">
            <h1>New Message</h1>

            <form onSubmit={onSaveEmail}>
            <label htmlFor="to">To</label>
                <input value={to} onChange={handleChange}
                    type="text" id="to" name="to" />                 

                <label htmlFor="from">From</label>
                <input value={from} onChange={handleChange}
                    type="text" id="from" name="from" />
               
               <label htmlFor="subject">Subject</label>
                <input value={subjetc} onChange={handleChange}
                    type="text" id="subject" name="subject" />

               <label htmlFor="body">Body</label>
                <input value={body} onChange={handleChange}
                    type="text" id="body" name="body" />
                  <button>Send</button>
                <Link to={params.emailId ? `/email/${folder}/${params.emailId}`: `/email/${folder}`}><button className="close-btn">X </button></Link>

            </form>
        </div>
    )
}


