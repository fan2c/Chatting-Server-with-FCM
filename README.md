# Chatting-Server

This is a simple app for a chatting server in node.js environment. support push notification by Firebase Cloud Messaging(FCM)


#Usages



1. About firebase setting:

          https://firebase.google.com/




2. Subscribe the client app to a "fan2c" topic use swift in iOS.

func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
        print("I'm registered!")
        FIRMessaging.messaging().subscribe(toTopic: "/topics/fan2c")
       
    }
   
    
More detail information about iOS in
          https://firebase.google.com/docs/cloud-messaging/ios/topic-messaging


More detail information about android in
          https://firebase.google.com/docs/cloud-messaging/android/topic-messaging

3.

