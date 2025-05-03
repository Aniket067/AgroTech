'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from 'emailjs-com'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
// import { toast } from '@/components/ui/use-toast'
import { 
  Send, 
  CheckCircle, 
  User, 
  Mail, 
  MessageSquare, 
  Loader2,
  Sprout
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  })
  const [isClient, setIsClient] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  interface FormData {
    name: string;
    email: string;
    message: string;
  }

  interface FormState {
    isSubmitting: boolean;
    isSubmitted: boolean;
    error: string | null;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };

  interface EmailJSResponse {
    text: string;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((prev: FormState) => ({ ...prev, isSubmitting: true }));

    emailjs
      .send(
        'service_o91dt5h',
        'template_lfutu4o',
        formData,
        'hqOHmKrGiHQoTZJBp'
      )
      .then(
        (result: EmailJSResponse) => {
          console.log('Message sent:', result.text);
          setFormState({
            isSubmitting: false,
            isSubmitted: true,
            error: null
          });
          setFormData({ name: '', email: '', message: '' });
          
          toast({
            title: "Message sent successfully!",
            description: "We'll get back to you as soon as possible.",
            variant: "success",
          });
          
          // Reset submitted state after delay
          setTimeout(() => {
            setFormState((prev: FormState) => ({ ...prev, isSubmitted: false }));
          }, 3000);
        },
        (error: { text: string }) => {
          console.error('Failed to send message:', error.text);
          setFormState({
            isSubmitting: false,
            isSubmitted: false,
            error: "Failed to send message. Please try again."
          });
          
          toast({
            title: "Something went wrong",
            description: "Your message couldn't be sent. Please try again.",
            variant: "destructive",
          });
        }
      );
  };

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
    blur: { scale: 1, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" },
  }

  if (!isClient) return null

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-teal-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center mb-12">
        
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-teal-800 bg-clip-text text-transparent mb-4"
          >
            Let's Connect
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-emerald-700 max-w-md mx-auto"
          >
            Share your thoughts with us and we'll nurture them into solutions that help you grow.
          </motion.p>
        </div>

        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="backdrop-blur-sm bg-white/70 border border-emerald-100 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-500 pb-8 pt-10 px-8">
                <CardTitle className="text-3xl font-bold text-white flex items-center gap-2 justify-center">
                  <MessageSquare className="w-6 h-6" /> Get in Touch
                </CardTitle>
                <CardDescription className="text-emerald-100 text-center mt-2">
                  We're excited to hear from you
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8 pt-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label 
                      htmlFor="name" 
                      className="text-sm font-medium text-emerald-800 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" /> Full Name
                    </Label>
                    <motion.div variants={inputVariants} whileFocus="focus" whileTap="focus" initial="blur">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full rounded-lg border-emerald-200 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition-all duration-300 bg-white/80"
                      />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label 
                      htmlFor="email" 
                      className="text-sm font-medium text-emerald-800 flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" /> Email Address
                    </Label>
                    <motion.div variants={inputVariants} whileFocus="focus" whileTap="focus" initial="blur">
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="w-full rounded-lg border-emerald-200 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition-all duration-300 bg-white/80"
                      />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label 
                      htmlFor="message" 
                      className="text-sm font-medium text-emerald-800 flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" /> Your Message
                    </Label>
                    <motion.div variants={inputVariants} whileFocus="focus" whileTap="focus" initial="blur">
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your needs or questions..."
                        required
                        className="w-full rounded-lg border-emerald-200 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition-all duration-300 resize-none bg-white/80"
                      />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {formState.isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-green-100 border border-green-200 text-green-800 rounded-lg p-4 flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Message sent successfully! We'll be in touch soon.</span>
                      </motion.div>
                    ) : formState.error ? (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-red-100 border border-red-200 text-red-800 rounded-lg p-4 flex items-center gap-3"
                      >
                        <span>{formState.error}</span>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </form>
              </CardContent>
              
              <CardFooter className="px-8 pb-8 pt-2">
                <Button
                  type="submit"
                  disabled={formState.isSubmitting || formState.isSubmitted}
                  className="w-full py-6 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white rounded-lg text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {formState.isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : formState.isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Message Sent</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}