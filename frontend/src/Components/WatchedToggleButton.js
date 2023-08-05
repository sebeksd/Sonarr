import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SpinnerIconButton from 'Components/Link/SpinnerIconButton';
import { icons } from 'Helpers/Props';
import styles from './WatchedToggleButton.css';

function getTooltip(watched) {
  if (watched) {
    return 'Watched/Archived, click to set as unwatched/unarchived';
  }

  return 'Unwatched/Unarchived, click to set as watched/archived';
}

class WatchedToggleButton extends Component {

  //
  // Listeners

  onPress = (event) => {
    const shiftKey = event.nativeEvent.shiftKey;

    this.props.onPress(!this.props.watched, { shiftKey });
  };

  //
  // Render

  render() {
    const {
      className,
      watched,
      isDisabled,
      isSaving,
      size,
      ...otherProps
    } = this.props;

    const iconName = watched ? icons.VIEW : icons.UNVIEW;

    return (
      <SpinnerIconButton
        className={classNames(
          className,
          isDisabled && styles.isDisabled
        )}
        name={iconName}
        size={size}
        title={getTooltip(watched, isDisabled)}
        isDisabled={isDisabled}
        isSpinning={isSaving}
        {...otherProps}
        onPress={this.onPress}
      />
    );
  }
}

WatchedToggleButton.propTypes = {
  className: PropTypes.string.isRequired,
  watched: PropTypes.bool.isRequired,
  size: PropTypes.number,
  isDisabled: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

WatchedToggleButton.defaultProps = {
  className: styles.toggleButton,
  isDisabled: false,
  isSaving: false
};

export default WatchedToggleButton;
