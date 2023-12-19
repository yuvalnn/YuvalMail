import { Link } from "react-router-dom"

Link
export function EmailPreview ({email}) {
   
    return(
         
       
              <Link className="email-preview" to={`/Email/${email.id}`} >
              <div>
                {`From: ${email.from}`}
              </div>
              <div>
                {`${email.subject}`}
              </div>
              <div>
                 {`${email.sentAt}`}
              </div>
              
              </Link>                                     
       
   )

}