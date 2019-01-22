# MultiPics
> MultiPics is a free stock photo search app built for creatives and marketers that consolidates the image search results from the top three free stock photo sources of Unsplash, Pexels, and Pixabay. This makes finding just the right image asset faster and more convenient. After entering a search query, the app requests ten photos at a time from each of the three APIs. The user is then able to drag and drop images to rearrange and compare them side-by-side. This makes searching and comparing image assets faster than opening up dozens of browser tabs and prevents the user from having to download the images locally in order to visually compare their features.

## Local Setup
#### Client React App
*This repository*
In the project directory, you run:
* `npm install`
* `npm start`
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Sever Backend API Setup
Visit this [GitHub Repo](https://github.com/katrpilar/free-stock-api)<br>
**Follow the Readme setup instructions in this second repo before continuing**<br>
>*NOTE: You'll need to have both the Rails server running and the Node server running locally for the app to work*

## Requesting Required External API Keys

*In order to use this project you'll need to request API credentials from all three external free stock photo APIs*

##### 1. Unsplash API
* Follow the instructions to create an Unsplash account and [Request Unsplash Developer Access Here](https://unsplash.com/documentation#creating-a-developer-account)
* Copy and save your 'Access Key' somewhere on your machine for later reference
* The Unsplash Access Key will be stored in the `REACT_APP_UNSPLASH_ACCESS_KEY` environment variable

##### 2. Pexels API
* Follow the instructions to create a Pexels account and [Request Pexels Developer Access Here](https://www.pexels.com/api/documentation/)
* Copy and save 'Your API key' somewhere on your machine for later reference
* The Pexels API Key will be stored in the `REACT_APP_PEXELS_API_KEY` environment variable

##### 3. Pixabay API
* Follow the instructions to create a Pixabay account and [Request Pixabay Developer Access Here](https://pixabay.com/api/docs/)
* Copy and save 'Your API key' somewhere on your machine for later reference
* The Pixabay API Key will be stored in the `REACT_APP_PIXABAY_API_KEY` environment variable

## Setting Up Local Environment File
1. Create a `.env` file at the root directory of this React App
2. Add `.env` to your `.gitignore` file also located in the root directory
3. Set your three external Api keys like this: <br>
```
REACT_APP_UNSPLASH_ACCESS_KEY = [Your Unsplash key]
REACT_APP_PEXELS_API_KEY = [Your Pexels key]
REACT_APP_PIXABAY_API_KEY = [Your Pixabay key]
```
4. Now anytime we make an API GET request to any of these three APIs we'll use the `process.env.` prefix before the name of the environment variable.

**For Example**<br>
*To access your Unsplash API key locally you would reference it like this*
```
process.env.REACT_APP_UNSPLASH_ACCESS_KEY
```
# Feature Roadmap
This project is ongoing. [Click Here](https://github.com/katrpilar/free-stock-react/blob/master/planning.md) to view the planned feature roadmap.