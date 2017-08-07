import React from 'react';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Modal from 'react-modal';
import Mood from './Mood.jsx';
import Loading from './Loading.jsx';

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actual: props.actual,
      bgNumber: Math.round((Math.random() * (3 - 1)) + 1),
      bg: props.actual ? `url(moods/${props.actual.id}/bg1.png)` : 'url(moods/joyful/bg1.png)',
      intervalId: null,
      voteMood: '',
    };
    this._updateBg = this._updateBg.bind(this);
    this._updateBGVote = this._updateBGVote.bind(this);
  }

  componentWillMount() {
    const intervalId = setInterval(this._updateBg, 3500);
    this.setState({ intervalId });
    Modal.setAppElement('body');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      bg: nextProps.actual ? `url(moods/${nextProps.actual.id}/bg1.png)` : 'url(moods/joyful/bg1.png)',
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  _getRandomNumber() {
    let bgNumber = Math.round((Math.random() * (3 - 1)) + 1);
    while (bgNumber === this.state.bgNumber) {
      bgNumber = Math.round((Math.random() * (3 - 1)) + 1);
    }
    this.setState({
      bgNumber,
    });
  }

  _updateBg() {
    this._getRandomNumber();
    if (this.state.voteMood) {
      this.setState({
        bg: `url(moods/${this.state.voteMood}/bg${this.state.bgNumber}.png)`,
        voteMood: '',
      });
    } else {
      this.setState({
        bg: `url(moods/${this.props.actual.id}/bg${this.state.bgNumber}.png)`,
      });
    }
  }

  _updateBGVote(id) {
    this.setState({
      voteMood: id,
    });
  }

  render() {
    const {
      loading,
      moods,
    } = this.props;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div className="bgGIF">
        <div className="bgIMG" style={{ backgroundImage: this.state.bg }}>
          <button
            className="infoLogo"
            // onClick={() => { this.setState({ info: true }); }}
          >
            <img className="logo" alt="Mood" src="/logo.png" />
          </button>
          <Grid
            className="content"
            container
            gutter={0}
            justify="center"
            align="center"
          >
            <Grid
              container
              direction="row"
              justify="center"
            >
              {
                _.map(moods,
                  mood => (
                    <Mood updateBGVote={this._updateBGVote} key={mood._id} {...mood} />
                  ),
                )
              }
            </Grid>
            {/* {this.state.voteMood &&
              <Grid item className="voteConfirm">
                Voted!
              </Grid>
            } */}
          </Grid>
          <Modal
            isOpen={this.state.info}
            onRequestClose={() => { this.setState({ info: false }); }}
            contentLabel="Info"
            style={modalStyle}
          >
            <h1>Modal Content</h1>
            <p>Etc.</p>
          </Modal>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  moods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  actual: PropTypes.shape({
    id: PropTypes.string,
  }),
};

App.defaultProps = {
  actual: {},
};
