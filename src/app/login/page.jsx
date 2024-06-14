'use client'
import React from 'react'
import LoginForm from './form'

export default function LoginPage() {
  return (
    <main
			className="relative m-auto flex h-[100vh] w-full flex-col items-center justify-center bg-gradient-to-br from-primary-100 via-white to-primary-50 pl-2 pr-2"
		>
			<div className="absolute z-50 m-auto flex w-[380px] flex-1 flex-col justify-center p-6 sm:w-[468px] sm:p-10">
				<LoginForm />
			</div>
		</main>
  )
}
