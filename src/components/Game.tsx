import { Environment } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import React, { Suspense } from 'react';
import { Character } from './Character.tsx';
import { Lights } from './Lights.tsx';

export const Game = () => {
	return (
		<Suspense>
			<Physics>
				<color attach={'background'} args={['#fff']} />
				<RigidBody type={'fixed'}>
					<mesh>
						<boxGeometry args={[100, 0.5, 100]} />
						<meshStandardMaterial color={'lightgreen'} />
					</mesh>
				</RigidBody>
				<Character />

				<directionalLight intensity={1} position={[0, 10, 0]} />
			</Physics>

			<Environment
				preset={'forest'}
				background={'only'}
				backgroundBlurriness={0.8}
			/>
			<Lights />
		</Suspense>
	);
};
