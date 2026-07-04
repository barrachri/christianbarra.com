import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { Button, buttonVariants } from "@/components/ui/button"

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants>

function ButtonLink({ children, variant, size, ...props }: ButtonLinkProps) {
  return (
    <Button asChild variant={variant} size={size}>
      <a {...props}>{children}</a>
    </Button>
  )
}

export { ButtonLink }
