# Ankimate 
##### An automatic language flashcards creation tool📖 

## 🚀 About the project

This project is being developed with the aim of automating the creation of flashcards using the tool called [Anki](https://apps.ankiweb.net/). Given the hurdle of copying and pasting dozens of words, sentences and translations, this wrapper was made using [Puppeteer]((https://pptr.dev/)) and the website [Wordreference](https://www.wordreference.com/) which makes the creation of flashcards much easier as seen in the next few steps:

* Download the extension [AnkiConnect](https://ankiweb.net/shared/info/2055492159)
* Download the project
* Run `npm run dev`
* Go to `http://localhost:3000/ankimate`
* Pick the deck that will be used
* Fill the fields with the words you wish
* Click `add `and wait

This will be the result of `english` to `portuguese`:

![](C:\Users\LB_01\WebstormProjects\ankimate\docs\images\cardPreview.png)

The `word` field is the only one required but you can overwrite the data fetched using any of them.

For the time being, only the languages `English `  `French` and `Portuguese` are available to be choosen from.

![](C:\Users\LB_01\WebstormProjects\ankimate\docs\images\landingPagePreview.png)

# Project goals:bulb: 

This project is being developed using `Typescript` and `NextJS`. It has been a personal tool of mine for quite some time and now I wish to make it public and and make it work for any language out there.

Some of the features I intend to implemente are:

* Detailed logs with card add results
* Stats with all time spent waiting for cards to be added
* Fetch and creation of user decks

## 🛠️ Technologies Used

- Node
- Nextjs
- Puppeteer
- Axios
- Redux

## ⌨️ Developer

**Leandro Bruner** [Linkedin](https://www.linkedin.com/in/leandro-bruner-a887361b8/)

​	IProgramming, books and games lover, I'm currently studying software development on [Fatec Ourinhos](https://www.fatecourinhos.edu.br/).