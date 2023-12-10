import { EmailPreview } from "./EmailPreview";

export function EmailList({emails}){
     
     
 
      return(
          <ul className="email-list">

                    {emails.map(email=> 
                       <li  className={email.isRead ? '' : 'isNotRead'} key={email.id}> <EmailPreview email={email}  /></li>)}
             
          </ul>
     )
    
}