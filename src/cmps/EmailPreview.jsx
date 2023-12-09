
export function EmailPreview ({email}) {
   
    return(
         
        <article className="email-preview">
              {`${email.from}  ${email.subject}  ${email.sentAt}`}                                            
        </article>
   )

}