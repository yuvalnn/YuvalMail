import { Link } from "react-router-dom"

Link
export function EmailPreview ({email}) {
   
    return(
         
        <article className="email-preview">
              <Link to={`/Email/${email.id}`}>
              {`${email.from}  ${email.subject}  ${email.sentAt}`}       
              </Link>                                     
        </article>
   )

}