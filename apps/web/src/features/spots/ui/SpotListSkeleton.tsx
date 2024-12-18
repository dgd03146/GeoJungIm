import { Box, Card, Container, Grid } from '@jung/design-system';
import * as styles from './SpotListSkeleton.css';

const SpotSkeleton = () => {
	return (
		<Card variant='outline' className={styles.skeletonCardStyle}>
			<Box className={styles.imageSkeleton} /> {/* 이미지 스켈레톤 */}
			<Card.Content rowGap='2'>
				<Box className={styles.titleSkeleton} /> {/* 제목 스켈레톤 */}
				<Box className={styles.addressSkeleton} /> {/* 주소 스켈레톤 */}
				<Box className={styles.descriptionSkeleton} /> {/* 설명 스켈레톤 */}
				<Box className={styles.ratingSkeleton} /> {/* 별점 스켈레톤 */}
			</Card.Content>
		</Card>
	);
};

const SpotListSkeleton = ({ count = 3 }) => {
	return (
		<Container marginY='12'>
			<Grid
				columnGap='4'
				rowGap='8'
				gridTemplateColumns={{
					mobile: '1',
					tablet: '1/2',
					laptop: '1/3',
				}}
			>
				{Array.from({ length: count }).map((_, index) => (
					<SpotSkeleton key={index} />
				))}
			</Grid>
		</Container>
	);
};

export default SpotListSkeleton;