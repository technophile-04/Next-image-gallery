//pages/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
	Box,
	Container,
	Text,
	Wrap,
	WrapItem,
	Input,
	IconButton,
	InputRightElement,
	InputGroup,
	useToast,
	Flex,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { getCuratedPhotos, getQueryPhotos } from '../lib/api';

export default function Home({ data }) {
	const [photos, setPhotos] = useState(data);
	const toast = useToast();

	return (
		<div>
			<Head>
				<title> NextJS Image Gallery</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box overflow="hidden" bg="purple.100" minH="100vh">
				<Container>
					<Text
						color="pink.800"
						fontWeight="semibold"
						mb="1rem"
						textAlign="center"
						textDecoration="underline"
						fontSize={['4xl', '4xl', '5xl', '5xl']}
					>
						NextJS Image Gallery
					</Text>
				</Container>
				<Wrap px="1rem" spacing={4} justify="center">
					{photos.map((pic) => (
						<WrapItem
							key={pic.author_fullname}
							boxShadow="base"
							rounded="20px"
							overflow="hidden"
							bg="white"
							lineHeight="0"
							_hover={{ boxShadow: 'dark-lg' }}
						>
							<a href={pic.data.url} target="_blank">
								<a>
									<img
										src={pic.data.thumbnail}
										height={600}
										width={400}
										alt={'reddit'}
									/>
								</a>
							</a>
						</WrapItem>
					))}
				</Wrap>
				<Flex my="1rem" justify="center" align="center" direction="column">
					<a
						href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						Powered by
						<Image
							src="/vercel.svg"
							width={283 / 4}
							height={64 / 4}
							alt="Vercel Logo"
						/>
					</a>
				</Flex>
			</Box>
		</div>
	);
}

export async function getServerSideProps() {
	const data = await getCuratedPhotos();
	return {
		props: {
			data,
		},
	};
}
