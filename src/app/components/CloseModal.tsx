"use client"

import { X } from "lucide-react"
import { useRouter } from "next/navigation"

const CloseModal = () => {
    const router = useRouter()

  return (
  <button className="btn btn-ghost" arial-label="close modal" onClick={() => router.back()}>
    <X className="h-4 w-4" />
  </button>)
}

export default CloseModal