import { type AnchorHTMLAttributes, type SVGProps, useId } from "react"
import { ExternalLinkIcon, MailIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface About8Props {
  className?: string
}

const projects = [
  {
    name: "dearmachines",
    href: "https://www.dearmachines.com/",
  },
  {
    name: "orderlayer",
    href: "https://www.orderlayer.com/",
  },
  {
    name: "funnelhype",
    href: "https://www.funnelhype.com/",
  },
  {
    name: "uptimenine",
    href: "https://www.uptimenine.com/",
  },
]

const links = [
  {
    label: "Email",
    href: "mailto:me@christianbarra.com",
    icon: MailIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/christianbarra/",
    icon: ExternalLinkIcon,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/christianbarra",
    icon: XIcon,
  },
]

function TextLink({ href, children }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className="font-medium text-foreground underline decoration-border underline-offset-4 hover:text-muted-foreground"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  )
}

const About8 = ({ className }: About8Props) => {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden py-16 md:py-24",
        className
      )}
    >
      <section className="relative container mx-auto max-w-3xl px-6 py-10 md:py-12 lg:px-8 lg:py-15">
        <div className="flex flex-col gap-5">
          <p className="font-mono text-sm tracking-[0.22em] text-muted-foreground uppercase">
            Christian Barra
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
            Software engineer, sailor and founder.
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-muted-foreground md:text-2xl md:leading-9">
            Building and buying a constellation of durable companies.
          </p>
          <nav
            aria-label="Social links"
            className="flex flex-wrap justify-center gap-2 pt-1"
          >
            {links.map(({ label, href, icon: Icon }) => (
              <Button key={href} asChild variant="outline" size="sm">
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <Icon data-icon="inline-start" />
                  {label}
                </a>
              </Button>
            ))}
          </nav>
        </div>

        <div className="absolute -inset-40 z-[-1] [mask-image:radial-gradient(circle_at_center,black_0%,black_20%,transparent_80%)]">
          <PlusSigns className="size-full text-foreground/[0.05]" />
        </div>
      </section>

      <section className="container mx-auto max-w-3xl border-y px-6 py-8 lg:px-8">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            <TextLink href="https://www.futurogroup.it/">
              futurogroup.it
            </TextLink>
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            We consolidate durable companies in Italy and operate them for the
            long term.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl border-b px-6 py-8 lg:px-8">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            <TextLink href="https://www.thinkfutura.com/">
              thinkfutura.com
            </TextLink>
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            We build, acquire and operate SaaS companies. You're a founder of a
            SaaS company doing $40k-$800k in ARR looking for a new home? Let's
            have a chat.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl border-b px-6 py-8 lg:px-8">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            A small constellation of products.
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            Current projects include{" "}
            {projects.map((project, index) => (
              <span key={project.href}>
                <TextLink href={project.href}>{project.name}</TextLink>
                {index < projects.length - 2 ? ", " : ""}
                {index === projects.length - 2 ? ", and " : ""}
              </span>
            ))}
            .
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-6 pb-10 md:pb-12 lg:px-8 lg:pb-15">
        <div className="flex max-w-2xl flex-col gap-5 border-t pt-6 text-lg leading-8">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            You're a founder of a SaaS company doing $40k-$800k in ARR looking
            for a new home? Let's have a chat.
          </h2>
          <p className="text-muted-foreground">
            Email is best:{" "}
            <TextLink href="mailto:me@christianbarra.com">
              [ me @ this domain ]
            </TextLink>
            .
          </p>
        </div>
      </section>
    </section>
  )
}

interface PlusSignsProps extends SVGProps<SVGSVGElement> {
  className?: string
}

const PlusSigns = ({ className, ...props }: PlusSignsProps) => {
  const GAP = 16
  const STROKE_WIDTH = 1
  const PLUS_SIZE = 6
  const id = useId()
  const patternId = `plus-pattern-${id}`

  return (
    <svg width={GAP * 2} height={GAP * 2} className={className} {...props}>
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={GAP}
          height={GAP}
          patternUnits="userSpaceOnUse"
        >
          <line
            x1={GAP / 2}
            y1={(GAP - PLUS_SIZE) / 2}
            x2={GAP / 2}
            y2={(GAP + PLUS_SIZE) / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
          <line
            x1={(GAP - PLUS_SIZE) / 2}
            y1={GAP / 2}
            x2={(GAP + PLUS_SIZE) / 2}
            y2={GAP / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}

export { About8 }
