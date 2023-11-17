"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'

export default function ThemeChanger() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : "light")

    const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked) {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    useEffect(() => {
        localStorage.setItem("theme", theme as string);
        const localTheme = localStorage.getItem("theme")
        if (localTheme) {
            document.querySelector("html")?.setAttribute("data-theme", localTheme )
        }
    }, [theme])
  return (
    <input checked={theme == "light" ? false : true} type='checkbox' className="toggle" onChange={handleToggle}/>
  )
}
