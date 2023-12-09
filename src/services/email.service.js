import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
  query,
  save,
  remove,
  getById,
  createEmail,
  getDefaultFilter

}

const loggedinUser = { email: 'yuvalno@gmail.com', fullname: 'Yuval Neumann' }

const STORAGE_KEY = 'emails'


_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        var { status, txt, isRead } = filterBy
        status = status || 'Inbox'
        txt = txt || ''
        isRead = isRead || false
        const regexTxtTerm = new RegExp(txt, 'i')
        emails = emails.filter(email=> 
          regexTxtTerm.test(email.body))
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (robotToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        robotToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function createEmail(subject = '', body = '', isRead = false,
                     isStarred = false, sentAt=Date.now(), 
                     removedAt=  null, from = 'yuvalno@gmail.com' ,
                     to= 'yuvalno@gmail.com') {
    return {
              subject,
              body,
              isRead,
              isStarred,
              sentAt,
              removedAt,
              from,
              to 
    }
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '', // no need to support complex text search 
        isRead: null, // (optional property, if missing: show all)
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            {
                id: 'e101',
                subject: 'git init',
                body: 'Initializing a new Git repository for your project.',
                isRead: false,
                isStarred: false,
                sentAt: 1702094332648,
                removedAt: null,
                from: 'giti@gitimomo.com',
                to: 'yuvalno@gmail.com'
              },
              {
                id: 'e102',
                subject: 'git add',
                body: 'Staging changes for the next commit in Git.',
                isRead: false,
                isStarred: false,
                sentAt: 1702094332649,
                removedAt: null,
                from: 'giti@gitimomo.com',
                to: 'yuvalno@gmail.com'
              },
              {
                id: 'e103',
                subject: 'git commit',
                body: 'Creating a snapshot of changes in your Git project.',
                isRead: false,
                isStarred: false,
                sentAt: 1702094332650,
                removedAt: null,
                from: 'giti@gitimomo.com',
                to: 'yuvalno@gmail.com'
              },
              {
                id: 'e104',
                subject: 'git status',
                body: 'Checking the status of your Git working directory.',
                isRead: false,
                isStarred: false,
                sentAt: 1702094332651,
                removedAt: null,
                from: 'giti@gitimomo.com',
                to: 'yuvalno@gmail.com'
              },
              {
                id: 'e105',
                subject: 'git log',
                body: 'Viewing the commit history in Git.',
                isRead: false,
                isStarred: false,
                sentAt: 1702094332652,
                removedAt: null,
                from: 'giti@gitimomo.com',
                to: 'yuvalno@gmail.com'
              },
              {
                id: 'e106',
                subject: 'git branch',
                body: 'Creating and managing branches in Git.',
                isRead: false,
                isStarred: false,
                sentAt: 1702094332653,
                removedAt: null,
                from: 'giti@gitimomo.com',
                to: 'yuvalno@gmail.com'
              },
              {
                id: 'e107',
                subject: 'git merge',
                body: 'Combining changes from different branches in Git.',
                isRead: false,
                isStarred: false,
                sentAt: 1702094332654,
                removedAt: null,
                from: 'giti@gitimomo.com',
                to: 'yuvalno@gmail.com'
              },
              {
                id: 'e108',
                subject: 'git clone',
                body: 'Copying a repository from a remote server to your local machine in Git.',
                isRead: false,
                isStarred: false,
                sentAt: 1702094332655,
                removedAt: null,
                from: 'giti@gitimomo.com',
                to: 'yuvalno@gmail.com'
              }                     
            
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




