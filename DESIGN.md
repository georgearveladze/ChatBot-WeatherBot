@startuml
!theme aws-orange
User -> subscription_bot : User request
activate subscription_bot
subscription_bot -> Telegram_Api : User request
deactivate
activate Telegram_Api
deactivate
Telegram_Api -> App : User request
deactivate Telegram_Api
activate App
App -> service :User request
activate service
service -> database :Save User location to Database
deactivate

App-> User : response : Response to User === Request to User time
deactivate App

User-> Subscription_bot : User response ===== set time to resive the answer
activate Subscription_bot
Subscription_bot -> Telegram_Api : User request
deactivate Subscription_bot
activate Telegram_Api
Telegram_Api -> App : User request
deactivate Telegram_Api
activate App

App -> service :User request
deactivate
activate service

service -> database : Save User Time to Database
deactivate

database-> cron : Sent saved data to corn
activate database
activate cron

cron -> database: Chaking data to Database
deactivate database

cron -> whetherapi: when thee time mathed sent response to User
deactivate cron
activate whetherapi
whetherapi -> App : Finale response to User
deactivate
activate App
App -> User : Report finle Response:location, wether
deactivate
@enduml
