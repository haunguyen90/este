import Helmet from 'react-helmet';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';

let OfflinePage = ({ fields, online }) => (
  <div className="offline-page">
    <FormattedMessage {...linksMessages.offline}>
      {message =>
        <Helmet title={message} />
      }
    </FormattedMessage>
    <h2>
      Offline
    </h2>
    <p>
      <code>state.app.online: <b>{online.toString()}</b></code>
    </p>
    <p>
      Editable fields are persisted in the local storage by default. But
      syncing is hard, so that's why the next field is disabled on offline.
    </p>
    <input
      {...fields.somePersistedText}
      disabled={!online}
      type="text"
    />
    <p>
      The user state is also persisted in the local storage. Check{' '}
      <code>configureStorage.js</code>.
    </p>
    <p>TODO: Explain easy immutable offline syncing.</p>
  </div>
);

OfflinePage.propTypes = {
  fields: React.PropTypes.object.isRequired,
  online: React.PropTypes.bool.isRequired,
};

OfflinePage = fields(OfflinePage, {
  path: 'offline',
  fields: [
    'somePersistedText',
  ],
});

export default connect(state => ({
  online: state.app.online,
}))(OfflinePage);
