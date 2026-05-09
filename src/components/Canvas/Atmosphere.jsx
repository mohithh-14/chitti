import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export function Atmosphere({ color = "#D4AF37", count = 1500, size = 0.003, transparent = true }) {
  const ref = useRef();
  
  // Create a sphere of particles using maath random
  const sphere = useMemo(() => {
    try {
      return random.inSphere(new Float32Array(count * 3), { radius: 1.5 });
    } catch (e) {
      console.error(e);
      // Fallback if maath fails
      const arr = new Float32Array(count * 3);
      for(let i = 0; i < arr.length; i++) {
        arr[i] = (Math.random() - 0.5) * 3;
      }
      return arr;
    }
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent={transparent}
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
      <Preload all />
    </group>
  );
}
