import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Video extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    const {url, ...htmlTags} = this.props;

    return (
      <video
        src={url}
        autoPlay
        loop
        allowFullScreen
        {...htmlTags}
      />
    );
  }
}