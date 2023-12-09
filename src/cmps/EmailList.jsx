import { EmailPreview } from "./EmailPreview";

export function EmailList({emails}){
     
    return(
         
          <ul className="Email-List">

                    {emails.map(email=> 
                       <li key={email.id}> <EmailPreview email={email} /></li>)}
             
          </ul>
     )
    
}