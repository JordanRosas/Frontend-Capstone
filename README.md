# Polyglot Pal

![](https://github.com/JordanRosas/Frontend-Capstone/blob/master/public/PolyglotPal.png)

## Polyglot Pal is for those who wish to learn another language and make a friend in the process.
- Login and and search for a language you'd like to learn:
- Want to meet with a native speaker? a beginner?
- See other users proficiency in that language.
- Follow other users.
- Reach out in the community chatroom.
- Meet up with your new language partner.
- Keep track of the languages you are learning on your profile with language cards!.
- Improving? Update your cards to let everyone know.

## More language options to choose from!

## To Use The App:
1. Clone this repo with the "Clone or download" button above this README.
1. Copy the URL generated when the button is clicked.
1. Open your terminal.
1. Type `git clone` and then paste the URL from step 2.
1. Navigate into the root folder using `cd userSearch`
1. Once in root folder, type `npm install`
1. Type `npm start`
1. In another terminal window - navigate into the "api" folder by typing `cd /api`
1. Run `json-server -p 5002 -w database.json`
1. After steps listed above are complete you should be ready to use the app
1. Navigate to localhost:3000
1. Enjoy.
Thank you!

## Bugs Fixed
- issue 1 : User was able to add multiple instances of the same user to their friends list.
- issue 1 has been resolved. User can only add another user one time and will be alerted alerted of thier friendship if user       tries to add a friend already in their friends list. 

- issue 2: The logged in user was showing up in the search results.
- issue 2 has been resolved: The logged in user will not show up in the search results.

## Technologies Used To Build This Application
> React,
> Bootstrap 4,
> Material UI,
> JSON server

## Additional Dependencies Used
> zipcode,
> react-rate,

### Nashville Software School Front End Capstone

### &copy; Jordan Rosas 2019
