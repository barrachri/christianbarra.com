import React from "react"

const StyledLink = ({href, text}) => {
    return (
    <a href={href} className="font-bold underline">{text}</a>
    )
}

export {StyledLink}