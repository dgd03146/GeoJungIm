import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import * as styles from './CategorySection.css';

interface CategoryItem {
	name: string;
	count: number;
	slug: string;
}

interface CategorySectionProps {
	title: string;
	items?: CategoryItem[];
}

export const CategorySection = ({ title, items }: CategorySectionProps) => {
	const [isOpen, setIsOpen] = useState(true);
	const searchParams = useSearchParams();
	const currentCat = searchParams.get('cat');

	const isAll = title === 'All';
	console.log(currentCat, 'currentCat');

	return (
		<div className={styles.categorySection}>
			{isAll ? (
				<Link
					href={'/blog'}
					className={`${styles.categoryHeader} ${styles.categoryHeaderLink({
						active: currentCat === null,
					})}`}
				>
					<h3 className={styles.categoryTitle}>{title}</h3>
				</Link>
			) : (
				<>
					<button
						className={styles.categoryHeader}
						onClick={() => {
							setIsOpen(!isOpen);
						}}
						type='button'
					>
						<h3 className={styles.categoryTitle}>{title}</h3>
						<IoChevronDown
							size={16}
							className={styles.chevronIcon({ isOpen })}
							aria-hidden='true'
						/>
					</button>

					<div className={styles.categoryContent({ isOpen })}>
						<div className={styles.categoryList}>
							{items?.map((item) => (
								<Link
									key={item.slug}
									href={`/blog?cat=${item.slug}`}
									className={styles.categoryItem({
										active: currentCat === item.slug,
									})}
								>
									<span className={styles.categoryName}>{item.name}</span>

									<span className={styles.categoryCount}>{item.count}</span>
								</Link>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};
