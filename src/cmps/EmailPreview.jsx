import { Link } from "react-router-dom"
import { utilService } from "../services/util.service"


export function EmailPreview({ email }) {
  
  return (      
      <Link className="email-preview" to={`/Email/${email.id}`} >
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
      
  )

}