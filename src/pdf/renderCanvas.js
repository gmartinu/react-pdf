import * as R from 'ramda';

import painter from '../canvas/painter';
import warning from '../utils/warning';

const defaultsZero = R.pathOr(0);

const renderCanvas = (ctx, node) => {
  const { top, left, width, height } = node.box;

  const paddingLeft = defaultsZero('paddingLeft', node.box);
  const paddingRight = defaultsZero('paddingRight', node.box);
  const paddingTop = defaultsZero('paddingTop', node.box);
  const paddingBottom = defaultsZero('paddingBottom', node.box);

  const availableWidth = width - paddingLeft - paddingRight;
  const availableHeight = height - paddingTop - paddingBottom;

  warning(
    availableWidth && availableHeight,
    'Canvas element has null width or height. Please provide valid values via the `style` prop in order to correctly render it.',
  );

  ctx.save().translate(left + paddingLeft, top + paddingTop);

  if (node.props.paint) {
    node.props.paint(painter(ctx), availableWidth, availableHeight);
  }

  ctx.restore();

  return node;
};

export default R.curryN(2, renderCanvas);
