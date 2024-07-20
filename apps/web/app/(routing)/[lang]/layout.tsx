import '@/fsd/app/styles/global.css';
import { getDictionary } from '@/fsd/shared/config';
import { DictionaryProvider } from '@/src/app/providers';

interface DictionaryLayoutProps {
	params: { lang: string };
	children: React.ReactNode;
}

export default async function DictionaryLayout({
	params,
	children,
}: DictionaryLayoutProps) {
	return (
		<DictionaryProvider
			lang={params.lang}
			initialDictionary={await getDictionary(params.lang)}
		>
			{children}
			{/* Just for convenient switching between different routes */}
			{/* <NavigationLinks /> */}
		</DictionaryProvider>
	);
}