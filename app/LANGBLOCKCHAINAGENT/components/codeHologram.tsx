'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Image from 'next/image'

const words = ['DIVA', 'PROTOCOL', 'MARKETS', 'PREDICTION']

export default function CodeHologram() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [supportsWebGL, setSupportsWebGL] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    let renderer: THREE.WebGLRenderer | null = null

    try {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({ alpha: true })

      const resizeRenderer = () => {
        if (containerRef.current && renderer) {
          const { clientWidth, clientHeight } = containerRef.current
          renderer.setSize(clientWidth, clientHeight)
          camera.aspect = clientWidth / clientHeight
          camera.updateProjectionMatrix()
        }
      }

      resizeRenderer()
      window.addEventListener('resize', resizeRenderer)

      containerRef.current.appendChild(renderer.domElement)

      camera.position.z = 5

      const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
      const material = new THREE.MeshBasicMaterial({ color: 0x8a2be2, wireframe: true })
      const torusKnot = new THREE.Mesh(geometry, material)
      scene.add(torusKnot)

      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff })
      const textGeometry = new THREE.TextGeometry('DIVAFLEX', {
        font: new THREE.Font(),
        size: 0.5,
        height: 0.1,
      })
      const textMesh = new THREE.Mesh(textGeometry, textMaterial)
      textMesh.position.set(-1.5, 0, 0)
      scene.add(textMesh)

      const animate = () => {
        requestAnimationFrame(animate)
        torusKnot.rotation.x += 0.01
        torusKnot.rotation.y += 0.01
        renderer?.render(scene, camera)
      }

      animate()

      return () => {
        window.removeEventListener('resize', resizeRenderer)
        containerRef.current?.removeChild(renderer!.domElement)
      }
    } catch (error) {
      console.error('Error creating WebGL context:', error)
      setSupportsWebGL(false)
    }
  }, [])

  if (!supportsWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
        <Image
          src="/placeholder.svg?height=400&width=400"
          alt="Hologram Placeholder"
          width={400}
          height={400}
          className="rounded-lg shadow-xl"
        />
      </div>
    )
  }

  return <div ref={containerRef} className="w-full h-full" />
}

