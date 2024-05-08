import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef, useState } from 'react';
import { Euler, Group, Quaternion, Vector3 } from 'three';
import { Controls } from '../App.tsx';

const forward = new Vector3(0, 0, -0.1);
const backward = new Vector3(0, 0, 0.1);
const left = new Vector3(-0.1, 0, 0);
const right = new Vector3(0.1, 0, 0);
const jump = new Vector3(0, 30, 0);

const MOVEMENT_SPEED = 10;

const BASE_Y_POSITION = 1.248999834060669;

type Animations =
	| 'CharacterArmature|Run'
	| 'CharacterArmature|Idle'
	| 'CharacterArmature|Jump';

export function Character(props) {
	const group = useRef<Group>(null);
	const rigidBodyRef = useRef<RapierRigidBody>(null);
	const { nodes, materials, animations } = useGLTF('/character.glb');
	const { actions } = useAnimations(animations, group);
	const characterRotation = useRef(new Euler(0, Math.PI, 0, 'XYZ'));

	const [animation, setAnimation] = useState<Animations>('CharacterArmature|Idle');

	const forwardPressed = useKeyboardControls<Controls>((state) => state.forward);
	const backPressed = useKeyboardControls<Controls>((state) => state.back);
	const leftPressed = useKeyboardControls<Controls>((state) => state.left);
	const rightPressed = useKeyboardControls<Controls>((state) => state.right);
	const jumpPressed = useKeyboardControls<Controls>((state) => state.jump);

	useFrame((state, delta) => {
		if (!group.current || !rigidBodyRef.current) return;

		const impulse = new Vector3(0, 0, 0);
		const characterPosition = rigidBodyRef.current.translation();

		let isJump = false;

		if (forwardPressed) {
			impulse.add(forward);
			characterRotation.current.set(0, Math.PI, 0);
		}

		if (backPressed) {
			impulse.add(backward);
			characterRotation.current.set(0, 0, 0);
		}

		if (leftPressed) {
			impulse.add(left);
			characterRotation.current.set(0, -Math.PI * 0.5, 0);
		}

		if (rightPressed) {
			impulse.add(right);
			characterRotation.current.set(0, Math.PI * 0.5, 0);
		}

		if (forwardPressed && leftPressed) {
			characterRotation.current.set(0, -Math.PI * 0.75, 0);
		}

		if (forwardPressed && rightPressed) {
			characterRotation.current.set(0, Math.PI * 0.75, 0);
		}

		if (backPressed && leftPressed) {
			characterRotation.current.set(0, -Math.PI * 0.25, 0);
		}

		if (backPressed && rightPressed) {
			characterRotation.current.set(0, Math.PI * 0.25, 0);
		}

		if (jumpPressed && characterPosition.y < BASE_Y_POSITION + 0.01) {
			impulse.add(jump);
			isJump = true;
		}

		rigidBodyRef.current.applyImpulse(
			impulse.multiplyScalar(isJump ? 1 : MOVEMENT_SPEED),
			true
		);

		if (isJump) {
			setAnimation('CharacterArmature|Jump');
		} else if (impulse.length() > 0) {
			setAnimation('CharacterArmature|Run');
		} else {
			setAnimation('CharacterArmature|Idle');
		}

		const cameraPosition = new Vector3();
		cameraPosition.copy(characterPosition);
		cameraPosition.y += 4;
		cameraPosition.z += 7;
		state.camera.position.lerp(cameraPosition, 8 * delta);

		rigidBodyRef.current.setRotation(
			new Quaternion().setFromEuler(characterRotation.current),
			true
		);
	});

	useEffect(() => {
		actions[animation]?.reset().fadeIn(0.2).play();
		return () => {
			actions[animation]?.fadeOut(0.2);
		};
	}, [animation]);

	return (
		<RigidBody
			lockRotations
			linearDamping={3}
			position={[0, 1, 0]}
			colliders={false}
			ref={rigidBodyRef}
			rotation={[0, Math.PI, 0]}
		>
			<CuboidCollider args={[1, 1, 1]} />
			<group ref={group} {...props} dispose={null} scale={0.5} position-y={-1}>
				<group name="Root_Scene">
					<group name="RootNode">
						<group
							name="CharacterArmature"
							rotation={[-Math.PI / 2, 0, 0]}
							scale={100}
						>
							<primitive object={nodes.Root} />
						</group>
						<skinnedMesh
							name="Enemy"
							// @ts-ignore
							geometry={nodes.Enemy.geometry}
							material={materials.Atlas}
							// @ts-ignore
							skeleton={nodes.Enemy.skeleton}
							scale={9}
						/>
					</group>
				</group>
			</group>
		</RigidBody>
	);
}

useGLTF.preload('/character.glb');
