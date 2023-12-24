import { Link, useParams } from "react-router-dom"
import { utilService } from "../services/util.service"


export function EmailPreview({ email }) {
  const params = useParams()
  return (      
      <Link className="email-preview" to={`/email/${params.folder}/${email.id}`} >
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