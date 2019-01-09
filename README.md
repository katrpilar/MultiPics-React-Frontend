## Getting Started

In the project directory, you run:
* `npm install`
* `npm start`
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Requesting Required External API Keys

*In order to use this project you'll need to request API credentials from all three external free stock photo APIs*

###### Unsplash API
* Follow the instructions to create an Unsplash account and [Request Unsplash Developer Access Here](https://unsplash.com/documentation#creating-a-developer-account)
* Copy and save your 'Access Key' somewhere on your machine for later reference
* The Unsplash Access Key will be stored in the `REACT_APP_UNSPLASH_ACCESS_KEY` environment variable

###### Pexels API
* Follow the instructions to create a Pexels account and [Request Pexels Developer Access Here](https://www.pexels.com/api/documentation/)
* Copy and save 'Your API key' somewhere on your machine for later reference
* The Pexels API Key will be stored in the `REACT_APP_PEXELS_API_KEY` environment variable

###### Pixabay API
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
