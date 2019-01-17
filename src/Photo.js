import React from "react";
import Fab from "@material-ui/core/Fab";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Close from "@material-ui/icons/Close";

// import { BrowserRouter as Router, Link} from 'react-router-dom'
// import Metadata from "./components/Metadata";
import { theme } from "./styles/theme";
import { withStyles } from "@material-ui/core/styles";
import { Grid, AppBar, Toolbar } from "@material-ui/core";
// import classes from "*.module.css";
// import download from 'image-downloader';
// import DownloadLink from "react-download-link";
import axios from 'axios';

const styles = {
  Fab: {
    backgroundColor: "rgba(0,0,0,0.2)",
    "&:hover": {
      backgroundColor: `${theme.palette.secondary.main}`
    }
  }
};

const Photo = ({
  index,
  onClick,
  photo,
  margin,
  direction,
  top,
  left,
  classes,
  isClosed,
  hideStatus,
  hidden
}) => {
  // console.log(photo)

  const [visible, setVisible] = React.useState(true);
  // console.log(photo);
  // React.useEffect(() => {
  //   !visible ? console.log(this) : console.log('nothing');
  // });

  const imgWithClick = { cursor: "pointer" };
  const imgStyle = { margin: margin };
  if (direction === "column") {
    imgStyle.position = "absolute";
    // imgStyle.border = "solid";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = event => {
    onClick(event, { photo, index });
  };

  const handleDrag = e => {
    e.stopPropagation();
    // debugger;
    e.target.style.boxShadow =
      "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
    e.target.style.border = `solid ${theme.palette.secondary.main}`;
  };

  const handleDrop = e => {
    // debugger;
    e.stopPropagation();
    e.target.style.border = "none";
    // debugger;
    // e.target.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
  };

  const handleUp = e => {
    // debugger;
    e.stopPropagation();
    e.target.style.boxShadow =
      "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
  };

  const handleHover = e => {
    e.stopPropagation();
    e.target.style.transition = "all 0.6s cubic-bezier(.25,.8,.25,1)";
    e.target.style.boxShadow =
      "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
  };

  const hidePhoto = e => {
    setVisible(false);
    // debugger;
    // console.log(this);
    // console.log(this.props.photos[index]);
    // this.props.photos[index].hideStatus(true);
    // debugger;
    // e.preventDefault();
    // e.stopPropagation();
    // console.log(e.target.parentElement.parentElement.parentElement.parentElement.parentElement);
    // e.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.remove();
    // e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    // debugger;
    // e.target.parentElement.parentElement.parentElement.parentElement.siblingElement.remove();
    // e.target.style.display = 'none';
  };

  const metaMouse = e => {
    e.target.style.backgroundColor = `${theme.palette.secondary.main}`;
    e.target.style.color = "white";
    e.target.style.transform = `scale(1.1)`;
    e.target.style.transition = "all 0.4s cubic-bezier(.25,.8,.25,1)";
  };

  const outMetaMouse = e => {
    e.target.style.backgroundColor = "rgb(255, 255, 255, 0.3)";
    e.target.style.color = "rgb(0, 0, 0, 0.5)";
    e.target.style.transform = `scale(1)`;
  };

  const handleDownload = e => {
    console.log(photo)
    window.open(photo.metadata.download, "_blank")
    axios.get(`/api/images?search=${photo.metadata.download}`)
    .then(response => {
      //IF found the photo in the database
      console.log("SUCCESS - Rails Api GET Request Fetched A Single Image")
      const image = response.data;
      
      console.log(image);
      if(image.message == "not found"){ //if don't find image save new one to DB
        axios.post( '/api/images', { image: {link: photo.metadata.link, brand: photo.metadata.brand, photographer: photo.metadata.photographer, profile: photo.metadata.profile, download_count: 1, download: photo.metadata.download} })
        .then(response => {
            console.log('SUCCESS - PERSISTED NEW PHOTO TO Rails Api via PUT Request')
            return console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
      }else if (image[0].download_count > 0){ //if do find image increment the download_count
        const id = image[0].id;
        const downloads = image[0].download_count + 1;
        axios.put( `/api/images/${id}`, { image: { download_count: downloads} })
        .then(response => {
            console.log('SUCCESS - UPDATED image download_count via Rails Api PUT Request')
            return console.log(response);
        })
        .catch(error => {
            console.log('FAILED - to UPDATE image download_count via Rails Api PUT Request')
            console.log(error)
        })  
      }else{
        console.log('FAILED - API reponse Did not do anything');
      }          
    })
    .catch(function (errors) {
      //IF don't find the photo already in the database
      console.log('FAIL - Initial Rails Api GET Request')
      console.log(errors)
    });
    
  

    // //TESTING RAILS API
    // axios.get(`http://localhost:3001/api/images`)
    // .then(response => {
    //   const images = response.data;
    //   console.log(images);      
    //   console.log("SUCCESS - Rails Api GET Request")
    // })
    // .catch(function (errors) {
    //   console.log('FAIL - Rails Api GET Request')
    //   console.log(errors)
    // });
    // e.preventDefault();
    // e.stopPropagation();
  //   // Get the photo url from the clicked parent element
  //   // debugger;
  //   const url = e.target.parentElement.parentElement.parentElement.href;
  //   console.log(url);
  //   const toDataURL = url => fetch(url)
  //   .then(response => response.blob())
  //   .then(blob => new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.onloadend = () => resolve(reader.result)
  //     reader.onerror = reject
  //     reader.readAsDataURL(blob)
      
  //   }))


  // toDataURL('https://pixabay.com/get/eb33b60e28f4073ed1584d05fb1d4797e377e0d710b00c4090f4c67caeebbdbbdb_1280.jpg')
  //   .then(dataUrl => {
  //     console.log('RESULT:', dataUrl)
  //     dataUrl.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
  //     let img = new Image();
  //     console.log(dataUrl)
  //     console.log(img)
  //     img.src = dataUrl;
  //     window.open(dataUrl);

  //     // console.log()
  //   })
    // debugger;
    // chrome.downloads.download(
    //   {url: url}                   // object
    // )
    // console.log(new Blob(url, {type: "image/jpg"}));
    // console.log(window.URL.createObjectURL(new Blob([url])));
    // axios({
    //   url: url,
    //   method: 'GET',
    //   responseType: 'blob', // important
    // }).then((response) => {
    //   const newurl = window.URL.createObjectURL(new Blob([response.data]));
    //   console.log(newurl);
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute('download', 'file.pdf');
    //   document.body.appendChild(link);
    //   link.click();
    // });
    // const options = {
    //   url: e.target.parentElement.parentElement.parentElement.href,
    //   dest: '/'
    // }
    // console.log(options);
    // download.image(options)
    //   .then(({ filename, image }) => {
    //     console.log('File saved to', filename)
    //   })
    //   .catch((err) => {
    //     console.error(err)
    // });
    // debugger;
  };

  return (
    <div>
      {visible ? (
        <div
          onMouseDown={handleDrag}
          onMouseLeave={handleDrop}
          style={{ transition: "all 0.5s cubic-bezier(.25,.8,.25,1)" }}
        >
          <Grid container direction="row">
            <Grid item>
              <div style={{ position: "relative" }}>
                <img
                  style={
                    onClick
                      ? { ...imgStyle, ...imgWithClick }
                      : {
                          ...imgStyle,
                          boxShadow:
                            "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
                        }
                  }
                  {...photo}
                  alt="img"
                  onMouseOver={handleHover}
                  onMouseOut={handleUp}
                />
                {/* sizes="(max-width: 36em) calc(.333 * (100vw - 12em)), 100vw" */}

                <Fab
                  aria-label="Hide"
                  size="small"
                  onMouseDown={e => e.stopPropagation()}
                  onClick={hidePhoto}
                  className={classes.Fab}
                  style={{
                    float: "left",
                    position: "absolute",
                    zIndex: "1000",
                    display: "inline-flex",
                    left: "0px"
                  }}
                >
                  <Close
                    style={{ color: "#ffffff" }}
                    onClick={e => e.stopPropagation()}
                  />
                </Fab>
                
                  <Fab
                    aria-label="Download"
                    href={photo.metadata.download}
                    size="small"
                    style={{
                      float: "left",
                      position: "absolute",
                      zIndex: "1000",
                      display: "inline-flex",
                      right: "0px"
                    }}
                    onMouseDown={e => e.stopPropagation()}
                    className={classes.Fab}
                    onClick={handleDownload}
                    target='_blank'
                    download
                  >
                    <CloudDownload style={{ color: "#ffffff" }} onClick={e => e.preventDefault()}/>
                  </Fab>
               
              </div>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item>
              <div
                style={{
                  position: "relative",
                  top: "-18px",
                  margin: "0px",
                  paddingLeft: "4px"
                }}
                onMouseDown={e => e.stopPropagation()}
              >
                <a
                  style={{
                    fontSize: "10px",
                    textDecoration: "none",
                    color: "rgb(0, 0, 0, 0.5)",
                    backgroundColor: "rgb(255, 255, 255, 0.3)",
                    float: "left"
                  }}
                  href={photo.metadata.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseOver={metaMouse}
                  onMouseOut={outMetaMouse}
                >
                  {photo.metadata.photographer} -
                </a>
                &nbsp;
                <a
                  href={photo.metadata.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "10px",
                    textDecoration: "none",
                    color: "rgb(0, 0, 0, 0.5)",
                    backgroundColor: "rgb(255, 255, 255, 0.3)",
                    float: "left"
                  }}
                  onMouseOver={metaMouse}
                  onMouseOut={outMetaMouse}
                >
                  {" "}
                  &nbsp;{photo.metadata.brand}
                </a>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </div>
  );
};
export default withStyles(styles)(Photo);
