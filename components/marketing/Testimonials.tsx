import React from 'react'
import { Marquee, ReviewCard} from '../ui/marquee'

function Testimonials() {
  const reviews = [
    {
      name: "Sarah K.",
      username: "Marketing Manager",
      body: "Just joined the waitlist! I’ve been looking for something like this — can’t wait to see how the AI transforms my resume once it’s live.",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
    },
    {
      name: "Michael T.",
      username: "Software Engineer",
      body: "Heard about ResumeSmart from threads and signed up right away. If it really helps boost ATS scores, I’m all in.",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
    },
    {
      name: "Jessica L.",
      username: "Product Designer",
      body: "Just got on the waitlist — the preview looks amazing! I’m excited to finally have an AI tool that understands good design and resumes.",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
      rating: 5,
    },
    {
      name: "David R.",
      username: "Data Analyst",
      body: "Signed up for early access today. Really curious to see how ResumeSmart handles real ATS optimization once it launches.",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=mason",
      rating: 5,
    },
  ]


  return (
    <section className="py-8 sm:py-12 md:py-16  relative flex w-full flex-row items-center justify-center overflow-hidden bg-gradient-to-br  from-blue-50 to-purple-50">
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>

    </section>
  )
}

export default Testimonials