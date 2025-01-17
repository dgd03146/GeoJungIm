import { Box, Button, Flex, Typography } from '@jung/design-system';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { useGetCategoryCounts } from '../api';
import * as styles from './CategoryGroup.css';

interface CategoryItem {
	name: string;

	slug: string;
}

interface CategoryGroupProps {
	title: string;
	items?: CategoryItem[];
}

export const CategoryGroup = ({ title, items }: CategoryGroupProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentCat = searchParams.get('cat') || 'all';

	const { data: categoryCounts } = useGetCategoryCounts();

	const getPostCount = (slug: string) => categoryCounts?.[slug] ?? 0;

	const createQueryString = useCallback(
		(value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value === 'all') {
				params.delete('cat');
			} else {
				params.set('cat', value);
			}

			return params.toString();
		},
		[searchParams],
	);

	return (
		<Flex position='relative' marginBottom='4' flex='1' width='full'>
			{title === 'All' ? (
				<Link
					href={'/blog'}
					className={`${styles.categoryHeader} ${styles.categoryHeaderLink({
						active: currentCat === null,
					})}`}
				>
					<Typography.SubText level={2} fontWeight='medium'>
						{title}
					</Typography.SubText>
				</Link>
			) : (
				<>
					<Button
						className={styles.categoryHeader}
						onClick={() => setIsOpen(!isOpen)}
						type='button'
					>
						<Typography.SubText level={2} fontWeight='medium'>
							{title}
						</Typography.SubText>
						<IoChevronDown
							size={16}
							className={styles.chevronIcon({ isOpen })}
							aria-hidden='true'
						/>
					</Button>

					<Box className={styles.categoryContent({ isOpen })}>
						{items?.map((item) => (
							<Link
								key={item.slug}
								href={`${pathname}?${createQueryString(item.slug)}`}
								className={styles.categoryItem({
									active: currentCat === item.slug,
								})}
							>
								<span className={styles.categoryName}>{item.name}</span>
								<span className={styles.categoryCount}>
									{getPostCount(item.slug)}
								</span>
							</Link>
						))}
					</Box>
				</>
			)}
		</Flex>
	);
};
