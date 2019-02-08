import React, { Fragment, Component } from "react";
import Gallery from "react-photo-gallery";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import Photo from "./Photo";
import { connect } from 'react-redux';

const SortablePhoto = SortableElement(Photo);
const SortableGallery = SortableContainer(({ photos }) => {
  return <Gallery photos={photos} direction="row" ImageComponent={SortablePhoto} />
});

class SearchResults extends Component {
  state = {
    photos: this.props.pixs
  }

  componentWillReceiveProps = (nextProps) => {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.pixs !== this.state.photos) {
      this.setState({ photos: nextProps.pixs });
    }
  }
  ///////////////////////////////////////////////////////
  onSortEnd = ({ oldIndex, newIndex }) => {
    // this.props.setPhotos
    console.log(`Old Index ${oldIndex}`)
    console.log(`New Index ${newIndex}`)

    this.setState({
      photos: arrayMove(this.state.photos, oldIndex, newIndex)
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
        photos={this.state.photos}
        onSortEnd={this.onSortEnd}
        pressDelay={150}
        // onSortStart={this.onMove}
        key="gallery"
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pics: state.setPhotos.pics
  }
};

 const mapDispatchToProps = (dispatch) => {
  return {
    setPhotos: (imgs) => dispatch({
      type: 'SET_PHOTOS',
      pics: imgs
    })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
// export default SearchResults;
