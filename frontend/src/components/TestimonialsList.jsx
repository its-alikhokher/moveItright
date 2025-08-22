import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsList = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, NY",
      text: "MoveItRight made our cross-town move completely stress-free. The team was professional, careful with our belongings, and finished ahead of schedule!",
      rating: 5
    },
    {
      name: "Michael Chen",
      location: "Boston, MA",
      text: "As a business owner, I was worried about downtime during our office relocation. The commercial moving team was efficient and helped us get back to work quickly.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      location: "Chicago, IL",
      text: "The packing service was worth every penny. They carefully packed all our fragile items, and nothing was damaged in the move. Highly recommend!",
      rating: 4
    },
    {
      name: "David Thompson",
      location: "Seattle, WA",
      text: "We had to store our belongings for three months between homes. The storage facility was clean, secure, and climate-controlled. Perfect solution for our situation.",
      rating: 5
    },
    {
      name: "Jennifer Wilson",
      location: "Austin, TX",
      text: "Moving my grandmother's antique piano seemed impossible, but the specialty moving team handled it with expert care. Worth every penny for the peace of mind.",
      rating: 5
    },
    {
      name: "Robert Miller",
      location: "Denver, CO",
      text: "Our long-distance move from Colorado to Florida was seamless. The team kept us updated throughout the journey and delivered everything on time and in perfect condition.",
      rating: 4
    }
  ];

  return (
    <section className="py-12 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their moving experience with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              location={testimonial.location}
              text={testimonial.text}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsList;