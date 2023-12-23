import { EmailPreview } from "./EmailPreview";
import { EmailAction } from "./EmailAciton";

export function EmailList({ emails ,onUpdateEmail}) {

     return (
          <ul className="email-list">

               {emails.map(email =>
                    <li className={email.isRead ? '' : 'isNotRead'} key={email.id}>
                    <EmailAction email={email} onUpdateEmail={onUpdateEmail} />                       
                    <EmailPreview email= {email}  /></li>)}
          </ul>
     )

}