import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const robotService = {
    getDefaultFilter

}

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

const STORAGE_KEY = 'emails'


_createEmails()

async function query(filterBy) {
    const robots = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        var { type, maxBatteryStatus, minBatteryStatus, model } = filterBy
        maxBatteryStatus = maxBatteryStatus || Infinity
        minBatteryStatus = minBatteryStatus || 0
        robots = robots.filter(robot => robot.type.toLowerCase().includes(type.toLowerCase()) && robot.model.toLowerCase().includes(model.toLowerCase())
            && (robot.batteryStatus < maxBatteryStatus)
            && robot.batteryStatus > minBatteryStatus)
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(robotToSave) {
    if (robotToSave.id) {
        return storageService.put(STORAGE_KEY, robotToSave)
    } else {
        robotToSave.isOn = false
        return storageService.post(STORAGE_KEY, robotToSave)
    }
}

function createEmail(model = '', type = '', batteryStatus = 100) {
    return {
        model,
        batteryStatus,
        type
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
                from: 'momo@momo.com',
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
                from: 'momo@momo.com',
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
                from: 'momo@momo.com',
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
                from: 'momo@momo.com',
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
                from: 'momo@momo.com',
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
                from: 'momo@momo.com',
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
                from: 'momo@momo.com',
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
                from: 'momo@momo.com',
                to: 'yuvalno@gmail.com'
              }                     
            
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




