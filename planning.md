# Todos
### Essential Features
- Redux (Actions)
    - SET_QUERY (done)
    - SET_PHOTOS
    - DELETE_PHOTO (maybe)
    - CLEAR_RESULTS = empties {page number, photos array, and search query}
    - SET_DOWNLOAD_FILTER = most recent, most popular
    - GET_DOWNLOADS
- Add React Router routs
    - /search
    - /most-popular
    - /trending
- Implement recently downloaded feed UI pulling from Rails API

### Bugs?
- Page counter is off
- Submitting search form by button rather than pressing enter is slow/doesn't render
    -  first submit of search form won't render search results unless submitted again
    - Problem with fetch request not completing before trying to render
    - maybe resolves with redux thunk
    - When change the search query submitting the form again doesn't display the search results
- Rearranging images when there are a lot on the page are very slow to rerender when moved
    - Could be resolved by setting srcSet image versions on photos

### Clean up
- Consolidate and relocate inline styles using styled componenets
- Clean up readability of code
- change all functional (stateless) components from ES6 syntax to function syntax


### Future Feature Planning
- Show/Hide query results from previous searches using togglable material-ui chips
- Compare images for duplicates
    - https://github.com/rsmbl/Resemble.js
    - https://medium.com/@royyeh007/how-to-use-resemble-js-api-with-react-to-compare-images-e1d1871dd068
- Implement SrcSet and multiple sizes for photo results within react-photo-gallery
- Toggle search sources: Unsplash, Pexels, Pixabay
- Move images to second 'Top Picks' drap/drop container
- Actually download the image instead of opening in new tab (maybe look more into axios options here)
-  Convert images to files for actual downloading 
    - https://stackoverflow.com/questions/7951326/save-image-to-users-disk-using-javascript
- Implement share button
- Implement infinite scroll
    - https://www.npmjs.com/package/react-infinite-scroller
- Add transitions for elements when state changes using React.TransitionGroup



# Done
~~Persist download count to the database~~

~~Fix image resizing options so that they're much larger on mobile~~

~~Some photos from pexels are very large.. need to investigate~~

~~Fix strange black border that's appearing on the grid container~~

~~Hide image from view if don't like result - Sometimes this doesn't work~~

~~Some smaller photos are getting pixelated when automatically blown up~~

~~Image Responsiveness~~

~~Implement multi-word search queries~~<br>
~~Fix close/hide image icon Maybe App.js componenet should manage this?~~

~~link to source 
link to brand
photographer name
photographer profile
photographer website
download link~~

~~Fix download icon bug~~

~~- Fix broken links on images
    - The entire clickable element currently is listening for click events for drag and drop 
    - This is resulting in the external links being ignored~~
~~- Determine user experience for gallery image actions and details (Be minimalist)~~
~~- Figure out how to make Photo HOC stateful~~
~~- Fix apparent image margin on the bottom of each image div~~