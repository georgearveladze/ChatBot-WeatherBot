#### Subscription bot


Learn how use MongoDB for storing user data
Learn about cron jobs
Instruction
Read about MongoDB if didn't it before.
Google what is cron job and crontab. You should use this syntax with cron package.
Read about process.env.TZ
Task:


Create telegram bot where user can subscribe on weather forecast notification. Every day at chosen time at UTC timezone bot should send what weather is expected today. Subscriptions should be stored at MongoDB. For learning purpose you should run cron and telegram bot in one process, what is bad practice, because it blocks scaling application.

Design proposal should includes commands, database schema and flows