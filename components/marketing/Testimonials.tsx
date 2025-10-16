import React from 'react'
import { Marquee, ReviewCard} from '../ui/marquee'

function Testimonials() {
  const reviews = [
    {
      name: "Sarah K.",
      username: "Marketing Manager",
      body: "Sent 100+ applications with zero responses. ResumeSmart showed my ATS score was 38. Fixed it to 89 and got 3 interviews in one week.",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
    },
    {
      name: "Michael T.",
      username: "Software Engineer",
      body: "The AI turned my boring bullets into actual achievements with numbers. Score went from 45 to 92. Best $19 I spent on my job search.",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
    },
    {
      name: "Jessica L.",
      username: "Product Designer",
      body: "Just signed up and already love how easy it is! The interface is super clean and the ATS score feature is exactly what I needed. Excited to see results!",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
      rating: 5,
    },
    {
      name: "David R.",
      username: "Data Analyst",
      body: "Finally a resume that actually passes ATS systems. Got my first interview callback in 3 months after using this. The AI suggestions were spot on.",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
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