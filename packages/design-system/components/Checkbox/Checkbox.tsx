import {
	type ChangeEvent,
	type HTMLAttributes,
	forwardRef,
	useId,
} from 'react';

import { Box, Text } from '..';
import { CheckIcon } from '../../icons';
import type { AtomProps } from '../../types/atoms';
import * as S from './Checkbox.css';

interface Props
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	checked?: boolean;
}

export const Checkbox = forwardRef<HTMLDivElement, Props>(
	({ children, disabled, checked, onChange, ...restProps }, ref) => {
		const checkBoxId = useId();

		return (
			<Box as='div' display='inline-block' ref={ref} {...restProps}>
				<Box as='label' className={S.label({ disabled })} htmlFor={checkBoxId}>
					<Box
						as='input'
						className={S.input}
						type='checkbox'
						id={checkBoxId}
						data-testid='checkbox'
						disabled={disabled}
						checked={checked}
						onChange={onChange}
					/>
					<Box as='div' className={S.iconWrapper({ checked })}>
						{checked && <CheckIcon />}
					</Box>
					<Text as='span' color={disabled ? 'gray400' : 'black'}>
						{children}
					</Text>
				</Box>
			</Box>
		);
	},
);
