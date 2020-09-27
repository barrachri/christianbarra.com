import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Consulting = () => {
  return (
    <Layout>
      <SEO
        title="Consulting & Training"
        description="Learn how I can support your company with consulting and training"
      />
      <div>
        <h1 className="text-gray-800 pb-5">Consulting</h1>
        <p>
          I am a software engineer with a strong product-driven approach. My
          focus is mainly on system architecture, backend development and cloud
          infrastructure.
        </p>
        <p>These are some areas where I can support your company:</p>
        <ul>
          <li>
            - Design and develop software systems and applications
            (Python/Go/Javascript)
          </li>
          <li>- Reduce lead-time and improve software quality</li>
          <li>- Implement a remote work strategy & culture</li>
          <li>
            - Migrate your deployment to a container/kubernetes based solution
          </li>
          <li>- Create and grow software teams</li>
          <li>- Implement and improve CI/CD</li>
          <li>- Build MVPs</li>
          <li>- Build cloud infrastructure</li>
          <li>- Build RESTFul, gRPC and GraphQL APIs</li>
          <li>- Build serverless system</li>
          <li>- Build software for IoT products</li>
          <li>- ....</li>
        </ul>
      </div>
      <div className="pt-5">
        <h1 className="text-gray-800 pb-5">Training</h1>
        <p>
          Tech is a rapidly changing industry. Keep your team/s up to date is
          fundamental and trainings are a great way to achieve that.
        </p>
        <p>
          Apart from tailored trainings if you are looking for something focus
          on Python and cloud infrastructure you can check{" "}
          <a href="https://www.pybootcamp.com" className="underline">
            pybootcamp.com
          </a>
          .
        </p>
      </div>
      <div className="border-t-4 border-b-4 mt-5">
        <p className="text-lg text-gray-800 text-gray-800 pt-2 pb-2">
          For more info, whether for consulting or training, you can send an
          email at <b>me [AT] christianbarra.com</b>
        </p>
      </div>
    </Layout>
  )
}

export default Consulting
