import { type AnchorHTMLAttributes, type SVGProps, useId } from "react"

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

const stats = [
  {
    label: "Role",
    value: "Software engineer / founder",
  },
  {
    label: "Building",
    value: "AI agents + software products",
  },
  {
    label: "Buying",
    value: "$10k–$800k ARR SaaS",
  },
]

const links = [
  {
    label: "Email",
    href: "mailto:me@christianbarra.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/christianbarra/",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/christianbarra",
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
      <section className="relative container max-w-3xl py-10 md:py-12 lg:py-15">
        <div className="flex flex-col gap-5">
          <p className="font-mono text-sm tracking-[0.22em] text-muted-foreground uppercase">
            Christian Barra
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
            Software engineer and founder.
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-muted-foreground md:text-2xl md:leading-9">
            Building AI agents and a constellation of small software products.
            Also looking to acquire profitable SaaS companies.
          </p>
        </div>

        <div className="absolute -inset-40 z-[-1] [mask-image:radial-gradient(circle_at_center,black_0%,black_20%,transparent_80%)]">
          <PlusSigns className="size-full text-foreground/[0.05]" />
        </div>
      </section>

      <section className="container max-w-3xl border-y py-5">
        <h2 className="font-mono text-sm font-semibold tracking-widest text-accent-foreground">
          Now
        </h2>
        <dl className="mt-6 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="font-medium text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="text-2xl font-medium tracking-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container max-w-3xl py-10 md:py-12 lg:py-15">
        <div className="flex max-w-2xl flex-col gap-5 text-lg leading-8">
          <p>
            I build practical software: agents, workflow products, and small
            tools with clear distribution and simple surfaces.
          </p>
          <p>
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
          <p>
            I am interested in bootstrapped SaaS businesses with real customers,
            retention, and room for better systems. The sweet spot is $10k to
            $800k in ARR.
          </p>
        </div>
      </section>

      <section className="container max-w-3xl pb-10 md:pb-12 lg:pb-15">
        <div className="ml-auto flex max-w-2xl flex-col gap-5 border-t pt-6 text-lg leading-8">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            If you are selling, building, or thinking through an agent workflow,
            send a note.
          </h2>
          <p className="text-muted-foreground">
            Email is best:{" "}
            <TextLink href="mailto:me@christianbarra.com">
              [ me @ this domain ]
            </TextLink>
            .
          </p>
          <nav
            aria-label="Social links"
            className="flex flex-wrap gap-4 text-sm"
          >
            {links.map((link) => (
              <TextLink key={link.href} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </nav>
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
