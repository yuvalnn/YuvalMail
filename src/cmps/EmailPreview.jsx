import { Link, useParams, useSearchParams } from "react-router-dom"
import { utilService } from "../services/util.service"
import { EmailAction } from "./EmailAciton";


export function EmailPreview({ email, onUpdateEmail }) {
  const { folder } = useParams()
  const [searchParams,setSearchParams] = useSearchParams() 
  const emailTo = folder === 'draft' ? `/email/${folder}/?compose=${email.id}` :
    `/email/${folder}/${email.id}?${searchParams}`
  return (
    <section className="email-preview">
      <EmailAction email={email} onUpdateEmail={onUpdateEmail} />
      <Link   to={emailTo} >
      
         <div>
            {`From: ${email.from}`}
          </div>     
        <div>
          {`${email.subject}`}
        </div>
        <div>
          {`${utilService.formatTimestampToMonthDay(email.sentAt)}`}
        </div>
      </Link>
    </section>
  )
}


