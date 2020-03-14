import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const ArrayMap = ({data, children}) =>
  data.map((x, i) => <Fragment key={x.id || i}>{children(x, i)}</Fragment>);

ArrayMap.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};

export default ArrayMap;
