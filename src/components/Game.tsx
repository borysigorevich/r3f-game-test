import { Physics, RigidBody } from '@react-three/rapier';
import React, { Suspense } from 'react';
import { Character } from './Character.tsx';

export const Game = () => {
	return (
		<Suspense>
			<Physics>
				<RigidBody type={'fixed'}>
					<mesh>
						<boxGeometry args={[10, 0.5, 10]} />
						<meshStandardMaterial color={'lightgreen'} />
					</mesh>
				</RigidBody>
				<Character />

				<directionalLight intensity={1} position={[0, 10, 0]} />
			</Physics>
		</Suspense>
	);
};
