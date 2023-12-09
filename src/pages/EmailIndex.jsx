import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"



export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())

    useEffect(()=> {

      LoadEmails()
      console.log('Mounted/Effect')
      console.log(filterBy)

    },
    
    [filterBy])

     async function LoadEmails() {

        const emails = await emailService.query(filterBy)
        console.log(emails)
        setEmails(emails)
     }

     function onSetFilter(filterBy) {

        setFilterBy(prevFilterBy => ({...prevFilterBy,...filterBy}))
     }


    console.log('Rended')
    
    if (!emails) return <div>Loading...</div>
    const {txt} = filterBy
    return (

        <section className="Email-index">
          <EmailFilter filterBy={txt} onSetFilter={onSetFilter} />
          <EmailList emails= {emails} />                    

        </section>
    )
}