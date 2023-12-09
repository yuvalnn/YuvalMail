import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"
import { EmailList } from "../cmps/EmailList"



export function EmailIndex() {
    const [emails, setEmails] = useState(null)

    useEffect(()=> {

      LoadEmails()
      console.log('Mounted/Effect')

    },
    
    [])

     async function LoadEmails() {

        const emails = await emailService.query()
        console.log(emails)
        setEmails(emails)
     }


    console.log('Rended')
    if (!emails) return <div>Loading...</div>
    return (

        <section className="Email-index">
          <EmailList emails= {emails} />                    

        </section>
    )
}