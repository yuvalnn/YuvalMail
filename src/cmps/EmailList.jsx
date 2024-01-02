import { EmailPreview } from "./EmailPreview";


export function EmailList({ emails ,onUpdateEmail}) {
     
     console.log('RenderEmailList')
     return (
          <ul className="email-list">

               {emails.map(email =>
                    <li className={email.isRead ? '' : 'isNotRead'} key={email.id}>
                                    
                    <EmailPreview email= {email} onUpdateEmail={onUpdateEmail} /></li>)}
          </ul>
     )

}