import { type HTMLAttributes, forwardRef } from 'react';

import { Typography } from '..';
import type { AtomProps } from '../../types/atoms';

export interface Props
	extends Omit<HTMLAttributes<HTMLParagraphElement>, 'color'>,
		AtomProps {}

export const CardDescription = forwardRef<HTMLParagraphElement, Props>(
	({ children, ...restProps }, ref?) => {
		return (
			<Typography.Text level={2} ref={ref} {...restProps}>
				{children}
			</Typography.Text>
		);
	},
);
