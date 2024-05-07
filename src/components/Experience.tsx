import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Game } from './Game.tsx';

export const Experience = () => {
	return (
		<Canvas
			camera={{
				position: [0, 5, 10],
				fov: 60,
				near: 0.1,
				far: 1000,
			}}
			frameloop={'demand'}
		>
			<Game />
		</Canvas>
	);
};
