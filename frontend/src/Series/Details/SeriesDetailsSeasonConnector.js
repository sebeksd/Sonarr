import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as commandNames from 'Commands/commandNames';
import { executeCommand } from 'Store/Actions/commandActions';
import { setEpisodesTableOption, toggleEpisodesMonitored, toggleEpisodesWatchedArchived } from 'Store/Actions/episodeActions';
import { toggleSeasonMonitored, toggleSeasonWatchedArchived } from 'Store/Actions/seriesActions';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import createDimensionsSelector from 'Store/Selectors/createDimensionsSelector';
import createSeriesSelector from 'Store/Selectors/createSeriesSelector';
import { findCommand, isCommandExecuting } from 'Utilities/Command';
import SeriesDetailsSeason from './SeriesDetailsSeason';

function createMapStateToProps() {
  return createSelector(
    (state, { seasonNumber }) => seasonNumber,
    (state) => state.episodes,
    createSeriesSelector(),
    createCommandsSelector(),
    createDimensionsSelector(),
    (seasonNumber, episodes, series, commands, dimensions) => {
      const isSearching = isCommandExecuting(findCommand(commands, {
        name: commandNames.SEASON_SEARCH,
        seriesId: series.id,
        seasonNumber
      }));

      const episodesInSeason = episodes.items.filter((episode) => episode.seasonNumber === seasonNumber);
      const sortedEpisodes = episodesInSeason.sort((a, b) => b.episodeNumber - a.episodeNumber);

      return {
        items: sortedEpisodes,
        columns: episodes.columns,
        isSearching,
        seriesMonitored: series.monitored,
        path: series.path,
        isSmallScreen: dimensions.isSmallScreen
      };
    }
  );
}

const mapDispatchToProps = {
  toggleSeasonMonitored,
  toggleEpisodesMonitored,
  toggleEpisodesWatchedArchived,
  toggleSeasonWatchedArchived,
  setEpisodesTableOption,
  executeCommand
};

class SeriesDetailsSeasonConnector extends Component {

  //
  // Listeners

  onTableOptionChange = (payload) => {
    this.props.setEpisodesTableOption(payload);
  };

  onMonitorSeasonPress = (monitored) => {
    const {
      seriesId,
      seasonNumber
    } = this.props;

    this.props.toggleSeasonMonitored({
      seriesId,
      seasonNumber,
      monitored
    });
  };

  onWatchedArchivedSeasonPress = (watched) => {
    const {
      seriesId,
      seasonNumber
    } = this.props;

    this.props.toggleSeasonWatchedArchived({
      seriesId,
      seasonNumber,
      watched
    });
  };

  onSearchPress = () => {
    const {
      seriesId,
      seasonNumber
    } = this.props;

    this.props.executeCommand({
      name: commandNames.SEASON_SEARCH,
      seriesId,
      seasonNumber
    });
  };

  onMonitorEpisodePress = (episodeIds, monitored) => {
    this.props.toggleEpisodesMonitored({
      episodeIds,
      monitored
    });
  };

  onWatchedArchivedEpisodePress = (episodeIds, watched) => {
    this.props.toggleEpisodesWatchedArchived({
      episodeIds,
      watched
    });
  };

  //
  // Render

  render() {
    return (
      <SeriesDetailsSeason
        {...this.props}
        onTableOptionChange={this.onTableOptionChange}
        onMonitorSeasonPress={this.onMonitorSeasonPress}
        onSearchPress={this.onSearchPress}
        onMonitorEpisodePress={this.onMonitorEpisodePress}
        onWatchedArchivedEpisodePress={this.onWatchedArchivedEpisodePress}
        onWatchedArchivedSeasonPress={this.onWatchedArchivedSeasonPress}
      />
    );
  }
}

SeriesDetailsSeasonConnector.propTypes = {
  seriesId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  toggleSeasonMonitored: PropTypes.func.isRequired,
  toggleSeasonWatchedArchived: PropTypes.func.isRequired,
  toggleEpisodesMonitored: PropTypes.func.isRequired,
  toggleEpisodesWatchedArchived: PropTypes.func.isRequired,
  setEpisodesTableOption: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(SeriesDetailsSeasonConnector);
