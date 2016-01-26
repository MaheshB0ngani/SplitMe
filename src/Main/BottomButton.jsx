import React from 'react';
import pure from 'recompose/pure';
import FlatButton from 'material-ui/lib/flat-button';
import colors from 'material-ui/lib/styles/colors';

import polyglot from 'polyglot';

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    textAlign: 'center',
    background: '#fff',
    borderTop: '1px solid #ccc',
  },
  button: {
    width: '100%',
    height: 50,
    color: colors.grey600,
  },
};

class BottomButton extends React.Component {
  render() {
    return (
      <div style={styles.root} data-test="BottomButton">
        <FlatButton label={polyglot.t('delete')} onTouchTap={this.props.onTouchTap} style={styles.button} />
      </div>
    );
  }
}

BottomButton.propTypes = {
  onTouchTap: React.PropTypes.func.isRequired,
};

export default pure(BottomButton);
