import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailFolderList } from "../cmps/EmailFolderList"




export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const [folders, setFolder]  = useState(null)

    useEffect(()=> {

      LoadEmails()
      LoadFolders()
      console.log('Mounted/Effect')
      console.log(filterBy)

    },
    
    [filterBy])
     
    async function LoadFolders() {

      const folders = await emailService.queryFolders()
      console.log(folders)
      setFolder(folders)
      
   }
     async function LoadEmails() {

        const emails = await emailService.queryEmails(filterBy)
        console.log(emails)
        setEmails(emails)
     }

     function onSetFilter(filterBy) {

        setFilterBy(prevFilterBy => ({...prevFilterBy,...filterBy}))
     }

    console.log('Rended')
    
    if (!emails || !folders) return <div>Loading...</div>
    const {status,txt,isRead} = filterBy
    return (

        <section className="email-index">
          <EmailFolderList folders = {folders} filterBy={{status}} onSetFilter={onSetFilter}/>
          <EmailFilter filterBy={{txt,isRead}} onSetFilter={onSetFilter} />
          <EmailList emails= {emails} />                    

        </section>
    )
}