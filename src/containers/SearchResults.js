import React, { Fragment, Component } from "react";
import Gallery from "react-photo-gallery";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import Photo from "./Photo";



const SortablePhoto = SortableElement(Photo);
const SortableGallery = SortableContainer(({ photos, hidden }) => {
  return (
    <Gallery
      photos={photos}
      direction="row"
      ImageComponent={SortablePhoto}
      hideStatus={hidden}
    />
  );
});

class SearchResults extends Component {
  ///////////////////////////////////////////////////////
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      pics: arrayMove(this.state.pics, oldIndex, newIndex)
    });
  };
  ///////////////////////////////////////////////////////
  onMove = ({ node, index, collection }, event) => {
    node.firstElementChild.style.border = "solid";
  };

  render() {
    return (
      <SortableGallery
        axis={"xy"}
        photos={this.props.pics}
        onSortEnd={this.onSortEnd}
        pressDelay={100}
        // onSortStart={this.onMove}
        hidden={false}
        key="gallery"
      />
    );
  }
}

export default SearchResults;
