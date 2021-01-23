# IDNMD

<p align="center">This application is MISSION CRITICAL!<br>Lets keep this badge green, folks.<br><img src="https://github.com/Apollorion/i-dont-need-more-domains/workflows/main/badge.svg"/></p>

### About This Project

I purchase way too many domains for projects I never start. This project started as a joke at work and to be even more META I finished this project (mostly).

Now that I think about it.... this readme will need a ton of work. Basically if you're here, you can open a PR and make this project even more ridiculous if you want. I won't stop you. I even setup automation so everything deploys! Oh! And it's got a staging environment!

### Environments
To prevent bad actors, only I can deploy your PR to staging with `/stage`, but if you ask me I'll probably do it for you.

production: https://i-dont-need-more-domains.io  
staging: https://stage.i-dont-need-more-domains.io

### TODO
Theres a few things I still would like to see done here:
 - A better README
 - There's a few TODOs in the React app that are kinda wonky, should probably fix those.
 - When deployed to staging, I'd like to automatically comment back on the PR when the deploy is complete.
 - I'd like to implement tests, because this project is mission critical.
 - I'd also like to setup code coverage reporting. Again. Mission critical.
 - Rollbar for error reporting.
 
 
## Contributing

If you can think of some ridiculous feature our mission critical application needs, feel free to open a PR. I'm not picky. It would be doubly impressive if you added tests to it, so we can make sure nothing crashes.  

Also, feel free to add a meme in `idnmd/src/memes`, terraform will automatically pick up on the image name and create a subdomain. Additionally, the React app will also automatically pick up on the new image and add a link for your new domain.


