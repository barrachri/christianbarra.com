import React from "react"

const StyledLink = ({ href, text }) => {
  return (
    <a href={href} className="underline">
      {text}
    </a>
  )
}

export { StyledLink }
