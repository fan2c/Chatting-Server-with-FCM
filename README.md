# Chatting-Server

This is a simple app for a chatting server in node.js environment. support push notification by Firebase Cloud Messaging(FCM).

The chating server part is base on the socket.io, which enables real-time bidrectional event-based communication.the push notification part is base on the Firebase Clound Messaging, so it can support to iOS and android device. 


## Usages

###1. Prepare firebase serive account:


    https://firebase.google.com/docs/admin/setup



###2. Subscribe to the topic

Based on the publish/subscribe model, FCM topic messageing allows you to send a message to multiple devices that have opted in to a particular topic. You compose topic messages as needed, and FCM handles routing and delivering the message reliably to the right devices.

View more ..  https://firebase.google.com/docs/admin/setup


explame: Subscribe the client app to a "fan2c" topic use swift in iOS.

    func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
            print("I'm registered!")
            FIRMessaging.messaging().subscribe(toTopic: "/topics/fan2c")

        } //swift
   
    
More detail information about iOS in
          https://firebase.google.com/docs/cloud-messaging/ios/topic-messaging


More detail information about android in
          https://firebase.google.com/docs/cloud-messaging/android/topic-messaging

###3. Send a push notification


    var ref = admin.database().ref('/notificationRequests').push({
      "username": "fan2c",
      "message": "test"
    }); //node.js


