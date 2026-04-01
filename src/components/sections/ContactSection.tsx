import { Linkedin, Github, Mail } from 'lucide-react'
import BlurText from '../BlurText'
import ScrollReveal from '../ScrollReveal'

export default function ContactSection() {
  return (
    <ScrollReveal>
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">Let's Connect</span>
          </div>
          <BlurText
            text="Ready to build something great?"
            className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4"
            delay={0.05}
          />
          <p className="text-text-muted mb-10 leading-relaxed">
            Whether you need a fractional CTO, a technical assessment, or a full build — let's talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a href="https://calendly.com/renzo-startupp/30min" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3 text-sm font-semibold">Book a 30-min Call</a>
            <a href="mailto:renzo@startupp.ai" className="btn-secondary px-8 py-3 text-sm font-semibold">Email Me</a>
          </div>
          <div className="flex justify-center gap-6">
            <a href="https://www.linkedin.com/in/renzo-dupont-b9797941/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="https://github.com/renzodupont" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors"><Github className="w-5 h-5" /></a>
            <a href="mailto:renzo@startupp.ai" className="text-text-muted hover:text-accent transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
