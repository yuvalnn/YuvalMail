import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
  queryEmails,
  save,
  remove,
  getById,
  createEmail,
  getDefaultFilter,
  getLoggedinUser,
  queryFolders

}

const loggedinUser = { email: 'yuvalno@gmail.com', fullname: 'Yuval Neumann' }

const EMAIL_KEY  = 'emails'
const FOLDER_KEY = 'folders'


export function getLoggedinUser(){
    return loggedinUser
}
_createEmails()
_createEmailFolderList()


async function queryFolders() {
  const folders = await storageService.query(FOLDER_KEY)

  return folders
}


async function queryEmails(filterBy) {
    let emails = await storageService.query(EMAIL_KEY)
    if (filterBy) {
        const { status, txt, isRead } = filterBy;
        const regexTxtTerm = new RegExp(txt, 'i');
        let statusFolder;
        emails = emails.filter(email => {
          const isMatch = regexTxtTerm.test(email.body); //txt filter
          const isReadMatch = typeof isRead === 'boolean' ? email.isRead === isRead : true; //Select filter
          if (status === 'Inbox'){
            statusFolder = (email.to===getLoggedinUser().email);
          }          
          // Add filter for logged in User email          
          return isMatch && isReadMatch &&  statusFolder ;
      });
    }
    return emails
}

function getById(id) {
    return storageService.get(EMAIL_KEY, id)
}

function remove(id) {
    return storageService.remove(EMAIL_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(EMAIL_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(EMAIL_KEY, emailToSave)
    }
}

function createEmail(subject = '', body = '', isRead = false,
                     isStarred = false, sentAt=utilService.formatTimestampToMonthDay(Date.now()), 
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
        status: 'Inbox',
        txt: '', 
        isRead: null
    }
}

function _createEmailFolderList() {
    
    // Check for new folders
    let folders  = utilService.loadFromStorage(FOLDER_KEY)
    if (!folders || folders.length) {

        folders =  [
         {
          id: 'f101',
          status: 'Inbox'
         },{
          id: 'f102',
          status: 'Sent'
         },{
          id: 'f103',
          status: 'Star'
         },{
          id: 'f104',
          status: 'Trash'
         }

       ]
       utilService.saveToStorage(FOLDER_KEY, folders)
    }

    
    
    
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
      emails = [
        {
          id: 'e101',
          subject: 'The Clever Parrot',
          body: 'Once, a man bought a parrot that could talk. The first thing it said was, "Did you know I can speak three languages?" The man was impressed and asked, "Really? Which languages?" The parrot replied, "English, Bird, and a little bit of Spanish...squawk!"',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',  
          to: 'yuvalno@gmail.com'
        },
        {
          id: 'e102',
          subject: 'The Forgetful Fish',
          body: 'There was a forgetful fish who went to school every day but kept forgetting its lessons. The teacher asked, "Why don\'t you remember anything?" The fish replied, "I guess my memory is a bit fishy!"',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',
          to: 'yuvalno@gmail.com'
        },
        {
          id: 'e103',
          subject: 'Musical Vegetables',
          body: 'Why did the tomato turn red? Because it saw the salad dressing! The cucumber chimed in, "Well, I think that\'s a bit saucy!"',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',
          to: 'yuvalno@gmail.com'
        },
        {
          id: 'e104',
          subject: 'The Lazy Snowman',
          body: 'Once, a lazy snowman complained about its job. "I\'m tired of just standing here all day," it grumbled. So, it decided to take a snow-day off!',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',
          to: 'yuvalno@gmail.com'
        },  
        {
          id: 'e105',
          subject: 'The Speedy Snail',
          body: 'A snail bought a fast sports car and painted an \'S\' on it. When people asked why, the snail proudly said, "So when people see me, they\'ll say, Look at that S-car-go!"',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',
          to: 'yuvalno@gmail.com'
        },
        {
          id: 'e106',
          subject: 'The Wise Owl',
          body: 'Why did the wise owl bring a ladder to the bar? Because it heard the drinks were on the house!',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',
          to: 'yuvalno@gmail.com'
        },
        {
          id: 'e107',
          subject: 'The Dancing Banana',
          body: 'What did the banana say to the grape? "You\'re a-peeling!" The grape replied, "You\'re bananas if you think I\'m not!"',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',
          to: 'yuvalno@gmail.com'
        },
        {
          id: 'e108',
          subject: 'The Computers Diet',
          body: 'Why was the computer cold? It left its Windows open!',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',
          to: 'yuvalno@gmail.com'
        },
        {
          id: 'e109',
          subject: 'The Talking Dog',
          body: 'A man walked by a yard with a sign that said, "Talking Dog for Sale." Intrigued, he rang the bell, and the owner brought out a dog. The man asked, "Can your dog really talk?" The owner replied, "No, but he\'s a great listener!"',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',
          to: 'yuvalno@gmail.com'
        },
        {
          id: 'e110',
          subject: 'The Juggling Jello',
          body: 'Why did the jello go to the party? Because it wanted to be a little more wobbly!',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',
          to: 'yuvalno@gmail.com'
        },
        {
          id: 'e111',
          subject: 'The Talkative Toothbrush',
          body: 'Why did the toothbrush go to school? It wanted to brush up on its knowledge!',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',
          to: 'yuvalno@gmail.com'
        },
        {
          id: 'e112',
          subject: 'The Martian Bartender',
          body: 'A Martian walks into a bar and orders a drink. The bartender says, "Sorry, we don\'t serve your kind here." The Martian replies, "Well, that\'s just space-ist!"',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',
          to: 'yuvalno@gmail.com'
        },
        {
          id: 'e113',
          subject: 'The Ghosts Job',
          body: 'Why did the ghost apply for a job? It heard they were looking for someone with a lot of spirit!',
          isRead: false,
          isStarred: false,
          sentAt : utilService.formatTimestampToMonthDay(1702094332648),
          removedAt: null,
          from: 'giti@gitimomo.com',
          to: 'yuvalno@gmail.com'
        }                    
            
        ]
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}




