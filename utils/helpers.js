import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'MobileFlashCards:NotificationsJS1'

export function getDeckKey(title){
    return title.replace(/ /g,'').toLowerCase()
}

export function formatDecks(decks) {
    return Object.keys(decks).map((deck) => {
        return decks[deck]
    })
}

export function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification(){
    return {
        title: 'You haven\'t complete a quiz today!',
        body: 'Complete a quiz and improve your knowledge!',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
        if(data === null){
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if( status === 'granted'){
                    
                    Notifications.cancelAllScheduledNotificationsAsync()
                    
                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(18)
                    tomorrow.setMinutes(0)

                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {
                            time: tomorrow,
                            repeat: 'day'
                        }
                    )

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
            })
        }
    })
}