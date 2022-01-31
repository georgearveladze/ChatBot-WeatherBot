@startuml
User -> Subscription_bot : send message to bot
activate Subscription_bot
Subscription_bot -> Telegram_Api : send message to telegram_Api
activate Telegram_Api
Telegram_Api -> App : send message
activate App
App -> Weather_Api : send request
activate Weather_Api

Weather_Api --> App :send response 
deactivate Weather_Api
App --> Telegram_Api : response
deactivate App
Telegram_Api --> Subscription_bot:response 
deactivate Telegram_Api
Subscription_bot --> User : delivered sms 
deactivate User
@enduml