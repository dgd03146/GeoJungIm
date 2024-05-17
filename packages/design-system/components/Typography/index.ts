import { FootNote } from './FootNote';
import { Heading } from './Heading';
import { SubText } from './SubText';
import { Typography } from './Typography';

const Compound = Object.assign(Typography, {
	Heading,
	Text,
	SubText,
	FootNote,
});

export { Compound as Typography };
