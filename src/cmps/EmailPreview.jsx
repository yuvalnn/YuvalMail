import { Link, useParams } from "react-router-dom"
import { utilService } from "../services/util.service"


export function EmailPreview({ email }) {
  const {folder} = useParams()
  return (    
        <section className="email-preview">
          { folder==='draft' ? 
          (<Link className="email-preview" to={`/email/${ folder}/?compose=${email.id}`} >
          <div>
            {`From: ${email.from}`}
          </div>
          <div>
            {`${email.subject}`}
          </div>
          <div>
            {`${utilService.formatTimestampToMonthDay(email.sentAt)}`}
          </div>
        </Link>) : 
         (<Link className="email-preview" to={`/email/${ folder}/${email.id}`} >
         <div>
           {`From: ${email.from}`}
         </div>
         <div>
           {`${email.subject}`}
         </div>
         <div>
           {`${utilService.formatTimestampToMonthDay(email.sentAt)}`}
         </div>
       </Link>)}

        </section>
      
  )

}


