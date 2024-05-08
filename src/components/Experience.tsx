import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Lights } from './Lights.tsx';
import { RagingSea } from './RagingSea.tsx';

export const Experience = () => {
	return (
		<Canvas
			camera={{
				position: [0, 7.5, 10],
				fov: 60,
				near: 0.1,
				far: 1000,
			}}
		>
			<OrbitControls />
			<color attach={'background'} args={['#fff']} />
			<Environment
				preset={'forest'}
				background={'only'}
				backgroundBlurriness={0.8}
			/>
			<RagingSea />
			<Lights />
		</Canvas>
	);
};
