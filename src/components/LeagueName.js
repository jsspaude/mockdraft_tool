import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getFunName } from '../helpers';

class LeagueName extends React.Component {
  myInput = React.createRef();

  roundsRef = React.createRef();

  managersRef = React.createRef();

  static propTypes = {
    history: PropTypes.object,
  };

  goToDraft = (e) => {
    e.preventDefault();
    const draftName = this.myInput.current.value;
    this.props.history.push(`/draft/${draftName}`);
  };

  render() {
    return (
      <div>
        <form action="" className="league-name" onSubmit={this.goToDraft}>
          <h2>League Name</h2>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="League Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Start Draft</button>
        </form>
      </div>
    );
  }
}

export default withRouter(LeagueName);
