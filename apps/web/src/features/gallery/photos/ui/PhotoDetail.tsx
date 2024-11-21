// PhotoDetail.tsx
'use client';

import { BlurImage } from '@/fsd/shared';
import { formatDate } from '@/fsd/shared/lib';
import {
	Box,
	Button,
	Flex,
	Tag,
	Typography,
} from '@jung/design-system/components';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { usePhotoNavigation } from '../model';
import * as styles from './PhotoDetail.css';

interface PhotoDetailProps {
	id: string;
	isModal?: boolean;
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.4,
			ease: [0.22, 1, 0.36, 1],
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const imageVariants = {
	hidden: { opacity: 0, scale: 1.02 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const contentVariants = {
	hidden: { opacity: 0, x: 10 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
			staggerChildren: 0.08,
		},
	},
};

export function PhotoDetail({ id, isModal }: PhotoDetailProps) {
	const { currentPhoto, previousPhoto, nextPhoto } = usePhotoNavigation(id);
	const [isLiked, setIsLiked] = useState(false);

	console.log(previousPhoto, 'previousPhoto');
	console.log(nextPhoto, 'nextPhoto');

	// TODO: 사진 없는 경우 처리
	if (!currentPhoto) {
		return <div>사진을 찾을 수 없습니다.</div>;
	}
	const handleLikeClick = () => {
		setIsLiked(!isLiked);
		// TODO: API 호출
	};

	const handleShareClick = () => {
		// TODO: 공유 기능 구현
	};

	return (
		<AnimatePresence>
			<div
				className={
					isModal ? styles.modalNavigationWrapper : styles.navigationWrapper
				}
			>
				<div
					className={
						isModal
							? styles.modalNavigationButtonsContainer
							: styles.navigationButtonsContainer
					}
				>
					{previousPhoto && (
						<Link
							href={`/gallery/photo/${previousPhoto.id}`}
							className={
								isModal ? styles.modalNavigationButton : styles.navigationButton
							}
							aria-label='이전 사진'
							scroll={false}
						>
							<HiChevronLeft
								className={
									isModal ? styles.modalNavigationIcon : styles.navigationIcon
								}
							/>
						</Link>
					)}
					{nextPhoto && (
						<Link
							href={`/gallery/photo/${nextPhoto.id}`}
							className={
								isModal ? styles.modalNavigationButton : styles.navigationButton
							}
							aria-label='다음 사진'
							scroll={false}
						>
							<HiChevronRight
								className={
									isModal ? styles.modalNavigationIcon : styles.navigationIcon
								}
							/>
						</Link>
					)}
				</div>
			</div>

			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				exit='exit'
				className={
					isModal
						? `${styles.container} ${styles.modalContainer}`
						: styles.container
				}
			>
				<motion.div
					className={`
            ${styles.imageWrapper} 
            ${isModal ? styles.modalImageWrapper : ''}
          `}
					variants={imageVariants}
				>
					<BlurImage
						src={currentPhoto.image_url}
						alt={currentPhoto.alt}
						fill
						priority
						sizes='(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 840px'
					/>
				</motion.div>

				<motion.div
					className={`${styles.content} ${isModal ? styles.modalContent : ''}`}
					variants={contentVariants}
				>
					<Box className={styles.header}>
						<Typography.Text level={1}>{currentPhoto.title}</Typography.Text>
					</Box>

					<Box className={styles.description}>
						<Typography.Text level={3}>
							{currentPhoto.description}
						</Typography.Text>
					</Box>

					<Flex gap='2'>
						{currentPhoto.tags?.map((tag) => (
							<Tag key={tag} rounded>
								#{tag}
							</Tag>
						))}
					</Flex>

					<Box className={styles.interactionSection}>
						<Typography.SubText level={3} color='gray100'>
							{formatDate(currentPhoto.created_at)}
						</Typography.SubText>

						<Flex gap='2'>
							<Button
								variant='ghost'
								onClick={() => setIsLiked(!isLiked)}
								aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
								className={styles.actionButton}
							>
								{isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
							</Button>
							<Button
								variant='ghost'
								aria-label='Share photo'
								className={styles.actionButton}
							>
								<FaShareAlt size={18} />
							</Button>
						</Flex>
					</Box>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}